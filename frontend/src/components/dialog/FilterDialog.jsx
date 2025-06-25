import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { STATUS_OPTIONS } from "../../utlis/renderStatus";

const FilterDialog = ({ open, onClose, onApply, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    status: initialFilters.status || "",
    startDate: initialFilters.startDate || "",
    endDate: initialFilters.endDate || "",
  });

  const handleChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleClear = () => {
    setFilters({
      status: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Lọc lịch hẹn</span>
          {hasActiveFilters && (
            <Chip
              label="Xóa bộ lọc"
              onClick={handleClear}
              color="error"
              variant="outlined"
              size="small"
            />
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={filters.status}
              onChange={handleChange("status")}
              label="Trạng thái"
            >
              <MenuItem value="">Tất cả</MenuItem>
              {STATUS_OPTIONS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Từ ngày"
              type="date"
              value={filters.startDate}
              onChange={handleChange("startDate")}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Đến ngày"
              type="date"
              value={filters.endDate}
              onChange={handleChange("endDate")}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>Hủy</Button>
        <Button onClick={handleApply} variant="contained">
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
