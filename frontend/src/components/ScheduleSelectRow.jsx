import { Switch, Box } from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ScheduleSelectRow = ({ day, dayOfWeek, schedule, onScheduleChange }) => {
  const [isWorking, setIsWorking] = useState(false);
  const [morningStart, setMorningStart] = useState("08:00");
  const [morningEnd, setMorningEnd] = useState("12:00");
  const [afternoonStart, setAfternoonStart] = useState("13:00");
  const [afternoonEnd, setAfternoonEnd] = useState("17:00");

  useEffect(() => {
    if (schedule) {
      setIsWorking(true);
      const [start, end] = schedule.start_time.split(":");
      const [endHour, endMin] = schedule.end_time.split(":");

      // Assuming morning shift is until 12:00
      if (parseInt(end) < 12) {
        setMorningStart(`${start}:${schedule.start_time.split(":")[1]}`);
        setMorningEnd(`${end}:${schedule.end_time.split(":")[1]}`);
        setAfternoonStart("13:00");
        setAfternoonEnd("17:00");
      } else if (parseInt(start) >= 12) {
        setMorningStart("08:00");
        setMorningEnd("12:00");
        setAfternoonStart(`${start}:${schedule.start_time.split(":")[1]}`);
        setAfternoonEnd(`${endHour}:${endMin}`);
      } else {
        // Full day shift
        setMorningStart(`${start}:${schedule.start_time.split(":")[1]}`);
        setMorningEnd("12:00");
        setAfternoonStart("13:00");
        setAfternoonEnd(`${endHour}:${endMin}`);
      }
    } else {
      setIsWorking(false);
      setMorningStart("08:00");
      setMorningEnd("12:00");
      setAfternoonStart("13:00");
      setAfternoonEnd("17:00");
    }
  }, [schedule]);

  const handleWorkChange = (event) => {
    const newIsWorking = event.target.checked;
    setIsWorking(newIsWorking);
    if (onScheduleChange) {
      onScheduleChange(day, newIsWorking, {
        start_time: newIsWorking ? morningStart : null,
        end_time: newIsWorking ? afternoonEnd : null,
      });
    }
  };

  const handleTimeChange = (period, type, value) => {
    if (period === "morning") {
      if (type === "start") setMorningStart(value);
      else setMorningEnd(value);
    } else {
      if (type === "start") setAfternoonStart(value);
      else setAfternoonEnd(value);
    }

    if (onScheduleChange && isWorking) {
      onScheduleChange(day, true, {
        start_time: period === "morning" ? value : morningStart,
        end_time: period === "afternoon" ? value : afternoonEnd,
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "30%" }}>
        <Switch checked={isWorking} onChange={handleWorkChange} />
        <span className="font-medium">{dayOfWeek}</span>
        {!isWorking && (
          <p className="text-gray-500 italic text-sm">
            Không làm việc ngày này
          </p>
        )}
      </Box>
      {isWorking && (
        <div className="flex flex-col gap-2.5">
          <Box
            direction="row"
            gap={2}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              fontSize: "0.875rem",
              color: "#6a7282",
            }}
          >
            <input
              className="time-input"
              type="time"
              value={morningStart}
              onChange={(e) =>
                handleTimeChange("morning", "start", e.target.value)
              }
              lang="en-GB"
            />
            To
            <input
              className="time-input"
              type="time"
              value={morningEnd}
              onChange={(e) =>
                handleTimeChange("morning", "end", e.target.value)
              }
              lang="en-GB"
            />
          </Box>
          <Box
            direction="row"
            gap={2}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              fontSize: "0.875rem",
              color: "#6a7282",
            }}
          >
            <input
              className="time-input"
              type="time"
              value={afternoonStart}
              onChange={(e) =>
                handleTimeChange("afternoon", "start", e.target.value)
              }
              lang="en-GB"
            />
            To
            <input
              className="time-input"
              type="time"
              value={afternoonEnd}
              onChange={(e) =>
                handleTimeChange("afternoon", "end", e.target.value)
              }
              lang="en-GB"
            />
          </Box>
        </div>
      )}
    </div>
  );
};

ScheduleSelectRow.propTypes = {
  day: PropTypes.string.isRequired,
  dayOfWeek: PropTypes.string.isRequired,
  schedule: PropTypes.shape({
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    day_of_week: PropTypes.string,
  }),
  onScheduleChange: PropTypes.func,
};

export default ScheduleSelectRow;
