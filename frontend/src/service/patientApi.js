import api from './api';

const resource = '/patients';

const patientApi = {
    getAll: () => {
        return api.get(resource);
    },

    getByDoctor: () => {
        return api.get(`patient/doctor`);
    },

    homePage: () => {
        return api.get('homepage');
    }
}

export default patientApi;