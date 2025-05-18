import api from "../api";

const resource = "/articles";

const blogApi = {
    getAll() {
        return api.get(resource);
    },

    getById(id) {
        return api.get(`${resource}/${id}`);
    },

    create(data) {
        return api.post(resource, data);
    },

    update(id, data) {
        return api.put(`${resource}/${id}`, data);
    },

    publish(id) {
        return api.post(`${resource}/${id}/publish`);
    },

    unpublish(id) {
        return api.post(`${resource}/${id}/unpublish`);
    },

    delete(id) {
        return api.delete(`${resource}/${id}`);
    }
}

export default blogApi;