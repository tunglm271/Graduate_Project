import { useState } from "react";
import { Button, Popover, Box } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import dayjs from 'dayjs';
const MonthPicker = ({setMonth}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDateChange = (value) => {
        if (!value.isBefore(dayjs(), "month")) {
          setSelectedDate(value);
          setMonth(value);
          handleClose();
        }
      };

    return (
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Button sx={{
            textTransform: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '16px',
        }} onClick={handleClick}>
            Tháng {selectedDate.format("MM, YYYY")} <ArrowDropDownIcon />
        </Button>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box p={2}>
            <DateCalendar
                views={['year','month']}
                value={selectedDate}
                onChange={handleDateChange}
                slotProps={{
                    day: {
                      shouldDisableDate: (date) => date.isBefore(dayjs(), "month"),
                      sx: (date) => ({
                        color: date.isBefore(dayjs(), "month") ? "gray" : "inherit",
                        pointerEvents: date.isBefore(dayjs(), "month") ? "none" : "auto",
                      }),
                    },
                }}  
            />
            </Box>
        </Popover>
    </LocalizationProvider>
    );
}

export default MonthPicker;
