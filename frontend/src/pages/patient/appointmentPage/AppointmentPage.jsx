import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Box, Avatar, ListItem, ListItemAvatar, Typography, ListItemText, List, Stack, Skeleton } from '@mui/material';
import "./appointment.css"
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppointmentCard from '../../../components/card/AppointmentCard';
import appointmentApi from '../../../service/appointmentApi';

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AppointmentPage = () => {
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const profileId = searchParams.get('profileId');
    const [value, setValue] = useState(0);
    const [healthProfiles, setHealthProfiles] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const { t } = useTranslation();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        appointmentApi.getAll()
            .then((response) => {
                setAppointments(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching health profiles:", error);
            });
    },[])

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '30px', gap: "20px"}}>
            <div id='profile-list'>
                <h4>Hồ sơ sức khỏe</h4>
                <List>
                    {healthProfiles.map((profile, index) => {
                        return (
                            <ListItem 
                                key={index} 
                                sx={{ 
                                    p: 1, 
                                    borderRadius: 2,
                                }}
                                button
                                onClick={() => {
                                    setSearchParams({profileId: profile.id});
                                    console.log(profile.id, profileId);
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ boxSizing: "content-box" ,border: profileId == profile.id ? "2px solid #007bff": "none" }} alt='Remy Sharp' src={profile.avatar} />
                                </ListItemAvatar>
                            <ListItemText 
                                primary={
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                                        {profile.name}
                                    </Typography>
                                } 
                                secondary={
                                    <Typography sx={{ fontSize: '10px' }}>
                                    #{t(profile.relationship)}
                                    </Typography>
                                } 
                            />
                            </ListItem>
                        )
                    })}
                </List>
            </div>

            <div id='appointment-tab'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', background: 'white' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label={
                        <React.Fragment>
                            <p>Tất cả <span style={{ color: '#1976d2' }}>(0)</span></p>
                        </React.Fragment>}
                        {...a11yProps(0)} 
                    />
                    <Tab label={
                        <React.Fragment>
                            <p>Đã đặt lịch <span style={{ color: '#1976d2' }}>(0)</span></p>
                        </React.Fragment>}
                        {...a11yProps(0)} 
                    />    
                     <Tab label={
                        <React.Fragment>
                            <p>Đã chỉ định bác sĩ<span style={{ color: '#1976d2' }}>(0)</span></p>
                        </React.Fragment>}
                        {...a11yProps(0)} 
                    />    
                    <Tab label="Đã hoàn thành" {...a11yProps(4)} />
                    <Tab label="Đã hủy" {...a11yProps(5)} />
                    </Tabs>
                </Box>
                <Stack direction="column" spacing={2} style={{marginTop: '20px'}}>
                    {
                        appointments.length === 0 ? (
                            <>
                                <Skeleton variant="rectangular" width={"100%"} height={150} />
                                <Skeleton variant="rectangular" width={"100%"} height={150} />
                            </>
                        ) :
                        appointments.map((appointment, index) => {
                            return (
                                <AppointmentCard 
                                    key={index} 
                                    appointment={appointment} 
                                />
                            )
                        })
                    }
                </Stack>
            </div>
        </div>
    );
}

export default AppointmentPage;
