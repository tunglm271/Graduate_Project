import { Avatar, Stack } from '@mui/material';
import React from 'react';
import { deepOrange, deepPurple } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const Appoinment = () => {
    return (
        <Stack direction={'row'} spacing={2} sx={{
            backgroundColor: '#F0F9FD',
            padding: 1,
            borderRadius: '10px',
        }}>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>N</Avatar>
            <div className='appoinment-info'>
                <h4>Khám tổng quát </h4>
                <div className='row'>
                    <p>8 April, 2021   |   04:00 PM</p>
                    
                    <p style={{display: 'flex', alignItems: 'center', gap: '2px'}}>
                        <LocationOnIcon fontSize='12' color='primary'/> Hà Nội
                    </p>
                </div>
            </div>
        </Stack>
    );
}

export default Appoinment;
