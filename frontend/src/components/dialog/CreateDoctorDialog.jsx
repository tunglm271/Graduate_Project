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
} from "@mui/material";
import doctorApi from "../../service/Doctorapi";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const specialties = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"];

const CreateDoctorDialog = ({open, onClose}) => {
    const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: "",
      specialization: "",
      position: "",
      email: "",
      phone: "",
      schedule: "",
    });
  
    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleSubmit = () => {
        console.log("Doctor Data:", formData);
        doctorApi.create(formData)
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
            <>
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
            </>
            )}
            {activeStep === 1 && (
            <TextField
                fullWidth
                label="Working Schedule"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
            />
            )}
            {activeStep === 2 && (
            <div>
                <p><strong>Full Name:</strong> {formData.name}</p>
                <p><strong>Specialty:</strong> {formData.specialization}</p>
                <p><strong>Position:</strong> {formData.position}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Schedule:</strong> {formData.schedule}</p>
            </div>
            )}
        </DialogContent>
        <DialogActions>
            {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
            {activeStep < 2 ? (
            <Button onClick={handleNext} variant="contained">
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
}

export default CreateDoctorDialog;
