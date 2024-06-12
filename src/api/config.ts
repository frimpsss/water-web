import axios, { InternalAxiosRequestConfig } from "axios";

const baseURL = "https://aquatrack.fly.dev";

export const apiWithAuth = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export const apiNoAuth = axios.create({
  baseURL: baseURL,
});

apiWithAuth.interceptors.request.use(
  (config: any) => {
    if (config.method === "options") {
      return Promise.resolve({ status: 200 });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiWithAuth.interceptors.request.use(
  (config: any) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === "options") {
      return Promise.resolve({ status: 200 });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiWithAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response.status == 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      localStorage.removeItem("auth");
    }

    return Promise.reject(error);
  }
);
const getToken = () => {
  return localStorage.getItem("auth");
};
