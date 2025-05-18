import api from "../api";

const resource = "/admin/patient-accounts";

const adminPatientAccountApi = {
    getAllPatientAccounts() {
        return api.get(`${resource}`);
    },

    getPatientAccountById(id) {
        return api.get(`${resource}/${id}`);
    },

    activatePatientAccount(id) {
        return api.put(`${resource}/${id}/activate`);
    },

    deactivatePatientAccount(id) {
        return api.put(`${resource}/${id}/deactivate`);
    },
}

export default adminPatientAccountApi;