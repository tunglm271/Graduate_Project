import api from "./api";

const resource = "/medical-services";

const medicalServiceApi = {
  getAll() {
    return api.get(resource);
  },

  getByFacility() {
    return api.get(`my-medical-services`);
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

  getValiableSlots(serviceId, date) {
    return api.get(`service/valiable-slots?id=${serviceId}&date=${date}`);
  },
};

export default medicalServiceApi;
