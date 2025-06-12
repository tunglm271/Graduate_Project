import { Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ReservationTable from "../../components/facility/ReservationTable";
import appointmentApi from "../../service/appointmentApi";
import ReservationPopUp from "../../components/dialog/ReservationPopUp";

const FacilityReservations = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState(null);
  const [reservationId, setReservationId] = useState(null);

  const refreshAppointments = () => {
    setLoading(true);
    appointmentApi
      .getFacilityAppointments()
      .then((res) => {
        setAppointments(res.data);
        setFilteredAppointments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshAppointments();
  }, []);

  useEffect(() => {
    if (reservationId) {
      setReservation(
        filteredAppointments.find((item) => item.id === reservationId)
      );
    }
  }, [reservationId, filteredAppointments]);

  useEffect(() => {
    const filtered = appointments.filter((appointment) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        appointment.medical_service?.name.toLowerCase().includes(searchLower) ||
        appointment.health_profile?.name.toLowerCase().includes(searchLower) ||
        appointment.status?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredAppointments(filtered);
  }, [searchQuery, appointments]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <div className="flex justify-between items-center">
          <div className="reservation-search bg-slate-200">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="flex-1 focus:outline-0"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<FilterAltIcon />}>
              Lọc
            </Button>
            <Button variant="contained" startIcon={<AddIcon />}>
              Thêm lịch hẹn
            </Button>
          </Stack>
        </div>
        <ReservationTable
          appointments={filteredAppointments}
          setReservationId={setReservationId}
          loading={loading}
          onRefresh={refreshAppointments}
        />
      </div>
      {Boolean(reservationId) && (
        <ReservationPopUp
          open={Boolean(reservationId)}
          reservation={reservation}
          onClose={() => setReservationId(null)}
          onRefresh={refreshAppointments}
        />
      )}
    </div>
  );
};

export default FacilityReservations;
