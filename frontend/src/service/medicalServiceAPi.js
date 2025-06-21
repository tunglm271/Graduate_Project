import api from "./api";

const resource = "/medical-services";

const medicalServiceApi = {
  getAll(data) {
    return api.get(resource, { params: data });
  },

  getByFacility() {
    return api.get(`my-medical-services`);
  },

  getByDoctor() {
    return api.get(`doctor-medical-services`);
  },

  getById(id) {
    return api.get(`${resource}/${id}`);
  },

  getByIdForPatient(id) {
    return api.get(`patient/medical-services/${id}`);
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

  getDoctorSlots(date, doctorId) {
    if (doctorId) {
      return api.get(`service/doctor-slots?date=${date}&doctor_id=${doctorId}`);
    }
    return api.get(`service/doctor-slots?date=${date}`);
  },

  getDoctor(serviceId,appointmentId) {
    return api.get(`service/doctors?id=${serviceId}&appointment_id=${appointmentId}`);
  },
  
};

export default medicalServiceApi;
