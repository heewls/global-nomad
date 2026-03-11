import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import refreshClientToken from '../refreshToken/refreshClientToken';
import { clearTokens, getToken, setToken } from '../clientCookie';

interface Queueing {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError) => void;
}

interface CustomConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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

let isRefreshing = false;
let waitingQueue: Queueing[] = [];

const resolvePendingRequests = (
  error: AxiosError | null,
  token: string | null
) => {
  waitingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  waitingQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as CustomConfig;

    if (!error.response || error.response.status !== 401 || config._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      try {
        const token = await new Promise<string | null>((resolve, reject) => {
          waitingQueue.push({ resolve, reject });
        });
        config.headers.set('Authorization', `Bearer ${token}`);

        return await axiosClient(config);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    config._retry = true;
    isRefreshing = true;

    const handleAuthFailure = () => {
      isRefreshing = false;
      resolvePendingRequests(error, null);
      clearTokens();
      window.location.href = '/login';

      return Promise.reject(error);
    };

    const refreshToken = getToken('refreshToken');
    if (!refreshToken) return handleAuthFailure();

    const newAccessToken = await refreshClientToken(refreshToken);
    if (!newAccessToken) return handleAuthFailure();

    setToken('accessToken', newAccessToken);
    config.headers.set('Authorization', `Bearer ${newAccessToken}`);

    resolvePendingRequests(null, newAccessToken);
    isRefreshing = false;

    return axiosClient(config);
  }
);

export default axiosClient;
