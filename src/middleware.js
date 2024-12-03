import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/auth/login' || path === '/auth/signup';
  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }
}

export const config = {
  matcher: ['/', '/auth/login', '/auth/signup', '/dashboard', '/stock-filter'],
};
