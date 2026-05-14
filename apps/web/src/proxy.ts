import { AUTH_COOKIE_NAME } from '@/constants/auth';
import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login', '/register'];
const PRIVATE_ROUTES = ['/dashboard'];

export default function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
