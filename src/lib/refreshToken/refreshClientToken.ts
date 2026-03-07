import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function refreshClientToken(refreshToken: string) {
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

    return response.data.accessToken;
  } catch {
    return null;
  }
}
