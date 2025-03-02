import { Button, Divider, Stack, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HouseIcon from '@mui/icons-material/House';
import serviceImg from '@images/service.png';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
const AppointmentCard = () => {

    const step = ["Đã đặt lịch", "Chờ chỉnh định bác sĩ", "Chờ thực hiện" ,"Đã hoàn thành"];


    return (
        <div className="appointment-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>Mã đơn khám: APPOINTMENT001</h4>
                <Stack direction="row" spacing={2}>
                    <Button>Xem chi tiết</Button>
                    <Button>Liên hệ phòng khám</Button>
                </Stack>
            </div>
            <Divider />

            <div className="appointment-card-content">
                <Link to="/facility/1" className="facility-link">
                    <HouseIcon /> Phòng khám Đa khoa Quốc tế Hồng Hà
                </Link>
                <div className="booked-service">
                    <img src={serviceImg} alt="" />
                    <div style={{ marginLeft: '10px' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Khám tổng quát</Typography>
                        <Typography variant="body1">Ngày khám: 30/10/2021</Typography>
                        <Typography 
                            variant="subtitle1" 
                            sx={{ color: "gray", display: "flex", alignItems: "center", gap: "3px", fontSize: "14px" }}
                        > 
                            Giờ khám: 10:30 - 11: 30 
                            <AccessTimeIcon fontSize="14px"/>
                        </Typography>
                    </div>
                </div>
                <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px'}}>
                    <BookmarksIcon fontSize='small' color='primary' />
                    <span>Thông tin bác sĩ chỉ định</span>
                </h4>
                <div className="appointment-doctor-info">
                        <Typography variant="body2"> Họ tên: BS. Nguyễn Văn A</Typography>
                        <Typography variant="body2">Chuyên khoa: Nội tiết</Typography>
                        <Typography variant="body2">Kinh nghiệm: 5 năm</Typography>
                        <Typography variant="body2">SĐT:  034124578</Typography>
                </div>
            </div>

            <Divider />
            <Stepper activeStep={1} sx={{ padding: '15px 10px' }}>
                {step.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            
        </div>
    );
}

export default AppointmentCard;
