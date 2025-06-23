import React from 'react';
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ColorLogo from "../../assets/color-logo.png";
import InpatientIcon from '@icon/service-category/InpatientIcon';

const AgentSidebar = ({children, title = "Docify Clinic"}) => {
    return (
        <div className="facility-sidebar">
            <Link className="flex gap-1 items-center" to="/facility/dashboard">
                <img src={ColorLogo} alt="" className="object-cover w-12 h-12" />
                <span className="font-semibold text-xl">{title}</span>
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
            
                    {children}
        </div>
    );
}

export default AgentSidebar;
