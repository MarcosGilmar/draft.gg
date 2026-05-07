'use server';

import { AUTH_COOKIE_NAME } from '@/constants/auth';
import { api } from '@/lib/api';
import { AuthenticateBodySchema } from '@repo/shared/schemas/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type SessionResponse = { access_token: string };

export async function loginAction(data: AuthenticateBodySchema) {
  const response = await api.post<SessionResponse>('/sessions', data);

  const { access_token } = response.data;

  const cookieStore = await cookies();

  cookieStore.set(AUTH_COOKIE_NAME, access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 12,
    path: '/',
  });

  redirect('/dashboard');
}
