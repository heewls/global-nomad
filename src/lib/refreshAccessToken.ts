import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function refreshAccessToken(accessToken: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tokens`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        adapter: 'fetch',
        timeout: 5000,
      }
    );

    return response.data?.accessToken;
  } catch {
    return null;
  }
}
