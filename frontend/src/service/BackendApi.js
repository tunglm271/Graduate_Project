import axios from "axios";
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getMedicines = async () => {
  try {
    const response = await api.get("/api/medicines", {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Get medicines error:", error);
    throw error;
  }
}

export const getAllergies = async () => {
  try {
    const response = await api.get("/api/allergies", {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    });
    return response.data;
  }
  catch (error) {
    console.error("Get allergies error:", error);
    throw error;
  }
}

export const getChronicDiseases = async () => {
  try {
    const response = await api.get("/api/chronic-diseases", {
      headers: {
        'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Get chronic diseases error:", error);
    throw error;
  }
}
export const createHealthProfile = async (data, avatar) => {
  try {
    console.log(avatar);
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append("name", data.name);
    formData.append("relationship", data.relationship);
    formData.append("phone", data.phone);
    formData.append("dateOfBirth", new Date(data.dateOfBirth).toISOString().split("T")[0]);
    formData.append("gender", data.gender);
    formData.append("email", data.email);
    formData.append("height", data.height);
    formData.append("weight", data.weight);
    formData.append("healthInsuranceNumber", data.healthInsuranceNumber);
    formData.append("avatar", data.avatar);
    formData.append("allergies", JSON.stringify(data.allergies));
    formData.append("chronicDiseases", JSON.stringify(data.chronicDiseases));
    const response = await api.post("/api/health-profiles", formData, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.error("Create health profile error:", error);
    throw error;
  }
}

export default api;
