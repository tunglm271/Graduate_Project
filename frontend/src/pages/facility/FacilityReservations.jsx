import {Tabs, Tab, Box, Button, Stack } from '@mui/material';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReservationTable from '../../components/facility/ReservationTable';
import appointmentApi from '../../service/appointmentApi';
import ReservationPopUp from '../../components/dialog/ReservationPopUp';
const FacilityReservations = () => {
    const [viewType, setViewType] = useState(0);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reservation, setReservation] = useState(null);
    const [reservationId, setReservationId] = useState(null);

    useEffect(() => {
        appointmentApi.getFacilityAppointments().then((res) => {
            setAppointments(res.data);
            console.log(res.data);
            setLoading(false);
        }
        ).catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if(reservationId) {
            setReservation(appointments.find((item) => item.id === reservationId));
        }
    }, [reservationId, appointments]);

    return (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={viewType} onChange={(e, newValue) => setViewType(newValue)} aria-label="basic tabs example">
                    <Tab label="Chưa xác nhận"  />
                    <Tab label="Lịch sử"  />
                </Tabs>
            </Box>
            <div style={{padding: '20px'}}>
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
            </div>
            {Boolean(reservationId) && <ReservationPopUp open={Boolean(reservationId)} reservation={reservation} onClose={() => setReservationId(null)}/>}
        </div>
    );
}

export default FacilityReservations;
