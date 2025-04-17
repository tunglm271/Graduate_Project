import api from './api';

const resource = '/patients';

const patientApi = {
    getAll: () => {
        return api.get(resource);
    },

    getByDoctor: () => {
        return api.get(`patient/doctor`);
    }
}

export default patientApi;