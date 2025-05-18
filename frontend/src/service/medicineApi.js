import api from './api';

const medicineApi = {
    getHealthProfileMedicines: (healthProfileId) => {
        return api.get(`/health-profiles/${healthProfileId}/medicines`);
    },
    storeHealthProfileMedicines: (healthProfileId, medicines) => {
        return api.post(`/health-profiles/${healthProfileId}/medicines`, medicines);
    },
    getMedicineSchedules: (healthProfileId, date) => {
        return api.get(`/health-profiles/${healthProfileId}/medicines/schedules?date=${date}`);
    }
}

export default medicineApi;