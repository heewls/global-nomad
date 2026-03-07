import axios from 'axios';
import { setServerCookies } from '../serverCookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function refreshServerToken(refreshToken: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tokens`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        adapter: 'fetch',
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    if (accessToken && newRefreshToken) {
      setServerCookies('accessToken', accessToken);
      setServerCookies('refreshToken', newRefreshToken);

      return accessToken;
    }
    return null;
  } catch {
    return null;
  }
}
