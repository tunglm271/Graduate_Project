import './healthProfiles.css';
import { useEffect, useState } from 'react';
import { IconButton, Button, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import healthProfileApi from '../../../service/healthProfileApi';
import NewProfileCard from '../../../components/NewProfileCard';
import useCustomSnackbar from '../../../hooks/useCustomSnackbar';
import { useTranslation } from 'react-i18next';

const HealthProfiles = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [healthProfiles, setHealthProfiles] = useState([]);
    const { showInfoSnackbar } = useCustomSnackbar();
    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
            <div className='flex justify-between items-center mb-4'>
                <p className='max-w-2/3 text-xl lg:text-3xl font-bold'>{ t("health-profiles-list") }</p>
                <Link to="/health-profile/new">
                    {
                        isMobile ? (
                            <IconButton color="primary" size="large">
                                <AddIcon />
                            </IconButton>
                        ) : (
                            <Button variant="outlined" color="primary" startIcon={<AddIcon />}>
                                {t("add-profile")}
                            </Button>
                        )
                    }
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    Array.from(new Array(6)).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            height={300}
                            sx={{ borderRadius: 2, marginBottom: 2, width: '100%' }}
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
