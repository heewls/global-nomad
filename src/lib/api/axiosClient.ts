import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  adapter: 'fetch',
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken');
  if (!accessToken) return config;
  config.headers.set('Authorization', `Bearer ${accessToken}`);
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;

    if (!error.response || error.response.status !== 401 || config._retry) {
      return Promise.reject(error);
    }

    config._retry = true;

    const handleAuthFailure = () => {
      window.location.href = '/login';
      return Promise.reject(error);
    };

    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) return handleAuthFailure();

    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (!newAccessToken) return handleAuthFailure();

      Cookies.set('accessToken', newAccessToken);
      config.headers.set('Authorization', `Bearer ${newAccessToken}`);
      return axiosClient(config);
    } catch {
      return handleAuthFailure();
    }
  }
);

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/tokens`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' }, adapter: 'fetch' }
    );
    return response.data?.accessToken;
  } catch (error) {
    throw error;
  }
}
