'use server';

import { cookies } from 'next/headers';

type Token = 'accessToken' | 'refreshToken';

export async function getServerCookies(token: Token) {
  const cookieStore = await cookies();

  return cookieStore.get(token)?.value;
}

export async function setServerCookies(token: Token, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(token, value);
}
