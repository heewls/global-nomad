import Cookies from 'js-cookie';

type Token = 'accessToken' | 'refreshToken';

export const setToken = (key:Token, token: string) => {
  Cookies.set(key, token, {
    path: '/',
    expires: key === 'accessToken' ? 1 : 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
};

export const getToken = (token: Token) => {
  return Cookies.get(token);
};

export const clearTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};
