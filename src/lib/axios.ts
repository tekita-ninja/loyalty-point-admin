import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/api`;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to avoid multiple refresh attempts
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 🔐 Request Interceptor: Add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Response Interceptor: Handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token request
        const refreshToken = Cookies.get('refreshtoken');
        const response = await axios.post(`${baseURL}/auth/refresh-token`, {}, {
          headers: {
            'refresh_token': refreshToken
          }
        })

        const newToken = response.data?.data?.accessToken;
        Cookies.set('token', newToken); // Save new token

        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        Cookies.remove('token');
        Cookies.remove('refreshtoken');
        // Optional: redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    if (error.response?.status === 403) {
      if (originalRequest.method === 'get') {
        location.href = '/forbidden'
      } else{
        toast.error('Ups!', {
          description: error.message || "Operation not permitted!"
        })
      }
    }
    if(error.response?.status == 400) {
      toast.error('Ups!', {
        description: Array.isArray(error.response.data?.message)
        ? error.response.data.message.join(', ')
        : error.response.data?.message
        || "Bad request!"
      });
    }

    if(error.response?.status === 409) {
      toast.error('Ups!', {
        description: error.response.data?.message || "Conflict error!"
      });
    } 

    return Promise.reject(error);
  }
);

export default axiosInstance;