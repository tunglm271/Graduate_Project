import {
  Button,
  Divider,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import serviceImg from "@images/service.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const AppointmentCard = ({ appointment }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const steps = [
    t("appointment.card.steps.booked"),
    t("appointment.card.steps.waitingAssignment"),
    t("appointment.card.steps.waitingPayment"),
    t("appointment.card.steps.waitingExecution"),
    t("appointment.card.steps.completed"),
  ];

  const calCurrentStep = () => {
    if (appointment.status === "pending") return 1;
    if (appointment.status === "assigned") return 2;
    if (appointment.status === "paid") return 3;
    if (appointment.status === "completed") return 5;
    return 4;
  };
  const currentStep = calCurrentStep();

  return (
    <div className="appointment-card">
      <div
        className={`flex justify-between items-center ${
          isMobile ? "flex-col gap-2.5" : ""
        }`}
      >
        <h4>{t("appointment.card.appointmentCode")}</h4>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          className={isMobile ? "w-full" : ""}
        >
          <Button fullWidth={isMobile} variant={isMobile ? "outlined" : "text"}>
            {t("appointment.card.viewDetails")}
          </Button>
          <Button fullWidth={isMobile} variant={isMobile ? "outlined" : "text"}>
            {t("appointment.card.contactClinic")}
          </Button>
        </Stack>
      </div>
      <Divider />

      <div className="appointment-card-content">
        <Link
          to={`/clinic/${appointment.medical_facility.id}`}
          className="facility-link"
        >
          <HouseIcon /> {appointment.medical_facility.facility_name}
        </Link>
        <div className="booked-service">
          <img src={serviceImg} alt="" />
          <div className="ml-2.5">
            <Typography variant="h6" className="font-semibold">
              {appointment.medical_service.name}
            </Typography>
            <Typography variant="body1">
              {t("appointment.card.appointmentDate", {
                date: new Date(appointment.date).toLocaleDateString("vi"),
              })}
            </Typography>
            <Typography
              variant="subtitle1"
              className="text-gray-500 flex items-center gap-0.5 text-sm"
            >
              {t("appointment.card.appointmentTime", {
                startTime: appointment.start_time,
                endTime: appointment.end_time,
              })}
              <AccessTimeIcon fontSize="14px" />
            </Typography>
          </div>
        </div>
        <h4 className="mb-1.5 flex items-center gap-1 text-sm">
          <BookmarksIcon fontSize="small" color="primary" />
          <span>{t("appointment.card.doctorInformation")}</span>
        </h4>
        {appointment.doctor ? (
          <div className="appointment-doctor-info">
            <Typography variant="body2">
              {t("appointment.card.doctor.fullName", {
                name: appointment.doctor.name,
              })}
            </Typography>
            <Typography variant="body2">
              {t("appointment.card.doctor.specialty")}
            </Typography>
            <Typography variant="body2">
              {t("appointment.card.doctor.experience")}
            </Typography>
            <Typography variant="body2">
              {t("appointment.card.doctor.phone")}
            </Typography>
          </div>
        ) : (
          <div className="flex justify-center items-center text-center h-10 italic">
            {t("appointment.card.notAssigned")}
          </div>
        )}
      </div>

      <Divider />
      <Stepper
        activeStep={currentStep}
        className={`p-4 ${isMobile ? "[&_.MuiStepLabel-label]:text-xs" : ""}`}
        orientation={isMobile ? "vertical" : "horizontal"}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Button
        variant="contained"
        className={`shadow-none block ml-auto mr-2 ${
          isMobile ? "w-full mt-2" : "w-fit"
        }`}
        disabled={currentStep != 2}
        component={Link}
        to={`/appointments/${appointment.id}/bill`}
      >
        {currentStep <= 2
          ? t("appointment.card.payment.pay")
          : t("appointment.card.payment.paid")}
      </Button>
    </div>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    status: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    medical_facility: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      facility_name: PropTypes.string.isRequired,
    }).isRequired,
    medical_service: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    doctor: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default AppointmentCard;
