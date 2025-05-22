import { Avatar, Stack } from '@mui/material';
import React from 'react';
import { deepOrange, deepPurple } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const Appoinment = ({ appoinment }) => {
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('vi-VN', options);
    }


    return (
        <Stack direction={'row'} spacing={2} sx={{
            backgroundColor: '#F0F9FD',
            padding: 1,
            borderRadius: '10px',
        }}>
            <Avatar src={appoinment.medical_facility.logo} />
            <div className='appoinment-info'>
                <h4>{appoinment.medical_service.name}</h4>
                <div className='row'>
                    <p>{formatDate(appoinment.date)}   |   {appoinment.start_time.substring(0, 5)} - {appoinment.end_time.substring(0, 5)} </p>
                    
                    <p style={{display: 'flex', alignItems: 'center', gap: '2px'}}>
                        <LocationOnIcon fontSize='12' color='primary'/> Hà Nội
                    </p>
                </div>
            </div>
        </Stack>
    );
}

export default Appoinment;
