import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createEventRecurrencePlugin } from "@schedule-x/event-recurrence";
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import '@schedule-x/theme-default/dist/index.css';
import { useState, useEffect } from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';
import "./schedule.css";

const WorkingSchedule = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  // State lưu vị trí hiển thị Menu
  const [menuPosition, setMenuPosition] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());


  const handleClickDateTime = (dateTime) => {
    
    // Tách ngày và giờ từ datetime
    const [date, time] = dateTime.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    setSelectedDate(date);

    // Tìm cột chứa ngày được click
    const dayColumn = document.querySelector(`[data-time-grid-date="${date}"]`);
    
    if (dayColumn) {
      const rect = dayColumn.getBoundingClientRect();
      const columnTop = rect.top;
      const columnLeft = rect.left;

      // 📌 **Tính toán vị trí theo thời gian**
      const columnHeight = rect.height; // Chiều cao của cột trong lịch
      const minutesPerDay = 14 * 60; // Tổng số phút hiển thị

      // Tính toán vị trí dựa trên số phút từ 06:00 đến giờ hiện tại
      const currentMinutes = (hour - 6) * 60 + minute;
      const positionY = (currentMinutes / minutesPerDay) * columnHeight;

      setMenuPosition({
        top: columnTop + positionY,
        left: columnLeft + 100, // Dịch sang phải một chút cho đẹp
      });
    } else {
      // Nếu không tìm thấy, hiển thị menu ở giữa màn hình
      setMenuPosition({ top: window.innerHeight / 2, left: window.innerWidth / 2 });
    }
  };

  const handleClose = () => {
    setMenuPosition(null);
  };
  const calendarControls =  useState(() => createCalendarControlsPlugin())[0];

  const calendar = useCalendarApp({
    dayBoundaries: {
      start: '06:00',
      end: '20:00',
    },
    weekOptions: {
      gridHeight: 1000,
    },
    callbacks: {
      onClickDateTime: handleClickDateTime, // Gọi khi click vào một slot thời gian
    },
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2023-12-16',
        end: '2023-12-16',
      },
      {
        id: 123,
        title: 'Bi-Weekly Event Monday and Wednesday',
        start: '2024-02-05 08:00',
        end: '2024-02-05 11:00',
        rrule: 'FREQ=WEEKLY;BYDAY=MO,WE',
      },
      {
        id: 132,
        title: 'Bi-Weekly Event Test',
        start: '2024-02-05 14:00',
        end: '2024-02-05 15:00',
        rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE',
      },
    ],
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
    const left = rect.left;
    setMenuPosition({ ...menuPosition, left: left + 100 });
  }

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />

      {/* MUI Menu */}
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
        <MenuItem disabled>Thời gian: {selectedDate}</MenuItem>
        <MenuItem onClick={() => alert(`Thêm sự kiện vào ${selectedDate}`)}>Thêm sự kiện</MenuItem>
        <MenuItem onClick={handleClose}>Đóng</MenuItem>
      </Menu>
    </div>
  );
};

export default WorkingSchedule;
