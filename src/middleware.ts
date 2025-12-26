import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { refreshAccessToken } from './lib/refreshAccessToken';

export async function middleware(request: NextRequest) {
  const { cookies, url } = request;
  const accessToken = cookies.get('accessToken')?.value;
  const refreshToken = cookies.get('refreshToken')?.value;

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
      return NextResponse.redirect(new URL('/login', url));
    }
  }

  // 토큰 필요없는 페이지 추가 예정(로그인, 회원가입, 카카오, 메인(체험 리스트), 체험 상세화면(체험 상세조회, 체험 리뷰 조회))

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|icons).*)'],
};
