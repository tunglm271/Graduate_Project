import api from "./api";
const resource = "/health-profiles";

const healthProfileApi = {
  getAll() {
    return api.get(resource);
  },

  getById(id) {
    return api.get(`${resource}/${id}`);
  },

  create(formData) {
    return api.post(resource, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

  getIndicatorHistory(profileId, indicatorTypeId) {
    return api.get(`${resource}/${profileId}/indicators/${indicatorTypeId}`);
  },
};

export default healthProfileApi;