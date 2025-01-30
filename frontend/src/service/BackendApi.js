import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const loginRequest = async (email, password) => {
  try {
    console.log("Logging in with:", { email, password });
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await api.post("/api/login", formData);
    Cookies.set('authToken', response.data.token, { expires: 7, path: '/' });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerRequest = async (username, email, phoneNumber, password, confirm_password) => {
  try {
    console.log("Registering with:", { username, email, phoneNumber, password });
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);
    formData.append("password_confirmation", confirm_password);
    const response = await api.post("/api/register", formData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

export const logoutRequest = async () => {
  try {
    const response = await api.post("/api/logout");
    Cookies.remove('authToken');
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export default api;
