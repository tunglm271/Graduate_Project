import api from "./api";

const resource = "/medical-records";

const medicalRecordApi = {
    getById(id) {
        return api.get(`${resource}/${id}`);
    },

    downloadDescription(id) {
        return api.get(`${resource}/${id}/prescription-download`, { responseType: "blob" });
    }
}

export default medicalRecordApi;