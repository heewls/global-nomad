import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

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
  if (accessToken) config.headers.set('Authorization', `Bearer ${accessToken}`);

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
      } catch (err) {
        return Promise.reject(err);
      }
    }

    config._retry = true;
    isRefreshing = true;

    const handleAuthFailure = (authError: AxiosError) => {
      isRefreshing = false;
      resolvePendingRequests(authError, null);
      window.location.href = '/login';

      return Promise.reject(authError);
    };

    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) return handleAuthFailure(error);

    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (!newAccessToken) return handleAuthFailure(error);

      Cookies.set('accessToken', newAccessToken);
      config.headers.set('Authorization', `Bearer ${newAccessToken}`);

      resolvePendingRequests(null, newAccessToken);
      isRefreshing = false;

      return axiosClient(config);
    } catch (refreshError) {
      return handleAuthFailure(refreshError as AxiosError);
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

export default axiosClient;
