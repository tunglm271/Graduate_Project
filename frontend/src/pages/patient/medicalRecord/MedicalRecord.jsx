import "./MedicalRecord.css";
import {
  Button,
  Breadcrumbs,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Skeleton,
  Divider,
  CircularProgress,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import medicalRecordApi from "../../../service/medicalRecordApi";
import { formatDateTime } from "../../../utlis/DateFun";
import MetricsExaminationResult from "../../../components/table/MetricsExaminationResult";
import ImagesExaminationResult from "../../../components/ImagesExaminationResult";
import PrescriptionTable from "../../../components/table/PrescriptionTable";
import DownloadIcon from '@mui/icons-material/Download';
import PillIcon from "@icon/PillIcon"
import { useTranslation } from "react-i18next";

const MedicalRecord = () => {
  const { recordId } = useParams();
  const { t } = useTranslation();
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    medicalRecordApi
      .getById(recordId)
      .then((response) => {
        setMedicalRecord(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medical record:", error);
        setLoading(false);
      });
  }, []);

  const handleDownloadDescription = () => {
    medicalRecordApi.downloadDescription(recordId)
    .then((response) => {
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    })
    .catch((error) => {
        console.error("Tải đơn thuốc thất bại:", error);
    });
  };

  return (
    <div id="medical-record-detail">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
      <Link to={"/health-profile"} className="hover:underline">
          {t("health-profiles-list")}
      </Link>
        <Typography color="text.primary">Nguyen Van A (Bố)</Typography>
        <Typography color="text.primary">Medical Record</Typography>
      </Breadcrumbs>

      <div className="appointment-infor-section">
        <h1>Thông tin khám bệnh</h1>
        <p>Mã lần khám: A132412NB4123AA</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ListItem sx={{ p: 0 }}>
            <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
              <EventIcon />
            </ListItemIcon>
            {loading ? (
              <Skeleton variant="text" width={200} height={30} />
            ) : (
              <ListItemText
                primary={formatDateTime(
                  medicalRecord?.appointment.date,
                  "vi",
                  "long"
                )}
                secondary="Ngày khám"
              />
            )}
          </ListItem>
          <ListItem sx={{ p: 0 }}>
            <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
              <EventAvailableIcon />
            </ListItemIcon>
            {loading ? (
              <Skeleton variant="text" width={200} height={30} />
            ) : (
              <ListItemText
                primary={formatDateTime(
                  medicalRecord?.appointment.result_release_date,
                  "vi",
                  "long"
                )}
                secondary="Ngày trả kết quả khám"
              />
            )}
          </ListItem>
        </div>

        <h4
          style={{
            marginBottom: "5px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <BookmarksIcon fontSize="small" color="primary" />
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
                {medicalRecord?.appointment.medical_facility.facility_name}
              </p>
              <div className="flex gap-5">
                <p className="text-gray-500">
                  {medicalRecord?.appointment.medical_facility.address}
                </p>
                <p className="text-gray-500">
                  {medicalRecord?.appointment.medical_facility.phone}
                </p>
                <p className="text-gray-500">
                  {medicalRecord?.appointment.medical_facility.email}
                </p>
              </div>
            </>
          )}
        </div>
        <h4
          style={{
            marginBottom: "5px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <BookmarksIcon fontSize="small" color="primary" />
          <span>Người phụ trách</span>
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
              <p className="font-semibold">{medicalRecord?.doctor.name}</p>
              <div className="flex gap-5">
                <p className="text-gray-500">
                  {medicalRecord?.doctor.specialization}
                </p>
                <p className="text-gray-500">{medicalRecord?.doctor.phone}</p>
                <p className="text-gray-500">{medicalRecord?.doctor.email}</p>
              </div>
            </>
          )}
        </div>
      </div>
      {
        loading ? ( 
          <div className="flex justify-center items-center text-center h-20 italic">
            <CircularProgress size={24} /> Đang tải kết quả khám bệnh
          </div>
        )
        : 
        <div className="appoiment-result">
          <div className="examination-result">
              {
                  medicalRecord?.examinations.map((examination, index) => {
                      if (examination.examination_type === "metrics") {
                      return <MetricsExaminationResult key={index} indicators={examination.indicators} conclusion={examination.conclusion} />;
                      }

                      if (examination.examination_type === "images") {
                      return <ImagesExaminationResult key={index} />;
                      }

                      return null;
                  })
              }
            {
              medicalRecord?.prescription &&
              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
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
                      startIcon={<DownloadIcon />}
                      onClick={handleDownloadDescription}
                    >
                      Tải đơn thuốc
                    </Button>
                  </Stack>
                  <PrescriptionTable prescription={medicalRecord?.prescription} />
                </AccordionDetails>
              </Accordion>
            }

            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <TextSnippetIcon />
                <Typography sx={{ marginLeft: "5px", fontWeight: 600 }}>
                  Kết quả
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p className="font-semibold text-lg">Chuẩn đoán</p>
                <p className="mb-5">{medicalRecord?.diagnosis}</p>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      }
    </div>
  );
};

export default MedicalRecord;
