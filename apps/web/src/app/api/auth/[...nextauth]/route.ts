import { AUTH_COOKIE_NAME } from '@/constants/auth';
import { api } from '@/lib/api';
import { NextApiHandler } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { data } = await api.post<{ access_token: string }>(
          '/auth/google',
          {
            email: user.email,
            name: user.name,
            avatar: user.image,
          },
        );

        token.backendToken = data.access_token;

        const cookieStore = await cookies();
        cookieStore.set(AUTH_COOKIE_NAME, data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 12,
          path: '/',
        });
      }
      return token;
    },

    session({ session, token }) {
      session.backendToken = token.backendToken as string;

      return session;
    },
  },
};

const handler = NextAuth(authOptions) as NextApiHandler;

export { handler as GET, handler as POST };
