import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { refreshAccessToken } from './lib/refreshAccessToken';

const PUBLIC_PATHS = ['/login', '/signup', '/kakao', '/', '/activities'];

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;
  const accessToken = cookies.get('accessToken')?.value;
  const refreshToken = cookies.get('refreshToken')?.value;

  const isPublicPath = PUBLIC_PATHS.some(
    (path) =>
      nextUrl.pathname === path || nextUrl.pathname.startsWith('/activities/')
  );

  if (!accessToken && !refreshToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  if (!accessToken && refreshToken) {
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        const response = NextResponse.next();

        response.cookies.set('accessToken', newAccessToken, {
          path: '/',
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });

        return response;
      }
    } catch {
      if (!isPublicPath)
        return NextResponse.redirect(new URL('/login', nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|icons).*)'],
};
