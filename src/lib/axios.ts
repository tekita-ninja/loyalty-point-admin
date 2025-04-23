import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: `${process.env.baseUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apiKey = getApiKey();
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getApiKey(): string | null {
  return process.env.apiKey || null
}

export default axiosInstance;