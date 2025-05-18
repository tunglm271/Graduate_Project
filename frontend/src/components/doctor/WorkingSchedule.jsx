import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createEventRecurrencePlugin, createEventsServicePlugin  } from "@schedule-x/event-recurrence";
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { useState, useEffect } from 'react';
import "./schedule.css";
import doctorApi from '../../service/Doctorapi';

function createSchedule(data) {
  const dayMap = {
    'Thứ Hai': 'MO',
    'Thứ Ba': 'TU',
    'Thứ Tư': 'WE',
    'Thứ Năm': 'TH',
    'Thứ Sáu': 'FR',
    'Thứ Bảy': 'SA',
    'Chủ Nhật': 'SU',
  };

  return data.map((item) => {
    const dayCode = dayMap[item.day_of_week] || 'MO';
    const startTime = item.start_time.slice(0, 5);
    const endTime = item.end_time.slice(0, 5);

    return {
      id: item.id,
      title: 'Lịch làm việc',
      start: `2025-01-01 ${startTime}`,
      end: `2025-01-01 ${endTime}`,
      location: "Phòng khám",
      rrule: 'FREQ=WEEKLY;BYDAY=' + dayCode,
    };
  });
}

function createAppointment(data) {
  return data.map((item) => {
    const date = new Date(item.date);
    const startTime = item.start_time.slice(0, 5);
    const endTime = item.end_time.slice(0, 5);

    return {
      id: item.id,
      title: item.medical_service.name,
      start: date.toISOString().split('T')[0] + ' ' + startTime,
      end: date.toISOString().split('T')[0] + ' ' + endTime,
      location: "Phòng khám",
      people: [item.health_profile?.name],
      calendarId: 'appointment'
    };
  });
}

const WorkingSchedule = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  useEffect(() => {
    doctorApi.getDoctorSchedule()
      .then((response) => {
        console.log(response);
        const convertedSchedules = createSchedule(response.data.schedules);
        const convertedAppointments = createAppointment(response.data.appointments);
        eventsService.set([...convertedSchedules,...convertedAppointments]);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
      });
  }, []);


  const calendarControls = useState(() => createCalendarControlsPlugin())[0];
  const calendar = useCalendarApp({
    dayBoundaries: { start: '06:00', end: '20:00' },
    weekOptions: { gridHeight: 1000 },
    calendars: {
      appointment: {
        colorName: 'appointment',
        lightColors: {
          main: '#9b59b6',        
          container: '#f3e5f5',    
          onContainer: '#4a148c',
        },
        darkColors: {
          main: '#e1bee7',      
          onContainer: '#f3e5f5', 
          container: '#6a1b9a', 
        }
      },
    },
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    plugins: [eventsService, createEventRecurrencePlugin(), calendarControls, createEventModalPlugin()],
  });

  useEffect(() => {
    eventsService.getAll();
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};

export default WorkingSchedule;
