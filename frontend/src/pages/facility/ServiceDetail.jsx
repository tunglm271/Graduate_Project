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
const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        medicalServiceApi.getById(id)
            .then(response => {
                setService(response.data);
                console.log(response.data);
            })
    }, []);
    return (
        <div style={{ padding: "20px" }}>
            <Stack direction="row" spacing={2} alignItems="center" marginBottom={"1rem"}>
                <IconButton component={Link} to={'/facility/services'} size="small" sx={{ p: 0 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Breadcrumbs sx={{ display: "flex", alignItems: "center", mt: "5px" }}>
                    <Link to={'/facility/services'}>Dịch vụ khám chữa</Link>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>New</Typography>
                </Breadcrumbs>
            </Stack>
            <div className="rounded-lg bg-white p-4 shadow-md flex flex-col">
                <div className="flex justify-between items-center" style={{ margin: "1rem" }}>
                    <div className="flex gap-2 items-center">
                        <img src={service?.thumbnail} alt={service?.name} className="w-52 h-32 object-cover rounded-lg "/>
                        <div className="ml-4">
                            <h2>{service?.name}</h2>
                            <TreatmentCategoryChip category={service?.category}/>
                        </div>
                    </div>
                    <Button startIcon={<EditIcon />} component={Link} to={`/facility/services/${id}/edit`} variant="outlined" color="primary">
                        Chỉnh sửa dịch vụ
                    </Button>
                </div>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white', borderBottomWidth: '1.5px' }}>
                    <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} aria-label="basic tabs example">
                        <Tab label="Thông tin"  />
                        <Tab label="Lịch sử"  />
                    </Tabs>
                </Box>
                <div style={{ padding: "1rem" }}>
                    <Typography 
                        variant="h6" 
                        sx={{ borderLeft: "3px solid #007df4", pl: "1rem", textTransform: "uppercase", fontWeight: 600, fontSize: "18px", marginBottom: "1rem" }}
                    >
                        Thông tin cơ bản
                        <Typography variant="span" sx={{ marginLeft: "0.5rem", color: "gray", fontSize: "14px", fontWeight: 400, textTransform: "none" }}>Last update at {formatDateTime(service?.updated_at)}</Typography>
                    </Typography>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <p className="text-gray-500 text-sm">
                            Tên dịch vụ 
                            <p className="text-black text-base">{service?.name}</p>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Loại dịch vụ
                            <p className="text-black text-base">{service?.category}</p>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Giá
                            <p className="text-black text-base">{service?.price} VND</p>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Thời gian
                            <p className="text-black text-base">{service?.duration} phút</p>
                        </p>
                        <p className="text-gray-500 text-sm">
                            Mô tả
                            <p className="text-black text-base">{service?.description}</p>
                        </p>
                    </div>
                    <Divider />
                    <Typography 
                        variant="h6" 
                        sx={{ borderLeft: "3px solid #007df4", pl: "1rem", textTransform: "uppercase", fontWeight: 600, fontSize: "18px", marginBottom: "1rem", marginTop: "1rem" }}
                    >
                        Bác sĩ phụ trách
                    </Typography>
                    <div  className="flex fex-col gap-2 items-center">
                        <ListItem sx={{ width: "40%" }}>
                            <ListItemAvatar>
                                <Avatar src="https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600w-2481032615.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary={"B.S Nguyễn Đức Khoa"} secondary={"Bác sĩ răng hàm mặt"} />
                        </ListItem>
                        <div className="font-base text-sm">
                            <p>033 - 124 - 4157</p>
                            <p className="text-blue-500 underline">doctor2@example.com</p>
                        </div>
                    </div>
                    <div  className="flex fex-col gap-2 items-center">
                        <ListItem sx={{ width: "40%" }}>
                            <ListItemAvatar>
                                <Avatar src="https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600w-2481032615.jpg" />
                            </ListItemAvatar>
                            <ListItemText primary={"B.S Nguyễn Đức Khoa"} secondary={"Bác sĩ răng hàm mặt"} />
                        </ListItem>
                        <div className="font-base text-sm">
                            <p>033 - 124 - 4157</p>
                            <p className="text-blue-500 underline">doctor2@example.com</p>
                        </div>
                    </div>
                </div>
                <Divider />
            </div>
        </div>
    );
}

export default ServiceDetail;
