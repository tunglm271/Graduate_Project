import api from "./backendApi";
import Cookies from 'js-cookie';

export const getHealthProfiles = async () => {
    try {
      const response = await api.get("/api/health-profiles", {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Get health profiles error:", error);
      throw error;
    }
  }
  


export const getProfileDetail = async (id) => {
    try {
        const response = await api.get(`/api/health-profiles/${id}`, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('authToken')}`
        }
        });
        return response.data;
    } catch (error) {
        console.error("Get profile detail error:", error);
        throw error;
    }
}