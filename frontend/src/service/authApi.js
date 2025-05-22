import api from './api';
import Cookies from 'js-cookie';
import axios from 'axios';

export const loginRequest = async (email, password) => {
  try {
    console.log("Logging in with:", { email, password });
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const response = await api.post("/login", formData);
    Cookies.set('token', response.data.token, { expires: 7, path: '/' });
    Cookies.set('role', response.data.user.role_id, { expires: 7, path: '/' });
    Cookies.set('name', response.data.user.name, { expires: 7, path: '/' });
    Cookies.set('user_id', response.data.user.id , { expires: 7, path: '/' });
    Cookies.set('avatar', response.data.user.avatar, { expires: 7, path: '/' });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerRequest = async (username, email, phoneNumber, password, confirm_password, role) => {
  try {
    console.log("Registering with:", { username, email, phoneNumber, password });
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("phone", phoneNumber);
    formData.append("password", password);
    formData.append("password_confirmation", confirm_password);
    formData.append("role_id", role);
    const response = await api.post("/register", formData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

export const logoutRequest = async () => {
  try {
    const response = await api.post("/logout");
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('name');
    Cookies.remove('user_id');
    Cookies.remove('avatar');
    
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

export const getUserRequest = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
}

export const updateUserRequest = async (avatar, name, current_password, new_password) => {
  try {
    const formData = new FormData();
    if(avatar) {
      formData.append("avatar", avatar);
    }
    formData.append("name", name);
    if (current_password !== "" || new_password !== "") {
      formData.append("current_password", current_password);
      formData.append("new_password", new_password);
    }    
    const response = await api.post("/user/update", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    throw error;
  }
}

export const googleLoginRequest = async (credentialResponse) => {
  console.log("Google login with:", { credentialResponse });
  try {
    const response = await axios.post('http://localhost:8000/api/login/google', {
      credential: credentialResponse.credential,
    });
    console.log("Google login response:", response);
    Cookies.set('token', response.data.token, { expires: 7, path: '/' });
    Cookies.set('token', response.data.token, { expires: 7, path: '/' });
    Cookies.set('role', response.data.user.role_id, { expires: 7, path: '/' });
    Cookies.set('name', response.data.user.name, { expires: 7, path: '/' });
    Cookies.set('user_id', response.data.user.id , { expires: 7, path: '/' });
    Cookies.set('avatar', response.data.user.avatar, { expires: 7, path: '/' });
    return response.data;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
}