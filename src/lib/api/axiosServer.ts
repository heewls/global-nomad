import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from '../refreshAccessToken';

interface CustomConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosServer = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  adapter: 'fetch',
});

axiosServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) return config;

  config.headers.set('Authorization', `Bearer ${accessToken}`);

  return config;
});

axiosServer.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as CustomConfig;

    if (!error.response || error.response.status !== 401 || config._retry) {
      return Promise.reject(error);
    }

    config._retry = true;

    const cookieStore = await cookies();

    const refreshToken = cookieStore.get('refreshToken')?.value;
    if (!refreshToken) redirect('/login');

    const newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken) {
      cookieStore.set('accessToken', newAccessToken, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    } else {
      redirect('/login');
    }

    config.headers.set('Authorization', `Bearer ${newAccessToken}`);

    return axiosServer(config);
  }
);

export default axiosServer;
