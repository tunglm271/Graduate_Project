import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createEventRecurrencePlugin, createEventsServicePlugin  } from "@schedule-x/event-recurrence";
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { useState, useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';
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
      title: 'Working Schedule',
      start: `2025-01-01 ${startTime}`,
      end: `2025-01-01 ${endTime}`,
      location: "Phòng khám",
      rrule: 'FREQ=WEEKLY;BYDAY=' + dayCode,
    };
  });
}

const WorkingSchedule = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorApi.getDoctorSchedule()
      .then((response) => {
        const convertedSchedules = createSchedule(response.data);
        setSchedules(convertedSchedules);
        eventsService.set(convertedSchedules);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
        setLoading(false);
      });
  }, []);

  const handleClickDateTime = (dateTime) => {
    const [date, time] = dateTime.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    setSelectedDate(date);
    const dayColumn = document.querySelector(`[data-time-grid-date="${date}"]`);
    if (dayColumn) {
      const rect = dayColumn.getBoundingClientRect();
      const positionY = ((hour - 6) * 60 + minute) / (14 * 60) * rect.height;
      setMenuPosition({ top: rect.top + positionY, left: rect.left + 100 });
    } else {
      setMenuPosition({ top: window.innerHeight / 2, left: window.innerWidth / 2 });
    }
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const calendarControls = useState(() => createCalendarControlsPlugin())[0];
  const calendar = useCalendarApp({
    dayBoundaries: { start: '06:00', end: '20:00' },
    weekOptions: { gridHeight: 1000 },
    callbacks: { onClickDateTime: handleClickDateTime },
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    plugins: [eventsService, createEventRecurrencePlugin(), calendarControls],
  });

  useEffect(() => {
    eventsService.getAll();
  }, []);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    calendarControls.setDate(newDate);
    const dayColumn = document.querySelector(`[data-time-grid-date="${newDate}"]`);
    const rect = dayColumn.getBoundingClientRect();
    setMenuPosition({ top: menuPosition.top, left: rect.left + 100 });
  };

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
      <Menu
        open={Boolean(menuPosition)}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        <div style={{ padding: '8px' }}>
          <p>Tạo lịch tái khám</p>
          <input 
            type="date" 
            className="w-full border-[1px] rounded-sm border-gray-400"
            value={selectedDate}
            onChange={handleDateChange} 
          />
        </div>
        <MenuItem disabled>Thời gian: {selectedDate?.toDateString()}</MenuItem>
        <MenuItem onClick={() => alert(`Thêm sự kiện vào ${selectedDate}`)}>Thêm sự kiện</MenuItem>
        <MenuItem onClick={handleClose}>Đóng</MenuItem>
      </Menu>
    </div>
  );
};

export default WorkingSchedule;
