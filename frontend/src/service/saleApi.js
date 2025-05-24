import api from './api';

const resource = '/sales';

const saleApi = {
    getAll: () => {
        return api.get(`${resource}`);
    },

    create: (data) => {
        return api.post(`${resource}`, data);
    },

    update: (id, data) => {
        return api.put(`${resource}/${id}`, data);
    },

    delete: (id) => {
        return api.delete(`${resource}/${id}`);
    },

    getRevenueStats: (params) => {
        return api.get(`${resource}/revenue-stats`, { params });
    }
};

export default saleApi;