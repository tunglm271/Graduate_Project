import { useRef, useState, useContext, useEffect } from "react";
import { Button, IconButton, Typography, Menu, MenuItem, Stack, Badge, Divider, MenuList, ListItemIcon, ListItemText } from "@mui/material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from "@icon/MenuIcon"
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LanguageSelect from "./LanguageSelect";
import AvatarWithStatus from "./AvatarWithStatus";
import { PatientLayoutContext } from "../context/PateintLayoutProvider";
import ConversationList from "./ConversationList";
import { getUser } from "../utlis/auth";
import { logoutRequest } from "../service/authApi";
import { useNavigate } from "react-router-dom";
import useCustomSnackbar from "../hooks/useCustomSnackbar";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person'

const PatientHeader = () => {
    const { showSuccessSnackbar } = useCustomSnackbar();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const header = useRef(null);
    const { sidebarCollapse, setSidebarCollapse, user } = useContext(PatientLayoutContext);

    const userMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        logoutRequest()
            .then((res) => {
                console.log(res);
                navigate("/auth/login");
                showSuccessSnackbar("Đăng xuất thành công");
            })
    }

    useEffect(() => {
        const handleScroll = () => {
            if (header.current) {
                if (window.scrollY > 0) {
                    header.current.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
                    header.current.style.boxShadow = "0px 2px 2px rgba(0, 0, 0, 0.1)";
                } else {
                    header.current.style.backgroundColor = "transparent";
                    header.current.style.boxShadow = "none";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <div id="header" ref={header}>
            <button id="sidebar-btn" onClick={() => setSidebarCollapse(!sidebarCollapse)}>
                <MenuIcon size="30px"/>
            </button>

            <Button sx={{
                display: {
                    xs: "block",
                    sm: "none",
                    md: "none",
                    lg: "none",
                },
            }}>
                <SearchIcon sx={{
                    position: "absolute",
                    right: "3%",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}/>
            </Button>
            

            <Stack direction="row" spacing={3} sx={{
                alignItems: "center",
            }}>
                <Button variant="contained" startIcon={<AddIcon />} sx={{
                    borderRadius: "7px",
                    display: {
                        xs: "none",
                        sm: "none",
                        md: "none",
                        lg: "flex",
                    }
                }}>
                    Đặt lịch
                </Button>

                <LanguageSelect color="black"/>

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
                        <NotificationsNoneIcon color="black" sx={{
                            fontSize: "30px",
                            opacity: 1,
                            color: "rgba(0, 0, 0, 1)"
                        }}/>
                    </Badge>
                </IconButton>

                <ConversationList />
                
                <Button 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '3px',
                        textTransform: 'none',
                        color: 'black',
                    }}
                    id="user-menu-btn"
                    onClick={userMenuClick}
                >
                    <AvatarWithStatus avatar={user.avatar} />
                    <Typography display={{
                        xs: "none",
                        sm: "none",
                        md: "none",
                        lg: "block",
                    }}>{user.name}</Typography>
                    <ArrowDropDownIcon
                        sx={{
                            transition: 'transform 0.3s ease-in-out',
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                            display: {
                                xs: "none",
                                sm: "block",
                                md: "block",
                                lg: "block",
                            }
                        }}
                    />
                </Button>

                <Menu
                    id="user-menu-btn"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    slotProps={
                        { paper: { sx: { width: 250, marginTop: 2 } } }
                    }
                >
                    <Stack direction="row" spacing={2} sx={{ padding: "10px", alignItems: "center" }}>
                        <AvatarWithStatus avatar={user.avatar} />
                        <Stack>
                            <Typography fontWeight="bold">{user.name}</Typography>
                            <Typography color="gray" variant="caption">Tài khoản bệnh nhân</Typography>
                        </Stack>
                    </Stack>

                    <Divider />

                    <MenuList>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleClose();
                            navigate("/settings");
                        }}>
                            <ListItemIcon>
                                <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Settings</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
        </div>
    );
}

export default PatientHeader;
