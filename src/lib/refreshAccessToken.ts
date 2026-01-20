import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function refreshAccessToken() {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tokens`,
      {
        headers: { 'Content-Type': 'application/json' },
        adapter: 'fetch',
        timeout: 5000,
      }
    );

    return response.data?.accessToken;
  } catch {
    return null;
  }
}
