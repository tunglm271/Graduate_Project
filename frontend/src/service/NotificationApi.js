import api from "./api";

const resource = '/notifications';

const NotificationApi = {
    getNotifications: async (params) => {
        try {
        const response = await api.get(resource, { params });
        return response.data;
        } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
        }
    },
    
    markAsRead: async (notificationId) => {
        try {
        const response = await api.post(`${resource}/${notificationId}/read`);
        return response.data;
        } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
        }
    },
    
    clearAll: async () => {
        try {
        const response = await api.delete(`${resource}`);
        return response.data;
        } catch (error) {
        console.error('Error clearing all notifications:', error);
        throw error;
        }
    },
    deleteNotification: async (notificationId) => {
        try {
        const response = await api.delete(`${resource}/${notificationId}`);
        return response.data;
        } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
        }
    }
};

export default NotificationApi;