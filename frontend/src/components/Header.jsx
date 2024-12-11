import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from "../assets/Menu"
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const Header = () => {
    const { collapse, setCollapse } = useContext(UserContext);
    return (
        <div id="header">
            <button id="sidebar-btn" onClick={() => setCollapse(!collapse)}>
                <Menu size="30px"/>
            </button>

            <div id="search-bar">
                <input type="text" />
                <SearchIcon sx={{
                    position: "absolute",
                    right: "3%",
                    top: "50%",
                    transform: "translateY(-50%)",
                }}/>
            </div>
            

            <Stack direction="row" spacing={4}>
                


                <Button variant="contained" startIcon={<AddIcon />} sx={{
                    borderRadius: "15px",
                }}>
                    Đặt lịch
                </Button>

                <Badge badgeContent={4} color="primary" sx={{
                    marginTop: "2px",
                }}>
                    <NotificationsNoneIcon color="action" sx={{
                        fontSize: "35px",
                    }}/>
                </Badge>
                <Stack direction="row" spacing={1} sx={{
                    alignItems: "center",
                }}>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    <p>Remy Sharp</p>
                    <ArrowDropDownIcon />
                </Stack>
            </Stack>
        </div>
    );
}

export default Header;
