'use server';

import { AUTH_COOKIE_NAME } from '@/constants/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete({ name: AUTH_COOKIE_NAME, path: '/' });

  redirect('/');
}
