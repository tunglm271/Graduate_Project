import api from "./api";

const resource = "/medical-facilities";

const facilityApi = {
    getAll() {
        return api.get(resource);
    },
    
    getById(id) {
        return api.get(`${resource}/${id}`);
    },
    
    getbyAuth() {
        return api.get(`my-facility`);
    },

    update(id, formData) {
        return api.post(`${resource}/${id}?_method=PUT`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        });
    },
    
    delete(id) {
        return api.delete(`${resource}/${id}`);
    },

    dashboard() {
        return api.get(`medical-facility/dashboard`);
    }
};

export default facilityApi;