import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/signup', '/kakao', '/', '/activities'];

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;
  const accessToken = cookies.get('accessToken')?.value;

  const isPublicPath = PUBLIC_PATHS.some(
    (path) =>
      nextUrl.pathname === path || nextUrl.pathname.startsWith('/activities/')
  );

  if (!accessToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|icons).*)'],
};
