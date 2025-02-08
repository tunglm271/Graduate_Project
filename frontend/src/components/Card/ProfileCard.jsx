import { Avatar, Box, ListItemIcon, ListItemText , ListItem, Typography, Button } from '@mui/material';
import { calculateAge } from '../../utlis/caculateFun';
import AvatarFrame from '@images/avatar-frame.png';
import RelationshipIcon from '@icon/RelationshipIcon';
import ScaleIcon from '@mui/icons-material/Scale';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import WcIcon from '@mui/icons-material/Wc';
import HiddenText from '../HiddenText';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
const ProfileCard = ({ profile }) => {

    return (
        <div className="health-profile-card">
            <div className='profile-header'>
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
                        src={'https://mui.com/static/images/avatar/2.jpg'}
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </Box>
                <h2>{profile.name}</h2>
                <p>{profile.relationship}</p>
            </div>
            <div className="profile-information">
                <div className="profile-info">
                    <ListItem sx={{paddingY: 0, height: 45}}>
                        <ListItemIcon>
                            <RelationshipIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1" fontWeight="bold">
                                {calculateAge(profile.date_of_birth)} 
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="text.secondary">
                                tuổi
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem sx={{paddingY: 0, height: 45}}>
                        <ListItemIcon>
                            <WcIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1" fontWeight="bold">
                                {profile.gender}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="text.secondary">
                                Giới tính
                                </Typography>
                            }
                        />
                    </ListItem>

                    <ListItem sx={{paddingY: 0, height: 45}}>
                        <ListItemIcon>
                            <AccessibilityIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1" fontWeight="bold">
                                {profile.height} cm
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="text.secondary">
                                Chiều cao
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem sx={{paddingY: 0, height: 45}}>
                        <ListItemIcon>
                            <ScaleIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography variant="body1" fontWeight="bold">
                                {profile.weight} kg
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="text.secondary">
                                Cân nặng
                                </Typography>
                            }
                        />
                    </ListItem>
                </div>
                <div className="allergries-information">
                    <h4>Dị ứng</h4>
                    <p>
                        Dị ứng phấn hóa, dị ứng xà phòng, dị ứng thức ăn, dị ứng thuốc
                    </p>
                </div>
                <div className='chronic-diseases-information'>
                    <h4>Bệnh mãn tính</h4>
                    <p>
                        Đái tháo đường, huyết áp cao, viêm gan B, viêm gan C
                    </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", padding: "0 20px" }}>
                    <h4 style={{ width: '150px' }}>Mã bảo hiểm y tế</h4>
                   <HiddenText />
                </div>
                <Link to={`/health-profile/${profile.id}`}>
                    <Button sx={{
                        textTransform: 'none',
                        margin: '5px 20px',
                        fontWeight: 'bold',
                    }}
                    endIcon={<ArrowRightAltIcon />}
                    >Xem chi tiết</Button>
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard;
