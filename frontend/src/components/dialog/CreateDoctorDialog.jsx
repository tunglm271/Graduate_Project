import { useState } from "react";
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
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const CreateDoctorDialog = ({ open, onClose, onCreated }) => {
  const { t } = useTranslation();

  const daysOfWeek = [
    t("admin.doctor_management.monday"),
    t("admin.doctor_management.tuesday"),
    t("admin.doctor_management.wednesday"),
    t("admin.doctor_management.thursday"),
    t("admin.doctor_management.friday"),
    t("admin.doctor_management.saturday"),
    t("admin.doctor_management.sunday"),
  ];
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [preStep, setPreStep] = useState(0);
  const initialFormData = {
    name: "",
    specialization: "",
    position: "",
    email: "",
    phone: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const initialWeekSchedule = daysOfWeek.reduce(
    (acc, day) => ({ ...acc, [day]: [] }),
    {}
  );
  const [weekSchedule, setWeekSchedule] = useState(initialWeekSchedule);

  const resetForm = () => {
    setActiveStep(0);
    setPreStep(0);
    setFormData(initialFormData);
    setWeekSchedule(initialWeekSchedule);
  };

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
        showSuccessSnackbar(
          t("admin.doctor_management.doctor_created_success")
        );
        if (onCreated) onCreated();
        resetForm();
        onClose();
      })
      .catch((error) => {
        console.error("Failed to create doctor:", error);
        showErrorSnackbar(t("admin.doctor_management.failed_to_create_doctor"));
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{t("admin.doctor_management.add_new_doctor")}</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {[
            t("admin.doctor_management.basic_info"),
            t("admin.doctor_management.schedule"),
            t("admin.doctor_management.confirm"),
          ].map((label) => (
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
                label={t("admin.doctor_management.full_name")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                select
                label={t("admin.doctor_management.specialty")}
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                margin="normal"
              >
                {[
                  t("admin.doctor_management.specialties.cardiology"),
                  t("admin.doctor_management.specialties.neurology"),
                  t("admin.doctor_management.specialties.orthopedics"),
                  t("admin.doctor_management.specialties.pediatrics"),
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                select
                label={t("admin.doctor_management.position")}
                name="position"
                value={formData.position}
                onChange={handleChange}
                margin="normal"
              >
                {[
                  {
                    textKey:
                      "admin.doctor_management.positions.general_practitioner",
                    value: "Bác sĩ đa khoa",
                  },
                  {
                    textKey:
                      "admin.doctor_management.positions.specialist_level_1",
                    value: "Bác sĩ chuyên khoa I",
                  },
                  {
                    textKey:
                      "admin.doctor_management.positions.specialist_level_2",
                    value: "bác sĩ chuyên khoa 2",
                  },
                  {
                    textKey:
                      "admin.doctor_management.positions.master_of_medicine",
                    value: "Thạc sĩ Y học",
                  },
                  {
                    textKey: "admin.doctor_management.positions.doctorate",
                    value: "tiến sĩ",
                  },
                  {
                    textKey: "admin.doctor_management.positions.professor",
                    value: "giáo sư",
                  },
                  {
                    textKey:
                      "admin.doctor_management.positions.associate_professor",
                    value: "phó giáo sư",
                  },
                ].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {t(option.textKey)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label={t("admin.doctor_management.email")}
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label={t("admin.doctor_management.phone_number")}
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
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0 8px",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        fontWeight: "bold",
                        width: "40%",
                        verticalAlign: "top",
                      }}
                    >
                      {t("admin.doctor_management.full_name")}
                    </td>
                    <td style={{ textAlign: "right" }}>{formData.name}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold", verticalAlign: "top" }}>
                      {t("admin.doctor_management.specialty")}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {formData.specialization}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold", verticalAlign: "top" }}>
                      {t("admin.doctor_management.position")}
                    </td>
                    <td style={{ textAlign: "right" }}>{formData.position}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold", verticalAlign: "top" }}>
                      {t("admin.doctor_management.email")}
                    </td>
                    <td style={{ textAlign: "right" }}>{formData.email}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold", verticalAlign: "top" }}>
                      {t("admin.doctor_management.phone_number")}
                    </td>
                    <td style={{ textAlign: "right" }}>{formData.phone}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {t("admin.doctor_management.schedule")}:
                </div>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: "0 4px",
                  }}
                >
                  <tbody>
                    {Object.entries(weekSchedule).map(
                      ([day, shifts]) =>
                        shifts.length > 0 && (
                          <tr key={day}>
                            <td
                              style={{
                                fontWeight: "bold",
                                verticalAlign: "top",
                                width: "40%",
                              }}
                            >
                              {day}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {shifts.map((shift, index) => (
                                <div key={index}>
                                  {shift.start} - {shift.end}
                                </div>
                              ))}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Slide>
        )}
      </DialogContent>
      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack}>
            {t("admin.doctor_management.back")}
          </Button>
        )}
        {activeStep < 2 ? (
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={formData.name === "" || formData.email === ""}
          >
            {t("admin.doctor_management.next")}
          </Button>
        ) : (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {t("admin.doctor_management.confirm")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

CreateDoctorDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreated: PropTypes.func,
};

export default CreateDoctorDialog;
