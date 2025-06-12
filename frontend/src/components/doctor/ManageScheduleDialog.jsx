import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WorkSchedule from "../WorkSchedule";
import doctorApi from "../../service/DoctorApi";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import PropTypes from "prop-types";

const daysOfWeek = [
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
  "Chủ Nhật",
];

const ManageScheduleDialog = ({ open, onClose, onScheduleUpdate }) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
  const [weekSchedule, setWeekSchedule] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchCurrentSchedule();
    }
  }, [open]);

  const fetchCurrentSchedule = async () => {
    try {
      const response = await doctorApi.getDoctorSchedule();
      console.log("Current schedules:", response.data.schedules);

      // Initialize empty schedule for all days
      const newWeekSchedule = daysOfWeek.reduce((acc, day) => {
        acc[day] = [];
        return acc;
      }, {});

      // Map existing schedules to their respective days
      response.data.schedules.forEach((schedule) => {
        if (newWeekSchedule[schedule.day_of_week]) {
          newWeekSchedule[schedule.day_of_week].push({
            id: schedule.id,
            start: schedule.start_time.slice(0, 5), // Get only HH:mm part
            end: schedule.end_time.slice(0, 5), // Get only HH:mm part
          });
        }
      });

      console.log("Mapped week schedule:", newWeekSchedule);
      setWeekSchedule(newWeekSchedule);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      showErrorSnackbar("Không thể tải lịch làm việc");
    }
  };

  const updateShifts = (day, shifts) => {
    setWeekSchedule({ ...weekSchedule, [day]: shifts });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Convert weekSchedule to API format
      const schedules = Object.entries(weekSchedule).flatMap(([day, shifts]) =>
        shifts.map((shift) => ({
          day_of_week: day,
          start_time: shift.start,
          end_time: shift.end,
          id: shift.id, // Keep existing IDs for updates
        }))
      );

      await doctorApi.updateSchedule(schedules);
      showSuccessSnackbar("Cập nhật lịch làm việc thành công");
      if (onScheduleUpdate) {
        onScheduleUpdate();
      }
      onClose();
    } catch (error) {
      console.error("Error updating schedule:", error);
      showErrorSnackbar("Không thể cập nhật lịch làm việc");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: "80vh",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6" component="div">
          Quản lý lịch làm việc
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {daysOfWeek.map((day) => (
            <WorkSchedule
              key={day}
              day={day}
              shifts={weekSchedule[day]}
              setShifts={(shifts) => updateShifts(day, shifts)}
            />
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: "1px solid #e0e0e0" }}>
        <Button onClick={onClose} disabled={isLoading}>
          Hủy
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ManageScheduleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onScheduleUpdate: PropTypes.func,
};

export default ManageScheduleDialog;
