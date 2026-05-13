'use server';

import { AUTH_COOKIE_NAME, NEXT_AUTH_COOKIES } from '@/constants/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete({ name: AUTH_COOKIE_NAME, path: '/' });

  NEXT_AUTH_COOKIES.forEach((cookie) => cookieStore.delete(cookie));

  redirect('/');
}
