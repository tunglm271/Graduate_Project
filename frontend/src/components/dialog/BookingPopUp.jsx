import { useState, forwardRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StepLabel from "@mui/material/StepLabel";
import facilityImg from "../../assets/images/facility.jpg";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import {
  Autocomplete,
  TextField,
  Button,
  styled,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import "./bookingPopUp.css";
import MonthPicker from "./MonthPicker";
import DatePicker from "./DatePicker";
import SectionPicker from "./SectionPicker";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import healthProfileApi from "../../service/healthProfileApi";
import medicalServiceApi from "../../service/medicalServiceAPi";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import appointmentApi from "../../service/appointmentApi";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import doctorDefaultImg from "../../assets/images/doctor.png";
import { formatDateTime } from "../../utlis/DateFun";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function BookingPopUp({
  open,
  onClose,
  facility,
  doctor,
  id,
  bookingType = "service",
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
  const [profileOption, setProfileOption] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    healthProfileApi.getAll().then((res) => {
      setProfileOption(res.data);
      console.log(res.data);
    });
  }, []);

  const [chosenProfile, setChosenProfile] = useState(profileOption[0]);
  const [month, setMonth] = useState(new Date());
  const [date, setDate] = useState(dayjs());
  const [activeStep, setActiveStep] = useState(0);
  const [postedFiles, setPostedFiles] = useState([]);
  const [fileNames, setFileNames] = useState({});
  const [sectionList, setSectionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(null);
  const [reason, setReason] = useState("");

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    const newActiveStep = activeStep < 2 ? activeStep + 1 : 0;
    if (newActiveStep === 0) {
      onClose();
      setChosenProfile([]);
    }
    if (activeStep == 2) {
      handleSubmit();
    }
    setActiveStep(newActiveStep);
  };

  useEffect(() => {
    setLoading(true);
    if(bookingType == "service") {
      medicalServiceApi
        .getValiableSlots(id, date.format("YYYY-MM-DD"))
        .then((res) => {
          setSelectedSection(null);
          setSectionList(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      medicalServiceApi
        .getDoctorSlots(date.format("YYYY-MM-DD"), doctor.id)
        .then((res) => {
          setSelectedSection(null);
          setSectionList(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [date, doctor]);

  const steps = ["Nhập thông tin khám", "Chọn ngày khám", "Tài liệu đính kèm"];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPostedFiles((prevFiles) => [...prevFiles, ...files]);
    const newFileNames = {};
    files.forEach((file) => {
      newFileNames[file.name] = file.name.split(".")[0];
    });
    setFileNames((prev) => ({ ...prev, ...newFileNames }));
  };

  const handleFileNameChange = (fileName, newName) => {
    setFileNames((prev) => ({
      ...prev,
      [fileName]: newName,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("health_profile_id", chosenProfile.id);
    if (bookingType === "service") {
      formData.append("medical_service_id", id);
    } else {
      formData.append("doctor_id", doctor.id);
    }
    formData.append("date", date.format("YYYY-MM-DD"));
    formData.append("start_time", selectedSection.start_time);
    formData.append("end_time", selectedSection.end_time);
    formData.append("reason", reason.trim());

    postedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
      formData.append(
        `file_names[${index}]`,
        fileNames[file.name] || file.name.split(".")[0]
      );
    });

    appointmentApi
      .create(formData)
      .then(() => {
        showSuccessSnackbar("Đặt lịch khám thành công!");
        setPostedFiles([]);
        setActiveStep(0);
        setChosenProfile(null);
        setReason("");
        setDate(dayjs());
        setMonth(new Date());
        setSelectedSection(null);
        setIsSubmitting(false);
        onClose();
      })
      .catch((err) => {
        console.error(err);
        showErrorSnackbar(
          err.response?.data?.message || "Có lỗi xảy ra khi đặt lịch"
        );
        setIsSubmitting(false);
      });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth={isMobile ? "sm" : isTablet ? "md" : "lg"}
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        sx={{
          padding: "12px 16px",
        }}
      >
        {"Đặt lịch khám"}
      </DialogTitle>
      <DialogContent
        sx={{
          width: isMobile ? "360px" : "800px",
          background: "#F4F7FF",
          paddingTop: "20px",
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ marginTop: "20px" }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={index < activeStep}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <div className="mt-4">
            <div className="facility-popup-card">
              <img src={facilityImg} alt="" />
              <div>
                <h4>{facility?.facility_name}</h4>
                <p className="flex items-center text-sm">
                  <LocationOnIcon sx={{ color: "#007bff" }} />
                  {facility?.address}
                </p>
              </div>
            </div>

            {bookingType === "doctor" && doctor && (
              <div className="doctor-info bg-white flex items-center gap-4 mb-4">
                <img
                  src={doctor.avatar || doctorDefaultImg}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h4 className="text-lg font-bold text-blue-700 mb-1">
                    BS. {doctor.name}
                  </h4>
                  <p className="text-gray-600 mb-1">
                    Chuyên khoa:{" "}
                    <span className="font-medium">
                      {doctor.specialization || "-"}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <p className="text-gray-600 mb-1">{doctor.phone || "-"}</p>
                    <p className="text-gray-600">{doctor.email || "-"}</p>
                  </div>
                </div>
              </div>
            )}

            <Autocomplete
              id="profile-select"
              sx={{
                background: "white",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(173, 216, 230, 0.7)",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
              options={profileOption}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Chọn người khám" />
              )}
              value={chosenProfile}
              renderOption={(props, option) => (
                <li {...props} style={{ display: "flex", gap: "10px" }}>
                  <div>{option.name}</div>
                  <div style={{ color: "gray", fontSize: "14px" }}>
                    {t(option.relationship)}
                  </div>
                </li>
              )}
              onChange={(event, value) => setChosenProfile(value)}
            />

            {chosenProfile && (
              <div className="profile-detail">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4
                    style={{
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <BookmarksIcon fontSize="small" color="primary" />
                    <span>Thông tin hồ sơ</span>
                  </h4>
                  <Button
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </div>
                <ul>
                  <li>
                    <span>Họ và tên </span>
                    <span>{chosenProfile.name}</span>
                  </li>
                  <li>
                    <span>Ngày sinh </span>
                    <span>{formatDateTime(chosenProfile.date_of_birth, "vi", "long")}</span>
                  </li>
                  <li>
                    <span>Giới tính </span>
                    <span>{chosenProfile.gender}</span>
                  </li>
                  <li>
                    <span>Số điện thoại </span>
                    <span>{chosenProfile.phone}</span>
                  </li>
                </ul>
              </div>
            )}

            <TextField
              multiline
              rows={4}
              label="Nhập lí do khám bệnh"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              sx={{
                width: "100%",
                marginTop: "20px",
                background: "white",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(173, 216, 230, 0.7)",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
                fontSize: "16px",
              }}
            >
              <h4>Chọn ngày khám</h4>
              <MonthPicker setMonth={setMonth} />
            </div>

            <DatePicker month={month} date={date} setDate={setDate} />
            {loading ? (
              <CircularProgress />
            ) : (
              <SectionPicker
                sectionList={sectionList}
                onSelectSection={setSelectedSection}
                selectedSection={selectedSection}
              />
            )}
          </div>
        )}

        {activeStep === 2 && (
          <div style={{ marginTop: "20px", minHeight: "200px" }}>
            <label>
              <Button
                component="span"
                sx={{
                  background: "white",
                  textTransform: "none",
                  display: "flex",
                  gap: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px dashed #007bff",
                }}
              >
                <CameraAltIcon />
                Thêm hình ảnh, kết quả xét nghiệm, chụp chiếu gần nhất, thuận
                tiện cho bác sĩ tư vấn
              </Button>
              <VisuallyHiddenInput
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </label>

            <div className="uploaded-files">
              <h4 style={{ margin: "10px 0px" }}>Tài liệu đính kèm</h4>
              <div className="file-list">
                {postedFiles.map((file, index) => (
                  <div key={index} className="uploaded-file">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex items-center justify-between">
                        <a
                          href={URL.createObjectURL(file)}
                          download={file.name}
                          className="text-sm underline font-semibold hover:text-blue-400"
                        >
                          {file.name}
                        </a>
                        <IconButton
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => {
                            setPostedFiles((prevFiles) =>
                              prevFiles.filter((_, i) => i !== index)
                            );
                            setFileNames((prev) => {
                              const newNames = { ...prev };
                              delete newNames[file.name];
                              return newNames;
                            });
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                      <TextField
                        size="small"
                        label="Tên tài liệu"
                        value={fileNames[file.name] || ""}
                        onChange={(e) =>
                          handleFileNameChange(file.name, e.target.value)
                        }
                        placeholder="Nhập tên tài liệu"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions sx={{ background: "#F4F7FF" }}>
        <Button
          color="inherit"
          onClick={handleBack}
          disabled={activeStep === 0 || isSubmitting}
        >
          Quay lại
        </Button>
        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          startIcon={
            isSubmitting && <CircularProgress size={20} color="inherit" />
          }
        >
          {activeStep === 2
            ? isSubmitting
              ? "Đang xử lý..."
              : "Đặt lịch"
            : "Tiếp tục"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BookingPopUp.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  facility: PropTypes.object,
  doctor: PropTypes.object,
  id: PropTypes.any,
  bookingType: PropTypes.string,
};
