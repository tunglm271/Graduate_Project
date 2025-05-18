import ReservationTable from "../../../components/facility/ReservationTable";
import appointmentApi from "../../../service/appointmentApi";
import { useEffect, useState } from "react";
import ReservationPopUp from "../../../components/dialog/ReservationPopUp";
import AddResultDrawer from "../../../components/AddResultDrawer";
import { Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const ReservationsList = () => {
    const [appointments, setAppointments] = useState([]);
    const [reservationId, setReservationId] = useState(null);
    const [reservation, setReservation] = useState(null);
    const [addResult, setAddResult] = useState(false);
    useEffect(() => {
        if(reservationId) {
            setReservation(appointments.find((item) => item.id === reservationId));
        }
    }, [reservationId, appointments]);

    useEffect(() => {
        appointmentApi.getDoctorAppointments().then((res) => {
            setAppointments(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <div className="p-5">
            <div className='flex justify-between items-center'>
                <div className='reservation-search bg-slate-200'>
                    <SearchIcon />
                    <input type="text" placeholder="Tìm kiếm" />
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
            <ReservationTable appointments={appointments} setReservationId={setReservationId}/>
            {Boolean(reservationId) && <ReservationPopUp open={Boolean(reservationId)} reservation={reservation} onClose={() => setReservationId(null)} openResult={addResult} handleOpenResult={setAddResult}/>}
            {addResult && <AddResultDrawer open={addResult} onClose={() => setAddResult(false)} appointmentId={reservationId}/>}
        </div>
    );
}

export default ReservationsList;
