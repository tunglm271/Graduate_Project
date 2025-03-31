import { useState } from "react";
import { Switch, TextField, Button } from "@mui/material";

export default function WorkSchedule({ day, shifts, setShifts }) {
  const [enabled, setEnabled] = useState(shifts.length > 0);

  const handleToggle = () => {
    setEnabled(!enabled);
    setShifts(!enabled ? [{ start: "", end: "" }] : []);
  };

  const handleShiftChange = (index, field, value) => {
    const updatedShifts = [...shifts];
    updatedShifts[index][field] = value;
    setShifts(updatedShifts);
  };

  const addShift = () => {
    setShifts([...shifts, { start: "", end: "" }]);
  };

  const removeShift = (index) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  return (
    <div className="py-4 px-8">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{day}</span>
          <Switch checked={enabled} onChange={handleToggle} />
        </div>

        {enabled && (
          <div className="mt-4 space-y-4">
            {shifts.map((shift, index) => (
              <div key={index} className="flex gap-4 items-center">
                <TextField
                  label="Giờ bắt đầu"
                  type="time"
                  value={shift.start}
                  onChange={(e) => handleShiftChange(index, "start", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Giờ kết thúc"
                  type="time"
                  value={shift.end}
                  onChange={(e) => handleShiftChange(index, "end", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <Button variant="outlined" color="error" onClick={() => removeShift(index)}>
                  Xóa
                </Button>
              </div>
            ))}
            <Button variant="contained" onClick={addShift}>
              Thêm ca làm việc
            </Button>
          </div>
        )}
    </div>
  );
}
