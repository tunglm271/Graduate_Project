import api from './api';

const transactionApi = {
    getBill(appointmentId) {
        return api.get(`appointments/${appointmentId}/bill`);
    },

    vnPayPayment(appointmentId) {
        return api.get(`vnpay_payment?appointment_id=${appointmentId}`);
    },
    verifyPayment(data,appointmentId) {
        return api.post(`appointments/${appointmentId}/vnpay_verify_payment`,data);
    },

    getRevenueStats(params) {
        return api.get('revenue-statistics', { params });
    }
}

export default transactionApi;