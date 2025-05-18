import React, { useState, useEffect } from 'react';
import './healthProfiles.css'
import { Breadcrumbs, Typography, Tabs, Tab, Box, Avatar, ListItem, ListItemIcon, ListItemText, Stack, Button, Skeleton, CircularProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import CallIcon from '@mui/icons-material/Call';
import WcIcon from '@mui/icons-material/Wc';
import AvatarFrame from '@images/avatar-frame.png';
import HealthProfileHistory from './HealthProfileHistory';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import healthProfileApi from '../../../service/healthProfileApi';
import { Link } from 'react-router-dom';

const HealthProfileDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    useEffect(() => {
        healthProfileApi.getById(id).then(res => {
            setProfile(res.data);
            console.log(res.data);
            setMedicalRecords(res.data.appointments);
            setLoading(false);
        })
    },[])
    const [tabValue, setTabValue] = useState(0);



    return (
        <div className='health-profile-detail'>
            <Breadcrumbs>
                <Link to={"/health-profile"} className="hover:underline">
                    {t("health-profiles-list")}
                </Link>
                {
                    loading ?
                    <Skeleton variant="text" width={150} height={40} /> :
                    <Typography>
                        {profile?.name} ({t("profile.relationship." + profile?.relationship)})
                    </Typography>
                }
            </Breadcrumbs>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'start', gap: '30px' }}>
                <div className='main-content'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs variant='fullWidth' value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                            <Tab label={t('profile.tabs.history')} />
                            <Tab label={t('profile.tabs.indicators')} />
                        </Tabs>
                    </Box>
                    <Box>
                        {tabValue === 0 &&
                            <div> 
                            {
                                loading ? 
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                    <CircularProgress />
                                </Box> :
                                <HealthProfileHistory medicalRecords={medicalRecords} />
                            }
                            </div>
                        }
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


                        <Typography variant='h6' textAlign={'center'}>
                            {t('profile.detail.basic-info')}
                        </Typography>
                        <div>
                            <ListItem sx={{ paddingY: 0 }}>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                {
                                    loading ? 
                                    <Skeleton variant="text" width={150} height={60} /> : 
                                    <ListItemText 
                                        primary={t(`profile.relationship.${profile?.relationship}`)} 
                                        secondary={t('profile.detail.relationship')}
                                    />
                                }
                            </ListItem>
                            <ListItem sx={{ paddingY: 0 }}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                {
                                    loading ? 
                                    <Skeleton variant="text" width={150} height={60} /> : 
                                    <ListItemText 
                                        primary={profile?.name} 
                                        secondary={t('profile.detail.name')}
                                    />
                                }
                            </ListItem>
                            <ListItem sx={{ paddingY: 0 }}>
                                <ListItemIcon>
                                    <CallIcon />
                                </ListItemIcon>
                                {
                                    loading ? 
                                    <Skeleton variant="text" width={150} height={60} /> : 
                                    <ListItemText 
                                        primary={profile?.phone || t('profile.detail.no-phone')} 
                                        secondary={t('profile.detail.phone')} />
                                }
                            </ListItem>
                            <ListItem sx={{ paddingY: 0 }}>
                                <ListItemIcon>
                                    <WcIcon />
                                </ListItemIcon>
                                {
                                    loading ? 
                                    <Skeleton variant="text" width={150} height={60} /> : 
                                    <ListItemText 
                                        primary={profile?.gender}
                                        secondary={t('profile.detail.gender')} 
                                    />
                                }
                            </ListItem>
                        </div>

                        <Stack direction='row' spacing={2} justifyContent='center'>
                            <Button variant='outlined' href={`/health-profile/${id}/edit`}>
                                {t('profile.common.edit')} 
                            </Button>
                            <Button variant='outlined' color="error">
                                {t('profile.common.delete')} 
                            </Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HealthProfileDetail;
