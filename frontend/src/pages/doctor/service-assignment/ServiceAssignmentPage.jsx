import "./service-assignment.css"
import { useState } from "react";
import { Box, Step, StepLabel, Stepper, Button, Typography, Autocomplete, TextField, Stack, ToggleButtonGroup, ToggleButton, Checkbox, Slide } from "@mui/material";
import ScheduleButton from "../../../components/ScheduleButton";
const steps = ["Thông tin", "Chỉ định", "Đặt lịch"];
const patient = [
    { label: "John Doe" },
    { label: "Jane Smith" },
    { label: "Alice Johnson" },
    { label: "Robert Brown" },
    { label: "Michael Davis" },
    { label: "Emily Wilson" },
    { label: "Daniel Martinez" },
    { label: "Sophia Anderson" },
    { label: "David Thomas" },
    { label: "Olivia Taylor" }
];

const ServiceAssignmentPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [prevStep, setPrevStep] = useState(-1);
    const [profile, setProfile] = useState(null);
    const [serviceType, setServiceType] = useState("home");

    const handleNext = () => {
        setPrevStep(activeStep);
        setActiveStep((prev) => prev + 1);
    };
    
    const handleBack = () => {
        setPrevStep(activeStep);
        setActiveStep((prev) => prev - 1);
    };

    const handleSubmit = () => {
        alert("Đặt lịch thành công");
    }

    return (
        <div className="service-assignment">
            <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: 4 }}>
                {steps.map((label, index) => (
                <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            {
                activeStep === 0 && (
                    <Slide direction={activeStep > prevStep ? "left" : "right"} in={activeStep === 0} mountOnEnter unmountOnExit  timeout={400}>
                        <div className="patient-info">
                            <Autocomplete
                                disablePortal
                                options={patient}
                                sx={{ width: 800, mx: "auto" }}
                                value={profile}
                                onChange={(event, newValue) => {
                                    setProfile(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} 
                                label="Chọn hồ sơ" 
                            />}
                            />
                            {
                                profile && (
                                    <Box sx={{ width: 800, mx: "auto", mt: 2 }}>
                                        <p className="font-semibold text-gray-500" style={{
                                            marginBottom: "0.5rem"
                                        }}>Thông tin bệnh nhân</p>
                                        <TextField
                                            label="Họ tên"
                                            value={profile.label}
                                            fullWidth
                                            disabled
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            label="Tuổi"
                                            value="25"
                                            fullWidth
                                            disabled
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            label="Giới tính"
                                            value="Nam"
                                            fullWidth
                                            disabled
                                            sx={{ mb: 2 }}
                                        />
                                        <TextField
                                            label="Số điện thoại"
                                            value="091234129"
                                            fullWidth
                                            disabled
                                            sx={{ mb: 2 }}
                                        />
                                    </Box>
                                )
                            }
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                sx={{ mt: "auto", width: 200, mx: "auto", display: "block", backgroundColor: "#007bff", padding: "10px 24px", fontSize: "1rem", lineHeight: 1.5, borderRadius: "0.25rem" }}
                                disabled={!profile}
                            >
                                Tiếp theo
                            </Button>
                        </div>
                    </Slide>
                )
            }
            {
                activeStep === 1 && (
                    <Slide direction={activeStep > prevStep ? "left" : "right"} in={activeStep === 1} mountOnEnter unmountOnExit timeout={400}>
                        <div className="service-assignment-step">
                            <p>Chỉ định dịch vụ</p>
                            <ToggleButtonGroup
                                value={serviceType}
                                exclusive
                                onChange={(event, newValue) => {
                                    setServiceType(newValue);
                                }}
                                sx={{ mb: 2, mx: "auto" }}
                            >
                                <ToggleButton value="home">Tại nhà</ToggleButton>
                                <ToggleButton value="hospital">Tại viện</ToggleButton>
                            </ToggleButtonGroup>
                            <TextField
                                label="Lí do khám"
                                multiline
                                required
                                rows={4}
                                fullWidth
                                sx={{ mb: 2, mx: "auto" }}
                            />
                            <div className="service-assignment__list">
                                <div className="service-assignment__item">
                                    <div>
                                        <p className="font-semibold text-gray-500">Interleukine-6</p>
                                        <p className="text-sm"> nhiễm trùng và chấn thương mô, góp phần bảo vệ cơ thể thông qua việc kích thích phản ứng giai đoạn cấp tính, tạo máu</p>
                                    </div>
                                    <Checkbox />
                                </div>
                                <div className="service-assignment__item">
                                    <div>
                                        <p className="font-semibold text-gray-500">Interleukine-6</p>
                                        <p className="text-sm"> nhiễm trùng và chấn thương mô, góp phần bảo vệ cơ thể thông qua việc kích thích phản ứng giai đoạn cấp tính, tạo máu</p>
                                    </div>
                                    <Checkbox />
                                </div>
                                <div className="service-assignment__item">
                                    <div>
                                        <p className="font-semibold text-gray-500">Interleukine-6</p>
                                        <p className="text-sm"> nhiễm trùng và chấn thương mô, góp phần bảo vệ cơ thể thông qua việc kích thích phản ứng giai đoạn cấp tính, tạo máu</p>
                                    </div>
                                    <Checkbox />
                                </div>
                            </div>
                            <Stack direction="row" spacing={2} sx={{ mt: 2, mx: "auto" }}>
                                <Button
                                    variant="outlined"
                                    color="info"
                                    onClick={handleBack}
                                    sx={{ mt: "auto", width: 200, mx: "auto", display: "block" , padding: "10px 24px", fontSize: "1rem", lineHeight: 1.5, borderRadius: "0.25rem" }}
                                >
                                    Quay lại
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    sx={{ mt: "auto", width: 200, mx: "auto", display: "block", backgroundColor: "#007bff", padding: "10px 24px", fontSize: "1rem", lineHeight: 1.5, borderRadius: "0.25rem" }}
                                >
                                    Tiếp theo
                                </Button>
                            </Stack>
                        </div>
                    </Slide>
                )
            }
            {
                activeStep === 2 && (
                    <Slide direction={activeStep > prevStep ? "left" : "right"} in={activeStep === 2} mountOnEnter unmountOnExit timeout={400}>
                        <div className="booking-step">
                            <p className="text-xl font-semibold">Thông tin đặt lịch</p>
                            <div>
                                <p className="font-semibold text-gray-500">Ngày khám<span className="text-red-500">*</span></p>
                                <input type="date" name="" id="booking-date-input" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-500">Giờ khám<span className="text-red-500">*</span></p>
                                <div className="schedule-list">
                                    <ScheduleButton startTime="08:00" endTime="09:00" />
                                    <ScheduleButton startTime="09:00" endTime="10:00" />
                                    <ScheduleButton startTime="10:00" endTime="11:00" />
                                </div>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-500">Ghi chú đặt khám</p>
                                <TextField
                                    label="Ghi chú"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    sx={{ mb: 2, mx: "auto" }}
                                />
                            </div>
                            <Stack direction="row" spacing={2} sx={{ mt: 2, mx: "auto" }}>
                                <Button
                                    variant="outlined"
                                    color="info"
                                    onClick={handleBack}
                                    sx={{ mt: "auto", width: 200, mx: "auto", display: "block" , padding: "10px 24px", fontSize: "1rem", lineHeight: 1.5, borderRadius: "0.25rem" }}
                                >
                                    Quay lại
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSubmit}
                                    sx={{ mt: "auto", width: 200, mx: "auto", display: "block", backgroundColor: "#007bff", padding: "10px 24px", fontSize: "1rem", lineHeight: 1.5, borderRadius: "0.25rem" }}
                                >
                                    Đặt lịch
                                </Button>
                            </Stack>
                        </div>
                    </Slide>
                )
            }
        </div>
    );
}

export default ServiceAssignmentPage;
