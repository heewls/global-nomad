'use server';

import { redirect } from 'next/navigation';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { deleteServerCookies, getServerCookies } from '../serverCookie';
import refreshServerToken from '../refreshToken/refreshServerToken';

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
  const accessToken = await getServerCookies('accessToken');
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

    try {
      const refreshToken = await getServerCookies('refreshToken');
      if (!refreshToken) redirect('/login');

      const newAccessToken = await refreshServerToken(refreshToken);

      if (newAccessToken) {
        config.headers.set('Authorization', `Bearer ${newAccessToken}`);
        return axiosServer(config);
      } else {
        deleteServerCookies();
        redirect('/login');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export default axiosServer;
