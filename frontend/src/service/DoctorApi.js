import api from './api';

const resource = '/doctors';

const doctorApi = {
    getAll() {
        return api.get(resource);
    },

    getById(id) {
        return api.get(`${resource}/${id}`);
    },

    create(formData, schedule) {
        const sendData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                sendData.append(key, value);
            }
        });
        sendData.append('schedule', JSON.stringify(schedule));
        return api.post(resource, sendData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    update(id, formData) {
        return api.post(`${resource}/${id}?_method=PUT`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    delete(id) {
        return api.delete(`${resource}/${id}`);
    },

    getDoctorSchedule() {
        return api.get(`doctor/schedule`);
    },

    updateSchedule(schedules) {
        const scheduleObject = schedules.reduce((acc, schedule) => {
            if (!acc[schedule.day_of_week]) {
                acc[schedule.day_of_week] = [];
            }
            acc[schedule.day_of_week].push({
                start: schedule.start_time,
                end: schedule.end_time
            });
            return acc;
        }, {});

        return api.post('doctor/schedule', { schedule: JSON.stringify(scheduleObject) });
    },
};

export default doctorApi;