import { Avatar, IconButton, ListItemIcon, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { calculateAge } from '../utlis/caculateFun';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import ScaleIcon from '@mui/icons-material/Scale';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DeleteIcon from '@mui/icons-material/Delete';
import HiddenText from './HiddenText';
import healthProfileApi from "../service/healthProfileApi";
import { UsersRound, House } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NewProfileCard = ({ profile, onDelete }) => {
    const { t } = useTranslation();

    const getDiseasesText = () => {
        if (profile.diseases.length === 0) return t("profile.none");
        return profile.diseases.map(disease => disease.name).join(", ");
    }

    const getAllergiesText = () => {
        if (profile.allergies.length === 0) return t("profile.none");
        return profile.allergies.map(allergy => allergy.name).join(", ");
    }

    const handleDelete = async () => {
        try {
            await healthProfileApi.delete(profile.id);
            onDelete(profile.id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='new-profile-card'>
            <div className='new-profile-card-header'>
                <Avatar 
                    src={profile?.avatar} 
                    alt='avatar' 
                    sx={{
                        marginX: 'auto',
                        width: 80,
                        height: 80,
                        border: '3px solid white',
                    }}
                />
                <p className='text-xl font-semibold'>{profile.name}</p>
                <p className='text-sm'>#{t(profile.relationship)}</p>
                <IconButton 
                    component={Link} 
                    to={`/health-profile/${profile.id}`} 
                    sx={{ 
                        position: 'absolute', 
                        right: '0', 
                        top: '0', 
                        color: 'white'
                    }}
                >
                    <ArrowRightAltIcon />
                </IconButton>
            </div>
            <div className='grid grid-cols-2 gap-2' style={{ padding: '10px' }}>
                <ProfileDetail icon={<CakeIcon />} primaryText={calculateAge(profile.date_of_birth)} secondaryText={t("profile.age")} />
                <ProfileDetail icon={<WcIcon />} primaryText={t(`profile.gender.${profile.gender}`)} secondaryText={t("profile.genderLabel")} />
                <ProfileDetail icon={<UsersRound />} primaryText={profile.ethnic_group} secondaryText={t("profile.ethnic_group")} />
                <ProfileDetail icon={<House />} primaryText={profile.home_town_name} secondaryText={t("profile.hometown")} />
                <ProfileInfo label={t("profile.allergies")} info={getAllergiesText()} />
                <ProfileInfo label={t("profile.diseases")} info={getDiseasesText()} />
                <div className='flex text-xs items-center gap-1 col-span-2 font-semibold' style={{ marginTop: '15px' }}>
                    <RecentActorsIcon sx={{ minWidth: 30, color: 'gray' }} />
                    {t("profile.insurance")}
                    <HiddenText text={profile.medical_insurance_number} />
                </div>
                <div className='col-span-2' style={{ marginTop: '10px' }}>
                    <Button 
                        variant='outlined' 
                        color="error" 
                        startIcon={<DeleteIcon />} 
                        sx={{
                            padding: '3px 7px',
                            fontSize: '14px',
                            marginX: 'auto',
                            display: 'flex',
                        }}
                        onClick={handleDelete}  
                    >
                        {t("profile.delete")}
                    </Button>
                </div>
            </div>
        </div>    
    );
};

const ProfileDetail = ({ icon, primaryText, secondaryText }) => (
    <ListItem sx={{ padding: 0, height: 45 }}>
        <ListItemIcon sx={{ minWidth: 30 }}>
            {icon}
        </ListItemIcon>
        <ListItemText
            primary={<Typography variant="body1" fontWeight="bold" fontSize={14}>{primaryText}</Typography>}
            secondary={<Typography variant="body2" color="text.secondary">{secondaryText}</Typography>}
        />
    </ListItem>
);

const ProfileInfo = ({ label, info }) => (
    <div className='flex text-xs items-start gap-1 col-span-2' style={{ padding: "0 5px", marginTop: '10px' }}>
        <p className='font-semibold text-sm' style={{ maxWidth: "80px", minWidth: "80px" }}>{label}</p>
        <p className='italic line-clamp-3'>{info}</p>
    </div>
);

export default NewProfileCard;
