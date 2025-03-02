import './healthProfiles.css'
import { useEffect, useState } from 'react';
import ProfileCard from '../../../components/card/ProfileCard';
import { Breadcrumbs, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { getHealthProfiles } from '../../../service/healthProfileApi';
const HealthProfiles = () => {

    const [healthProfiles, setHealthProfiles] = useState([]);

    useEffect(() => {
        getHealthProfiles().then((response) => {
            setHealthProfiles(response);
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div id="health-profiles-section">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
                <Typography color="text.primary">Home</Typography>
                <Typography color="text.primary">Profile</Typography>
            </Breadcrumbs>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>Danh sách hồ sơ sức khỏe</h1>
                <Link to="/health-profile/new">
                    <Button variant="outlined" color="primary" startIcon={<AddIcon />}>Thêm hồ sơ</Button>
                </Link>
            </div>
            {
                healthProfiles.map((profile, index) => <ProfileCard key={index} profile={profile} />)
            }
        </div>
    );
}

export default HealthProfiles;
