import './healthProfiles.css';
import { useEffect, useState } from 'react';
import { Breadcrumbs, Typography, Button, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import healthProfileApi from '../../../service/healthProfileApi';
import NewProfileCard from '../../../components/NewProfileCard';
import useCustomSnackbar from '../../../hooks/useCustomSnackbar';
import { useTranslation } from 'react-i18next';

const HealthProfiles = () => {
    const { t } = useTranslation();
    const [healthProfiles, setHealthProfiles] = useState([]);
    const { showInfoSnackbar } = useCustomSnackbar();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        healthProfileApi.getAll().then(res => {
            setHealthProfiles(res.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleDelete = (id) => {
        setHealthProfiles(healthProfiles.filter(profile => profile.id !== id));
        showInfoSnackbar('Xóa hồ sơ sức khỏe thành công');
    };

    return (
        <div id="health-profiles-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1>{ t("health-profiles-list") }</h1>
                <Link to="/health-profile/new">
                    <Button variant="outlined" color="primary" startIcon={<AddIcon />}>
                        { t("add-profile") }
                    </Button>
                </Link>
            </div>
            <div className="health-profiles-list">
                {loading ? (
                    Array.from(new Array(3)).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            height={300}
                            sx={{ borderRadius: 2, marginBottom: 2, width: '25%' }}
                        />
                    ))
                ) : (
                    healthProfiles.map((profile) => (
                        <NewProfileCard key={profile.id} profile={profile} onDelete={handleDelete} />
                    ))
                )}
            </div>
        </div>
    );
};

export default HealthProfiles;
