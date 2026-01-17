import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerPb } from './lib/pocketbase';
import { pbCookieName } from './lib/auth';

const publicRoutes = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  const cookie = request.cookies.get(pbCookieName)?.value;

  if (!cookie) {
    // No auth cookie, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // Validate the auth cookie
  const pb = createServerPb();
  pb.authStore.loadFromCookie(`${pbCookieName}=${cookie}`);

  if (!pb.authStore.isValid) {
    // Invalid auth, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
