import { useState } from 'react';
import { Tab, Tabs, Box, Avatar } from '@mui/material';
import React from 'react';
import "./appointment.css"
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AppointmentPage = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '30px'}}>
            <div id='profile-list'>
                <h4>Hồ sơ sức khỏe</h4>
                <div className='profile-row'>
                    <Avatar sx={{border: "2px solid blue"}} alt='Remy Sharp' src='https://mui.com/static/images/avatar/1.jpg' />
                    <p>Tôi</p>
                </div>

                <div className='profile-row'>
                    <Avatar alt='Remy Sharp' src='https://mui.com/static/images/avatar/2.jpg' />
                    <p>Bố</p>
                </div>

                <div className='profile-row'>
                    <Avatar alt='Remy Sharp' src='https://mui.com/static/images/avatar/3.jpg' />
                    <p>Mẹ</p>
                </div>

                <div className='profile-row'>
                    <Avatar alt='Remy Sharp' src='https://mui.com/static/images/avatar/4.jpg' />
                    <p>Em gái</p>
                </div>
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
                    <Tab label="Đang thực hiện" {...a11yProps(2)} />
                    <Tab label="Chờ thanh toán" {...a11yProps(3)} />
                    <Tab label="Đã hoàn thành" {...a11yProps(4)} />
                    <Tab label="Đã hủy" {...a11yProps(5)} />
                    </Tabs>
                </Box>
            </div>
        </div>
    );
}

export default AppointmentPage;
