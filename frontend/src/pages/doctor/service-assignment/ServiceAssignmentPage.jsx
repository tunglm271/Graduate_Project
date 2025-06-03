import "./service-assignment.css";
import { useState, useEffect } from "react";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Button,
  Autocomplete,
  TextField,
  Stack,
  Radio,
  RadioGroup,
  Slide,
  CircularProgress,
} from "@mui/material";
import patientApi from "../../../service/patientApi";
import medicalServiceApi from "../../../service/medicalServiceAPi";
import appointmentApi from "../../../service/appointmentApi";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import { useNavigate } from "react-router-dom";

const steps = ["Thông tin", "Chỉ định", "Đặt lịch"];

const ServiceAssignmentPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [prevStep, setPrevStep] = useState(-1);
  const [profile, setProfile] = useState(null);
  const [patients, setPatients] = useState([]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [medicalServices, setMedicalServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    patientApi
      .getByDoctor()
      .then((response) => {
        console.log("Patients data:", response.data);
        // Transform the data to match the Autocomplete format
        const formattedPatients = response.data.map((patient) => ({
          id: patient.id,
          label: patient.name,
          ...patient, // Keep all other patient data
        }));
        setPatients(formattedPatients);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
        setLoading(false);
      });
    medicalServiceApi.getByDoctor().then((response) => {
      console.log("Medical services data:", response.data);
      setMedicalServices(response.data);
    });
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    medicalServiceApi
      .getDoctorSlots(selectedDate)
      .then((response) => {
        console.log("Doctor slots data:", response.data);
        setLoadingSlots(false);
        setSlots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor slots:", error);
      });
  }, [selectedDate]);

  const handleNext = () => {
    setPrevStep(activeStep);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setPrevStep(activeStep);
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (!profile || !selectedService || !selectedDate || !selectedSlot) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setSubmitLoading(true);
    const formData = new FormData();
    formData.append("health_profile_id", profile.id);
    formData.append("medical_service_id", selectedService.id);
    formData.append("date", selectedDate);
    formData.append("start_time", selectedSlot.start_time);
    formData.append("end_time", selectedSlot.end_time);
    formData.append("reason", reason);

    appointmentApi
      .createByDoctor(formData)
      .then((response) => {
        console.log("Appointment created:", response.data);
        showSuccessSnackbar("Đặt lịch thành công");
        navigate("/doctor/reservations");
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
        showErrorSnackbar("Đặt lịch thất bại");
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  return (
    <div className="service-assignment">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ marginBottom: 4 }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <Slide
          direction={activeStep > prevStep ? "left" : "right"}
          in={activeStep === 0}
          mountOnEnter
          unmountOnExit
          timeout={400}
        >
          <div className="patient-info">
            <Autocomplete
              disablePortal
              options={patients}
              loading={loading}
              sx={{ width: 800, mx: "auto" }}
              value={profile}
              onChange={(event, newValue) => {
                setProfile(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chọn hồ sơ"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            {profile && (
              <Box sx={{ width: 800, mx: "auto", mt: 2 }}>
                <p
                  className="font-semibold text-gray-500"
                  style={{
                    marginBottom: "0.5rem",
                  }}
                >
                  Thông tin bệnh nhân
                </p>
                <TextField
                  label="Họ tên"
                  value={profile.label}
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Tuổi"
                  value={
                    profile.date_of_birth
                      ? new Date().getFullYear() -
                        new Date(profile.date_of_birth).getFullYear() +
                        1
                      : ""
                  }
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Giới tính"
                  value={
                    profile.gender === "male"
                      ? "Nam"
                      : profile.gender === "female"
                      ? "Nữ"
                      : "Khác"
                  }
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Số điện thoại"
                  value={profile.phone || ""}
                  fullWidth
                  disabled
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{
                mt: "auto",
                width: 200,
                mx: "auto",
                display: "block",
                backgroundColor: "#007bff",
                padding: "10px 24px",
                fontSize: "1rem",
                lineHeight: 1.5,
                borderRadius: "0.25rem",
              }}
              disabled={!profile}
            >
              Tiếp theo
            </Button>
          </div>
        </Slide>
      )}
      {activeStep === 1 && (
        <Slide
          direction={activeStep > prevStep ? "left" : "right"}
          in={activeStep === 1}
          mountOnEnter
          unmountOnExit
          timeout={400}
        >
          <div className="service-assignment-step">
            <p className="mb-3">Chỉ định dịch vụ</p>
            <div className="service-assignment__list">
              <RadioGroup
                value={selectedService?.id || ""}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value);
                  const selected = medicalServices.find(
                    (service) => service.id === selectedId
                  );
                  setSelectedService(selected);
                }}
              >
                {medicalServices.map((service) => (
                  <div className="service-assignment__item" key={service.id}>
                    <div>
                      <p className="font-semibold text-gray-500">
                        {service.name}
                      </p>
                      <p className="text-sm">{service.description}</p>
                    </div>
                    <Radio value={service.id.toString()} />
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Stack direction="row" spacing={2} sx={{ mt: 2, mx: "auto" }}>
              <Button
                variant="outlined"
                color="info"
                onClick={handleBack}
                sx={{
                  mt: "auto",
                  width: 200,
                  mx: "auto",
                  display: "block",
                  padding: "10px 24px",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  borderRadius: "0.25rem",
                }}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{
                  mt: "auto",
                  width: 200,
                  mx: "auto",
                  display: "block",
                  backgroundColor: "#007bff",
                  padding: "10px 24px",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  borderRadius: "0.25rem",
                }}
              >
                Tiếp theo
              </Button>
            </Stack>
          </div>
        </Slide>
      )}
      {activeStep === 2 && (
        <Slide
          direction={activeStep > prevStep ? "left" : "right"}
          in={activeStep === 2}
          mountOnEnter
          unmountOnExit
          timeout={400}
        >
          <div className="booking-step">
            <p className="text-xl font-semibold">Thông tin đặt lịch</p>
            <div>
              <p className="font-semibold text-gray-500">
                Ngày khám<span className="text-red-500">*</span>
              </p>
              <input
                type="date"
                name=""
                id="booking-date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div>
              <p className="font-semibold text-gray-500">
                Giờ khám<span className="text-red-500">*</span>
              </p>
              <div className="schedule-list">
                {loadingSlots ? (
                  <div className="loading-slots">
                    <CircularProgress color="inherit" size={20} />
                    <p className="text-gray-500">Đang tải lịch khám...</p>
                  </div>
                ) : slots.length === 0 ? (
                  <p className="text-gray-500">Không có lịch khám</p>
                ) : (
                  slots.map((slot, index) => (
                    <button
                      key={index}
                      className={`schedule-button ${
                        selectedSlot == slot && "selected-schedule"
                      }`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot.start_time.slice(0, 5)}-{slot.end_time.slice(0, 5)}
                    </button>
                  ))
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold text-gray-500 mb-3">
                Ghi chú đặt khám
              </p>
              <TextField
                label="Ghi chú"
                multiline
                rows={2}
                fullWidth
                sx={{ mb: 2, mx: "auto" }}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <Stack direction="row" spacing={2} sx={{ mt: 2, mx: "auto" }}>
              <Button
                variant="outlined"
                color="info"
                onClick={handleBack}
                sx={{
                  mt: "auto",
                  width: 200,
                  mx: "auto",
                  display: "block",
                  padding: "10px 24px",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  borderRadius: "0.25rem",
                }}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!selectedDate || !selectedSlot}
                loading={submitLoading}
                onClick={handleSubmit}
                sx={{
                  mt: "auto",
                  width: 200,
                  mx: "auto",
                  display: "block",
                  backgroundColor: "#007bff",
                  padding: "10px 24px",
                  fontSize: "1rem",
                  lineHeight: 1.5,
                  borderRadius: "0.25rem",
                }}
              >
                Đặt lịch
              </Button>
            </Stack>
          </div>
        </Slide>
      )}
    </div>
  );
};

export default ServiceAssignmentPage;
