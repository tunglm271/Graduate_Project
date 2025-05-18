import api from "../api";


const resource = "/admin/medical-facilities";

const adminFacilityApi = {
    getAllFacilities() {
        return api.get(`${resource}`);
    },

    getFacilityById(id) {
        return api.get(`${resource}/${id}`);
    },

    deactivateFacility(id) {
        return api.post(`${resource}/${id}/deactivate`);
    },

    activateFacility(id) {
        return api.post(`${resource}/${id}/activate`);
    },
}

export default adminFacilityApi;