import {Tabs, Tab, Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ReservationTable from '../../components/facility/ReservationTable';
const FacilityReservations = () => {
    const [viewType, setViewType] = useState('uncofirmed');

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
                <ReservationTable />
            </div>
        </div>
    );
}

export default FacilityReservations;
