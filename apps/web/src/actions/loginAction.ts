'use server';

import { AUTH_COOKIE_NAME } from '@/constants/auth';
import { api } from '@/lib/api';
import { NestErrorResponse } from '@/lib/api/errors';
import { AuthenticateBodySchema } from '@repo/shared/schemas/auth';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type SessionResponse = { access_token: string };

export async function loginAction(data: AuthenticateBodySchema) {
  try {
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
  } catch (error: unknown) {
    if (isAxiosError<NestErrorResponse>(error)) {
      if (error.response?.status === 401) {
        return {
          success: false,
          error: error.response.data.message ?? 'Credenciais inválidas',
        };
      }

      return { success: false, error: 'Erro inesperado. Tente novamente' };
    }
  }
  redirect('/dashboard');
}
