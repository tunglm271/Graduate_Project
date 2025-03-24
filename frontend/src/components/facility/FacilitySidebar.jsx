import ColorLogo from "../../assets/color-logo.png";
import { Link } from "react-router-dom";
import FacilityNavLink from "./FacilityNavLink";
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import GroupIcon from '@mui/icons-material/Group';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PaidIcon from '@mui/icons-material/Paid';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ChatIcon from '@mui/icons-material/Chat';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import InpatientIcon from '@icon/service-category/InpatientIcon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Divider, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from "@mui/material";
import { useState } from "react";

const FacilitySidebar = () => {
    const [open, setOpen] = useState(true);

    return (
        <div className="facility-sidebar">
            <Link className="flex gap-1 items-center" to="/facility/dashboard">
                <img src={ColorLogo} alt="" className="object-cover w-12 h-12" />
                <span className="font-semibold text-xl">Docify Clinic</span>
            </Link>

            <ListItem component={Link} to={"/facility/profile"} sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "10px",
                margin: "10px 0",
                padding: "10px",
                border: "0.5px solid #d1d1d1",
                paddingY: "3px",
            }}>
                <ListItemIcon sx={{ minWidth: "36px" }}>
                    <InpatientIcon size={25} fill="#364153"/>
                </ListItemIcon>

                <ListItemText
                    primary={
                        <Typography variant="body1" fontWeight="bold" fontSize={"12px"}>
                            Phòng khám Nhật Phương
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" color="text.secondary" fontSize={"10px"}>
                            33 P. Trần Hưng Đạo
                        </Typography>
                    }
                />
            </ListItem>

            <div>
                <FacilityNavLink icon={<SpaceDashboardIcon />} text={"Trang chủ"} to={"/facility/dashboard"}/>
                <p className="text-gray-500 text-sm" style={{ margin: "10px 0" }}>Quản lý phòng khám</p>
                <ul>
                    <li><FacilityNavLink icon={<EventIcon />} text={"Lịch hẹn"} to={"/facility/reservations"}/></li>
                    <li><FacilityNavLink icon={<AccountCircleIcon />} text={"Bệnh nhân"} to={"/facility/patients"}/></li>
                    <li><FacilityNavLink icon={<MedicationLiquidIcon />} text={"Dịch vụ khám chữa"} to={"/facility/services"}/></li>
                    <li><FacilityNavLink icon={<GroupIcon />} text={"Danh sách nhân viên"} to={"/facility/staffs"}/></li>
                </ul>
                <span className="text-gray-500 text-sm" style={{ margin: "10px 0" }}>Tài chính</span>
                <ul>
                    <li><FacilityNavLink icon={<EqualizerIcon />} text={"Tài khoản"} to={"/facility/statistics"}/></li>
                    <li><FacilityNavLink icon={<PaidIcon />} text={"Doanh thu"} to={"/facility/payments"}/></li>
                    <li><FacilityNavLink icon={<ShoppingBasketIcon />} text={"Phương thức thanh toán"} to={"/facility/products"}/></li>
                </ul>
                <Divider />
                <ul>
                    <li><FacilityNavLink icon={<ChatIcon />} text={"Trao đổi với bệnh nhân"} to={"/facility/support"}/></li>
                    <li><FacilityNavLink icon={<HeadsetMicIcon />} text={"Phản hồi"} to={"/facility/contact"}/></li>
                </ul>
            </div>
            {/* <IconButton 
                sx={{
                    position: "absolute", 
                    top: "10", 
                    right: "0", 
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

export default FacilitySidebar;
