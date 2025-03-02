import React, { useState, useEffect } from 'react';
import './healthProfiles.css'
import { Breadcrumbs, Typography, Tabs, Tab, Box, Avatar, ListItem, ListItemIcon, ListItemText, Stack, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import CallIcon from '@mui/icons-material/Call';
import WcIcon from '@mui/icons-material/Wc';
import AvatarFrame from '@images/avatar-frame.png';
import HealthProfileHistory from './HealthProfileHistory';
import { getProfileDetail } from '../../../service/healthProfileApi';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HealthProfileDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        getProfileDetail(id).then((data) => {
            setProfile(data);
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    },[])
    const [tabValue, setTabValue] = useState(0);



    return (
        <div className='health-profile-detail'>
            <Breadcrumbs>
                <Typography>Home</Typography>
                <Typography>Health Profiles</Typography>
                <Typography>{profile?.name} ({t(profile?.relationship)})</Typography>
            </Breadcrumbs>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'start', gap: '30px' }}>
                <div className='main-content'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs variant='fullWidth' value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                            <Tab label='Lịch sử bệnh án'></Tab>
                            <Tab label='Theo dõi chỉ số'></Tab>
                        </Tabs>
                    </Box>
                    <Box>
                        {tabValue === 0 && <HealthProfileHistory />}
                        {tabValue === 1 && <div>Chỉ số</div>}
                    </Box>
                </div>
                <div className='basic-infor-section'>
                    <div className='infor-item'>
                          <Box
                            sx={{
                                padding: "10px",
                                width: 150,
                                height: 150,
                                border: "10px solid transparent",
                                margin: "0 auto",
                                backgroundImage: `url(${AvatarFrame})`,
                                backgroundSize: "calc(1.6 *100%) auto",
                                backgroundPosition: "center",
                            }}
                        >
                            <Avatar
                                src={profile?.avatar}
                                alt="avatar"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Box>


                        <Typography variant='h6' textAlign={'center'}>Thông tin cơ bản</Typography>
                        <div>
                            <ListItem sx={{ paddingY: 0 }}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={profile?.name} secondary="Họ và tên"/>
                            </ListItem>
                            <ListItem sx={{ paddingY: 0 }}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={profile?.address || "Không có"} secondary="Địa chỉ"/>
                            </ListItem>
                            <ListItem sx={{ paddingY: 0 }}>
                                <ListItemIcon>
                                    <CallIcon />
                                </ListItemIcon>
                                <ListItemText primary={profile?.phone} secondary="Số điện thoại"/>
                            </ListItem>
                            <ListItem sx={{ paddingY: 0 }}>
                                <ListItemIcon>
                                    <WcIcon />
                                </ListItemIcon>
                                <ListItemText primary={t(profile?.gender)} secondary="Giới tính"/>
                            </ListItem>
                        </div>

                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Button variant='outlined'>Chỉnh sửa</Button>
                            <Button variant='outlined' color="error">Xóa</Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HealthProfileDetail;
