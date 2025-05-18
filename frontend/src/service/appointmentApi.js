import api from "./api";

const resource = "/appointments";

const appointmentApi = {
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

    createByDoctor(formData) {
        return api.post(`appointment/doctor-create`, formData, {
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

    getFacilityAppointments() {
        return api.get(`appointment/facility`);
    },

    getDoctorAppointments() {
        return api.get(`appointment/doctor`);
    },

    assignDoctor(appointmentId, doctorId) {
        return api.post(`appointment/assign-doctor`, { appointment_id: appointmentId, doctor_id: doctorId });
    },

    addResult(appointmentId, formData) {
        return api.post(`${resource}/${appointmentId}/add-result`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};

export default appointmentApi;