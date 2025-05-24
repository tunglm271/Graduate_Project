import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Breadcrumbs,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Divider,
  CircularProgress,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
} from "@mui/material";
import {
  Event,
  Bookmarks,
  ExpandMore,
  TextSnippet,
  Download,
  LocationOn,
  Person,
  AccessTime,
  MedicalServices,
  Assignment,
} from "@mui/icons-material";
import PillIcon from "@icon/PillIcon";
import { formatDateTime } from "../../../utlis/DateFun";
import MetricsExaminationResult from "../../../components/table/MetricsExaminationResult";
import ImagesExaminationResult from "../../../components/ImagesExaminationResult";
import PrescriptionTable from "../../../components/table/PrescriptionTable";
import appointmentApi from "../../../service/appointmentApi";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import "./appointment.css";

const AppointmentDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { showErrorSnackbar } = useCustomSnackbar();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appointmentApi
      .getById(id)
      .then((response) => {
        console.log(response.data);
        setAppointment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointment:", error);
        showErrorSnackbar("Không thể tải thông tin lịch hẹn");
        setLoading(false);
      });
  }, [id]);

  const handleDownloadDescription = () => {
    appointmentApi
      .downloadDescription(id)
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
      })
      .catch((error) => {
        console.error("Tải đơn thuốc thất bại:", error);
        showErrorSnackbar("Không thể tải đơn thuốc");
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Đã hoàn thành";
      case "cancelled":
        return "Đã hủy";
      case "pending":
        return "Đang chờ";
      default:
        return status;
    }
  };

  return (
    <div id="appointment-detail">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
        <Link to="/appointments" className="hover:underline">
          {t("appointments")}
        </Link>
        <Typography color="text.primary">
          {loading ? <Skeleton width={100} /> : `Lịch hẹn #${appointment?.id}`}
        </Typography>
      </Breadcrumbs>

      <div className="appointment-infor-section">
        <div className="flex justify-between items-center mb-4">
          <h1>Thông tin lịch hẹn</h1>
          {!loading && (
            <Chip
              label={getStatusText(appointment?.status)}
              color={getStatusColor(appointment?.status)}
              size="small"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ListItem sx={{ p: 0 }}>
            <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
              <Event />
            </ListItemIcon>
            {loading ? (
              <Skeleton variant="text" width={200} height={30} />
            ) : (
              <ListItemText
                primary={formatDateTime(appointment?.date, "vi", "long")}
                secondary="Ngày khám"
              />
            )}
          </ListItem>

          <ListItem sx={{ p: 0 }}>
            <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
              <AccessTime />
            </ListItemIcon>
            {loading ? (
              <Skeleton variant="text" width={200} height={30} />
            ) : (
              <ListItemText
                primary={`${appointment?.start_time} - ${appointment?.end_time}`}
                secondary="Thời gian khám"
              />
            )}
          </ListItem>

          <ListItem sx={{ p: 0 }}>
            <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
              <Assignment />
            </ListItemIcon>
            {loading ? (
              <Skeleton variant="text" width={200} height={30} />
            ) : (
              <ListItemText
                primary={appointment?.reason || "Không có"}
                secondary="Lý do khám"
              />
            )}
          </ListItem>
        </div>

        <h4 className="section-title">
          <Bookmarks fontSize="small" color="primary" />
          <span>Cơ sở khám</span>
        </h4>
        <Divider />
        <div className="mt-1 mb-3">
          {loading ? (
            <>
              <Skeleton variant="text" width={200} height={30} />
              <Skeleton variant="text" width={400} height={30} />
            </>
          ) : (
            <>
              <p className="font-semibold">
                {appointment?.medical_facility?.facility_name}
              </p>
              <div className="flex flex-wrap gap-5">
                <p className="text-gray-500 flex items-center">
                  <LocationOn fontSize="small" className="mr-1" />
                  {appointment?.medical_facility?.address}
                </p>
                <p className="text-gray-500">
                  {appointment?.medical_facility?.phone}
                </p>
                <p className="text-gray-500">
                  {appointment?.medical_facility?.email}
                </p>
              </div>
            </>
          )}
        </div>

        <h4 className="section-title">
          <Person fontSize="small" color="primary" />
          <span>Thông tin người khám</span>
        </h4>
        <Divider />
        <div className="mt-1 mb-3">
          {loading ? (
            <>
              <Skeleton variant="text" width={200} height={30} />
              <Skeleton variant="text" width={400} height={30} />
            </>
          ) : (
            <>
              <p className="font-semibold">
                {appointment?.health_profile?.name} (
                {t(
                  `profile.relationship.${appointment?.health_profile?.relationship}`
                )}
                )
              </p>
              <div className="flex flex-wrap gap-5">
                <p className="text-gray-500">
                  {appointment?.health_profile?.phone}
                </p>
                <p className="text-gray-500">
                  {appointment?.health_profile?.email}
                </p>
              </div>
            </>
          )}
        </div>

        <h4 className="section-title">
          <MedicalServices fontSize="small" color="primary" />
          <span>Bác sĩ phụ trách</span>
        </h4>
        <Divider />
        <div className="mt-1 mb-3">
          {loading ? (
            <>
              <Skeleton variant="text" width={200} height={30} />
              <Skeleton variant="text" width={400} height={30} />
            </>
          ) : appointment?.doctor ? (
            <>
              <p className="font-semibold">
                {appointment.doctor.name} - {appointment.doctor.specialization}
              </p>
              <div className="flex flex-wrap gap-5">
                <p className="text-gray-500">{appointment.doctor.phone}</p>
                <p className="text-gray-500">{appointment.doctor.email}</p>
              </div>
            </>
          ) : (
            <p className="text-gray-500 italic">Chưa được chỉ định</p>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center text-center h-20 italic">
          <CircularProgress size={24} /> Đang tải kết quả khám bệnh
        </div>
      ) : appointment?.medical_record ? (
        <div className="appointment-result">
          <div className="examination-result">
            {appointment.medical_record.examinations?.map(
              (examination, index) => {
                if (examination.examination_type === "metrics") {
                  return (
                    <MetricsExaminationResult
                      key={index}
                      indicators={examination.indicators}
                      conclusion={examination.conclusion}
                    />
                  );
                }
                if (examination.examination_type === "images") {
                  return <ImagesExaminationResult key={index} />;
                }
                return null;
              }
            )}

            {appointment.medical_record.prescription && (
              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="prescription-content"
                  id="prescription-header"
                >
                  <PillIcon size={24} color="#000" />
                  <Typography sx={{ marginLeft: "5px", fontWeight: 600 }}>
                    Đơn thuốc
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<Download />}
                      onClick={handleDownloadDescription}
                    >
                      Tải đơn thuốc
                    </Button>
                  </Stack>
                  <PrescriptionTable
                    prescription={appointment.medical_record.prescription}
                  />
                </AccordionDetails>
              </Accordion>
            )}

            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="diagnosis-content"
                id="diagnosis-header"
              >
                <TextSnippet />
                <Typography sx={{ marginLeft: "5px", fontWeight: 600 }}>
                  Kết quả
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p className="font-semibold text-lg">Chuẩn đoán</p>
                <p className="mb-5">{appointment.medical_record.diagnosis}</p>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ) : (
        <div className="text-center p-4 text-gray-500">
          Chưa có kết quả khám bệnh
        </div>
      )}
    </div>
  );
};

export default AppointmentDetail;
