import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Slide,
} from "@mui/material";
import doctorApi from "../../service/DoctorApi";
import WorkSchedule from "../WorkSchedule";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const specialties = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"];

const CreateDoctorDialog = ({ open, onClose }) => {
  const daysOfWeek = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
  ];
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [preStep, setPreStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    position: "",
    email: "",
    phone: "",
  });
  const [weekSchedule, setWeekSchedule] = useState(
    daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: [] }), {})
  );

  const updateShifts = (day, shifts) => {
    setWeekSchedule({ ...weekSchedule, [day]: shifts });
  };

  const handleNext = () => {
    setPreStep(activeStep);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setPreStep(activeStep);
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(weekSchedule);
    doctorApi
      .create(formData, weekSchedule)
      .then(() => {
        showSuccessSnackbar("Doctor created successfully");
      })
      .catch((error) => {
        showErrorSnackbar("Failed to create doctor");
      });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Doctor</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {["Basic Info", "Schedule", "Confirm"].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Slide
            direction={activeStep > preStep ? "left" : "right"}
            in={activeStep === 0}
            mountOnEnter
            unmountOnExit
            timeout={400}
          >
            <div>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                select
                label="Specialty"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                margin="normal"
              >
                {specialties.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
              />
            </div>
          </Slide>
        )}
        {activeStep === 1 && (
          <Slide
            direction={activeStep > preStep ? "left" : "right"}
            in={activeStep === 1}
            mountOnEnter
            unmountOnExit
            timeout={400}
          >
            <div>
              {daysOfWeek.map((day) => (
                <WorkSchedule
                  key={day}
                  day={day}
                  shifts={weekSchedule[day]}
                  setShifts={(shifts) => updateShifts(day, shifts)}
                />
              ))}
            </div>
          </Slide>
        )}
        {activeStep === 2 && (
          <Slide
            direction={activeStep > preStep ? "left" : "right"}
            in={activeStep === 2}
            mountOnEnter
            unmountOnExit
            timeout={400}
          >
            <div>
              <p>
                <strong>Full Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Specialty:</strong> {formData.specialization}
              </p>
              <p>
                <strong>Position:</strong> {formData.position}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              <p>
                <strong>Schedule:</strong>
              </p>
              <ul>
                {Object.entries(weekSchedule).map(
                  ([day, shifts]) =>
                    shifts.length > 0 && (
                      <li key={day}>
                        <strong>{day}</strong>
                        <ul>
                          {shifts.map((shift, index) => (
                            <li key={index}>
                              {shift.start} - {shift.end}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                )}
              </ul>
            </div>
          </Slide>
        )}
      </DialogContent>
      <DialogActions>
        {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
        {activeStep < 2 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={formData.name === "" || formData.email === ""}
          >
            Next
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateDoctorDialog;
