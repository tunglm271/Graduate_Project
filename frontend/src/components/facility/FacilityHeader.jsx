import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton, Stack, Divider, Badge, Avatar, ListItemButton, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
const FacilityHeader = () => {
    return (
        <div className="facility-header">
            <h2>Trang chủ</h2>
            <div className='facility-header-search bg-slate-200'>
                <SearchIcon />
                <input type="text" placeholder="Tìm kiếm" />
            </div>
            <IconButton sx={{ backgroundColor: "#155dfc", color: "white" }}>
                <AddIcon />
            </IconButton>
            <Stack direction="row" spacing={1}>
                <IconButton>
                    <InfoIcon />
                </IconButton>
                <IconButton>
                    <SettingsApplicationsIcon />
                </IconButton>
            </Stack>
            <Divider orientation='vertical' flexItem />
            <IconButton>
                <Badge 
                    badgeContent={4} 
                    color="primary" 
                    sx={{
                        '& .MuiBadge-badge': {
                            transform: 'scale(1) translate(50%, -50%)', 
                            margin: '3px',
                            },
                    }}
                    
                >
                    <CircleNotificationsIcon sx={{
                        fontSize: "30px",
                        opacity: 1,
                        color: "rgba(0, 0, 0, 1)"
                    }}/>
                </Badge>
            </IconButton>
            <Divider orientation='vertical' flexItem />
            <ListItemButton sx={{ flexGrow: 0 }}>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                
                <ListItemText
                    primary={
                        <Typography variant="body1" fontWeight="bold">
                            Admin PK
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" color="text.secondary" fontSize={"10px"}>
                            Clinic Admin
                        </Typography>
                    }
                />
            </ListItemButton>
            {/* <IconButton 
                sx={{
                    position: "absolute", 
                    top: "10", 
                    left: "0", 
                    backgroundColor: "#f5f5f5", 
                    borderRadius: "50%", 
                    transform: "translate(50%,0)",
                    border: "1.5px solid #d1d1d1",
                    zindex: 1000,
                    p: 0
                }} 
                onClick={()=>setOpen(!open)}>
               {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton> */}
        </div>
    );
}

export default FacilityHeader;
