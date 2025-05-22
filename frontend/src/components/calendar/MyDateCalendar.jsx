import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Link } from 'react-router-dom';
import Appoinment from './Appoinment';
import { set } from 'date-fns';

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.includes(day.date());

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <span style={{ color: 'red' }}>●</span> : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function MyDateCalendar({ appointments }) {
  const [currentMonth, setCurrentMonth] = React.useState(initialValue);
  const [selectedDate, setSelectedDate] = React.useState(initialValue);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [appoinmentsInDay, setAppoinmentsInDay] = React.useState([]);

  const updateHighlightedDays = (monthToDisplay) => {
    const days = appointments
      .map(item => dayjs(item.date))
      .filter(date =>
        date.month() === monthToDisplay.month() &&
        date.year() === monthToDisplay.year()
      )
      .map(date => date.date()); // lấy số ngày (1–31)

    setHighlightedDays(days);
  };

  React.useEffect(() => {
    updateHighlightedDays(currentMonth);
  }, [appointments, currentMonth]);

  React.useEffect(() => {
    const appoinmentsInDay = appointments.filter(item => {
      const date = dayjs(item.date);
      return date.date() === selectedDate.date() &&
        date.month() === selectedDate.month() &&
        date.year() === selectedDate.year();
    });
    setAppoinmentsInDay(appoinmentsInDay);
  }, [appointments, selectedDate]);

  const handleMonthChange = (date) => {
    setCurrentMonth(date);
  };

  return (
    <div id="appointment-quick-view">
      <h3>Lịch hẹn</h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <DateCalendar
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{ day: ServerDay }}
            slotProps={{ day: { highlightedDays } }}
            sx={{
              width: '100%',
              maxHeight: '400px',
              '.MuiPickersDay-root': {
                fontSize: '14px',
                padding: '22px',
              },
              '.MuiPickersToolbar-root': {
                height: '60px',
                fontSize: '1.25rem',
                display: 'flex',
                justifyContent: 'space-around',
              },
              '.MuiPickersToolbarText-root': {
                fontSize: '1.25rem',
                fontWeight: 'bold',
              },
              '.MuiDayCalendar-weekDayLabel': {
                width: '44px',
                textAlign: 'center',
              },
              '.MuiPickersCalendarHeader-root': {
                padding: 0,
              },
            }}
          />
        </div>
      </LocalizationProvider>
      <div>
        <div className="row">
          <h3>Lịch khám</h3>
          <Link to="/appointments" className='text-blue-400 text-sm hover:text-blue-500 hover:underline'>
            Xem thêm
          </Link>
        </div>

        <div id="appoinment-list">
          {
            appoinmentsInDay.length > 0 ? (
              appoinmentsInDay.map((item, index) => (
                <Appoinment key={index} appoinment={item} />
              ))
            ) : (
              <p>Không có lịch hẹn nào trong ngày này</p>
            )
          }
        </div>
      </div>
    </div>
  );
}
