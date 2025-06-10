import axios from "axios";
import Cookies from 'js-cookie';


const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
      window.location.href = '/auth/login?auth=unauthenticated';
    }
    return Promise.reject(error);
  }
);

export default api;
