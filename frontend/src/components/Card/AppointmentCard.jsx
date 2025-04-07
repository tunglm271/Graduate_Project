import { Button, Divider, Stack, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HouseIcon from '@mui/icons-material/House';
import serviceImg from '@images/service.png';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
const AppointmentCard = ({ appointment }) => {

    const step = ["Đã đặt lịch", "Chờ chỉnh định bác sĩ", "Chờ thanh toán" ,"Chờ thực hiện" ,"Đã hoàn thành"];

    const calCurrentStep = () => {
        if(appointment.status === "pending") return 1;
        if(appointment.status === "assigned") return 2;
        if(appointment.status === "paid") return 3;
        return 4;
    }
    const currentStep = calCurrentStep()


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
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{appointment.medical_service.name}</Typography>
                        <Typography variant="body1">Ngày khám: { new Date(appointment.date).toLocaleDateString("vi")}</Typography>
                        <Typography 
                            variant="subtitle1" 
                            sx={{ color: "gray", display: "flex", alignItems: "center", gap: "3px", fontSize: "14px" }}
                        > 
                            Giờ khám: {appointment.start_time} - {appointment.end_time}
                            <AccessTimeIcon fontSize="14px"/>
                        </Typography>
                    </div>
                </div>
                <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px'}}>
                    <BookmarksIcon fontSize='small' color='primary' />
                    <span>Thông tin bác sĩ chỉ định</span>
                </h4>
                { appointment.doctor ?
                <div className="appointment-doctor-info">
                        <Typography variant="body2"> Họ tên: BS. {appointment.doctor.name}</Typography>
                        <Typography variant="body2">Chuyên khoa: Nội tiết</Typography>
                        <Typography variant="body2">Kinh nghiệm: 5 năm</Typography>
                        <Typography variant="body2">SĐT:  034124578</Typography>
                </div>
                :
                <div className="flex justify-center items-center text-center h-10 italic">
                    Chưa có bác sĩ được chỉ định
                </div>
                }
            </div>

            <Divider />
            <Stepper activeStep={currentStep} sx={{ padding: '15px 10px' }}>
                {step.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Button 
                variant="contained" 
                sx={{boxShadow: 0, display: "block", ml: "auto", mr: 2, width: 'fit-content'}} 
                disabled={currentStep != 2}
                component={Link} 
                to={`/appointments/${appointment.id}/bill`} 
            >
                {currentStep <= 2 ? "Thanh toán" : "Đã thanh toán"}
            </Button>
        </div>
    );
}

export default AppointmentCard;
