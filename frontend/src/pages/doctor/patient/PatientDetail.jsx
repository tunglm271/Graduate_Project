import { Breadcrumbs, Typography, Divider, Avatar, Button, Box, Tabs, Tab, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import healthProfileApi from "../../../service/healthProfileApi";
const PatientDetail = () => {
    const { id } = useParams();
    const [tab, setTab] = useState(0);
    const [patient, setPatient] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        healthProfileApi.getById(id)
            .then((response) => {
                console.log(response.data);
                setPatient(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching patients:", error);
            });
    }
    , []);

    return (
        <div>
            <div className="flex items-center justify-between" style={{ padding: '1rem 1.5rem'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link className="hover:underline" to="/doctor/patients">
                        Danh sách bệnh nhân
                    </Link>
                    <Typography color="text.primary">Chi tiết bệnh nhân</Typography>
                </Breadcrumbs>
            </div>
            <Divider />
            <div>
                <div className="flex items-center justify-between" style={{ padding: '1rem 1.5rem'}}>
                    <div className="flex gap-2 items-center">
                        <Avatar alt="Remy Sharp" src={patient.avatar} sx={{ width: 56, height: 56 }} />
                        {loading ? (
                            <Skeleton variant="text" width={200} height={30} sx={{ fontSize: '1rem' }} />
                        ) : (
                            <p className="font-bold text-xl">{patient.name}</p>
                        )}
                    </div>
                    <div className="flex gap-2 items-center">
                        <Link className="rounded bg-[#007bff] text-white px-4 py-2">
                            Thêm lịch hẹn
                        </Link>
                        <Button variant="outlined" color="primary" sx={{ paddingX: 0 }}>
                            <MoreVertIcon />
                        </Button>
                    </div>
                </div>
            </div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={(event, value) => setTab(value)} aria-label="basic tabs example">
                    <Tab label="Thông tin bệnh nhân" />
                    <Tab label="Lịch sử khám bệnh"/>
                </Tabs>
            </Box>
            <div className="p-4 mt-2">
                {tab === 0 && (
                    <div>
                        <p className="uppercase text-lg font-semibold border-l-2 border-gray-500 pl-3">Thông tin cơ bản</p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <p className="text-gray-500 text-sm">
                                Họ và tên
                                <p className="text-black text-base">Ngô Đức Khánh</p>
                            </p>
                        </div>
                    </div>
                )}
                {tab === 1 && (
                    <div>
                        <p>Lịch sử khám bệnh</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PatientDetail;
