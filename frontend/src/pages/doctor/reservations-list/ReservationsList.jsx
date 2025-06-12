import ReservationTable from "../../../components/facility/ReservationTable";
import appointmentApi from "../../../service/appointmentApi";
import { useEffect, useState } from "react";
import ReservationPopUp from "../../../components/dialog/ReservationPopUp";
import AddResultDrawer from "../../../components/AddResultDrawer";
import {
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { STATUS_OPTIONS } from "../../../utlis/renderStatus";

const ReservationsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reservationId, setReservationId] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [addResult, setAddResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (reservationId) {
      setReservation(
        filteredAppointments.find((item) => item.id === reservationId)
      );
    }
  }, [reservationId, filteredAppointments]);

  const refreshAppointments = () => {
    setLoading(true);
    appointmentApi
      .getDoctorAppointments()
      .then((res) => {
        setAppointments(res.data);
        setFilteredAppointments(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setReservationId(null);
        setReservation(null);
      });
  };

  useEffect(() => {
    refreshAppointments();
  }, []);

  useEffect(() => {
    let filtered = appointments;

    // Apply search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (appointment) =>
          appointment.medical_service?.name
            .toLowerCase()
            .includes(searchLower) ||
          appointment.health_profile?.name
            .toLowerCase()
            .includes(searchLower) ||
          appointment.status?.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(
        (appointment) => appointment.status === filters.status
      );
    }

    // Apply date range filter
    if (filters.startDate || filters.endDate) {
      filtered = filtered.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointment_date);
        const startDate = filters.startDate
          ? new Date(filters.startDate)
          : null;
        const endDate = filters.endDate ? new Date(filters.endDate) : null;

        if (startDate && endDate) {
          return appointmentDate >= startDate && appointmentDate <= endDate;
        } else if (startDate) {
          return appointmentDate >= startDate;
        } else if (endDate) {
          return appointmentDate <= endDate;
        }
        return true;
      });
    }

    setFilteredAppointments(filtered);
  }, [searchQuery, appointments, filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="p-5">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="reservation-search bg-slate-200">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="focus:outline-0"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={showFilters ? "contained" : "outlined"}
              startIcon={<FilterAltIcon />}
              onClick={() => setShowFilters(!showFilters)}
              color={showFilters ? "primary" : "inherit"}
            >
              Lọc
            </Button>
            <Button variant="contained" startIcon={<AddIcon />}>
              Thêm lịch hẹn
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="flex gap-4 items-center bg-slate-50 p-3 rounded">
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={filters.status}
                onChange={handleFilterChange("status")}
                label="Trạng thái"
                size="small"
              >
                <MenuItem value="">Tất cả</MenuItem>
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Từ ngày"
              type="date"
              value={filters.startDate}
              onChange={handleFilterChange("startDate")}
              size="small"
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Đến ngày"
              type="date"
              value={filters.endDate}
              onChange={handleFilterChange("endDate")}
              size="small"
              InputLabelProps={{ shrink: true }}
            />

            {(filters.status || filters.startDate || filters.endDate) && (
              <Button
                size="small"
                onClick={handleClearFilters}
                sx={{ ml: "auto" }}
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        )}
      </div>

      <ReservationTable
        appointments={filteredAppointments}
        setReservationId={setReservationId}
        loading={loading}
      />

      {Boolean(reservationId) && (
        <ReservationPopUp
          open={Boolean(reservationId)}
          reservation={reservation}
          onClose={() => setReservationId(null)}
          openResult={addResult}
          handleOpenResult={setAddResult}
        />
      )}

      {addResult && (
        <AddResultDrawer
          open={addResult}
          onClose={() => setAddResult(false)}
          appointmentId={reservationId}
          onSuccess={refreshAppointments}
        />
      )}
    </div>
  );
};

export default ReservationsList;
