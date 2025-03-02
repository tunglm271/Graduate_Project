import { Breadcrumbs, Typography, Stack, IconButton, Divider, Button, Box, Tabs, Tab } from "@mui/material";
import {ListItem, ListItemAvatar, Avatar, ListItemText} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import medicalServiceApi from "../../service/medicalServiceAPi";
import TreatmentCategoryChip from "../../components/chip/TreatmentCategoryChip";
import EditIcon from '@mui/icons-material/Edit';
import { formatDateTime } from "../../utlis/DateFun";
import ScheduleSelectRow from "../../components/ScheduleSelectRow";
import "./staff.css"

const StaffDetail = () => {
    const [tab, setTab] = useState(0);

    return (
        <div style={{ padding: "20px" }}>
            <Stack direction="row" spacing={2} alignItems="center" marginBottom={"1rem"}>
                <IconButton component={Link} to={'/facility/services'} size="small" sx={{ p: 0 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
                    <Link to={'/facility/services'}>Quản lý bác sĩ</Link>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>B.S Ngô Đức Khánh</Typography>
                </Breadcrumbs>
            </Stack>
            <div className="rounded-lg bg-white p-4 shadow-md flex flex-col">
                <div className="flex justify-between items-center" style={{ margin: "1rem" }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src="https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600w-2481032615.jpg" sx={{
                            width: 100,
                            height: 100,
                            marginRight: "1rem"
                        }}/>
                    </ListItemAvatar>
                    <ListItemText 
                        primary={<Typography variant="h6" sx={{fontWeight: "bold"}}>
                            B.S Ngô Đức Khánh
                        </Typography>} 
                    secondary={<Typography variant="body2" sx={{fontStyle: "italic"}}>
                            Bác sĩ chuyên khoa nhi khoa
                        </Typography>} 
                    />
                </ListItem>
                </div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white', borderBottomWidth: '1.5px' }}>
                    <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} aria-label="basic tabs example">
                        <Tab label="Thông tin"  />
                        <Tab label="Lịch sử khám"  />
                        <Tab label="Danh sách bệnh nhân"  />
                    </Tabs>
                </Box>
                <div style={{ padding: "1rem" }}>
                    <Typography 
                        variant="h6" 
                        sx={{ borderLeft: "3px solid #007df4", pl: "1rem", textTransform: "uppercase", fontWeight: 600, fontSize: "18px", marginBottom: "1rem" }}
                    >
                        Thông tin cơ bản
                        <Typography variant="span" sx={{ marginLeft: "0.5rem", color: "gray", fontSize: "14px", fontWeight: 400, textTransform: "none" }}>Last update at {formatDateTime("2025-12-12")}</Typography>
                    </Typography>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <p className="text-gray-500 text-sm">
                            Họ và tên
                            <p className="text-black text-base">Ngô Đức Khánh</p>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Chức vụ
                            <p className="text-black text-base">Bác sĩ chuyên khoa nhi khoa</p>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Email
                            <p className="text-black text-base">doctor2@example.com</p>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Số điện thoại
                            <p className="text-black text-base">012 - 012 5362</p>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Ngày sinh
                            <p className="text-black text-base">{formatDateTime("2025-12-12","vi")}</p>
                        </p>

                        <p className="text-gray-500 text-sm col-span-2">
                            Mô tả
                            <p className="text-black text-base">
                                Bác sĩ chuyên khoa nhi khoa, có kinh nghiệm 5 năm làm việc tại bệnh viện nhi đồng 1
                            </p>
                        </p>
                        
                    </div>
                    <Divider />
                    <Typography 
                        variant="h6" 
                        sx={{ borderLeft: "3px solid #007df4", pl: "1rem", textTransform: "uppercase", fontWeight: 600, fontSize: "18px", marginBottom: "1rem", marginTop: "1rem" }}
                    >
                        Lịch làm việc
                    </Typography>
                    <div className="flex flex-col gap-3" style={{ paddingRight: "2rem" }}>
                        <ScheduleSelectRow day={"Monday"}/>
                        <ScheduleSelectRow day={"Tuesday"} work={true}/>
                        <ScheduleSelectRow day={"Wenesday"}/>
                        <ScheduleSelectRow day={"Thursday"} work={true}/>
                        <ScheduleSelectRow day={"Friday"} work={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaffDetail;
