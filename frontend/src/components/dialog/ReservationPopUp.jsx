import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  IconButton,
  Avatar,
  Divider,
  TextField,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import { useEffect, useState, useMemo } from "react";
import medicalServiceApi from "../../service/medicalServiceAPi";
import appointmentApi from "../../service/appointmentApi";
import { getUser } from "../../utlis/auth";
import { Link } from "react-router-dom";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import PropTypes from "prop-types";
import { formatDateTime } from "../../utlis/DateFun";

const ReservationPopUp = ({
  open,
  onClose,
  reservation,
  openResult,
  handleOpenResult,
  onRefresh,
}) => {
  const user = getUser();
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [position, setPosition] = useState("50%");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejecting, setIsRejecting] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const { showInfoSnackbar } = useCustomSnackbar();

  // Cache random color for the current reservation
  const avatarColor = useMemo(() => {
    if (!reservation?.health_profile?.name) return "#000000";

    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, [reservation?.health_profile?.name]); // Only recalculate if patient name changes

  const handleReject = () => {
    setRejectDialogOpen(true);
  };

  console.log(reservation);

  const handleConfirmReject = () => {
    if (isRejecting) return;
    setIsRejecting(true);
    appointmentApi
      .reject(reservation?.id, rejectReason)
      .then((res) => {
        console.log(res.data);
        showInfoSnackbar("Từ chối đơn khám thành công");
        setRejectDialogOpen(false);
        onClose();
        onRefresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsRejecting(false);
      });
  };

  const handleCloseRejectDialog = () => {
    setRejectDialogOpen(false);
    setRejectReason("");
  };

  const handleUpdate = () => {
    if (isAssigning) return;
    setIsAssigning(true);
    appointmentApi
      .assignDoctor(reservation?.id, selectedDoctor)
      .then((res) => {
        console.log(res.data);
        showInfoSnackbar("Chỉ định bác sĩ thành công");
        onClose();
        onRefresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsAssigning(false);
      });
  };

  useEffect(() => {
    if (reservation) {
      console.log(reservation);
      medicalServiceApi
        .getDoctor(reservation?.medical_service.id, reservation?.id)
        .then((res) => {
          console.log("doctor", res.data);
          setDoctor(res.data);
          if (reservation.doctor) {
            setSelectedDoctor(reservation.doctor?.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [reservation]);

  const handleToggleResult = () => {
    if (position == "25%") {
      setPosition("50%");
    } else {
      setPosition("25%");
    }
    handleOpenResult((prev) => !prev);
  };

  useEffect(() => {
    if (openResult) {
      setPosition("25%");
    } else {
      setPosition("50%");
    }
  }, [openResult]);

  const getFileIcon = (fileType) => {
    if (fileType?.includes("image")) return <ImageIcon />;
    if (fileType?.includes("pdf")) return <PictureAsPdfIcon />;
    return <DescriptionIcon />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            position: "absolute",
            left: position,
            top: "45%",
            transform: "translate(-50%,-50%)",
            transition: "left 0.3s ease-in-out",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Reservation ID #12N234
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="flex border-[1.5px] border-gray-300 rounded-lg items-center gap-5 p-5">
            <Avatar sx={{ width: 56, height: 56, bgcolor: avatarColor }}>
              {reservation?.health_profile.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </Avatar>
            <div>
              <p className="text-gray-500">Patient Name</p>
              <strong className="text-xl">
                {reservation?.health_profile.name}
              </strong>
            </div>
            <Button
              sx={{ marginLeft: "auto" }}
              variant="outlined"
              color="primary"
              component={Link}
              to={`/${user.role == 4 ? "facility" : "doctor"}/patients/${
                reservation?.health_profile.id
              }`}
            >
              Xem hồ sơ bệnh án
            </Button>
          </div>
          <div className="bg-slate-100 px-5 py-2 rounded-b-lg gap-5 border-[1.5px] border-t-0 border-gray-300 -mt-2">
            <p className="flex items-center gap-1 text-gray-500 font-semibold text-sm">
              <StickyNote2Icon sx={{ color: "gray" }} />
              <span>Lí do khám</span>
            </p>
            <p className="text-gray-600 text-xs">
              {reservation?.reason || "Không có lí do khám cụ thể"}
            </p>
          </div>
          <div className="flex items-start justify-between mt-5">
            <div className="flex items-start gap-2">
              <div className="flex items-center p-2 rounded-md bg-slate-100">
                <MedicalInformationIcon sx={{ color: "gray" }} />
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400 mb-1">Dịch vụ</p>
                <p className="text-sm">{reservation?.medical_service.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex items-center p-2 rounded-md bg-slate-100">
                <CalendarTodayIcon sx={{ color: "gray" }} />
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400 mb-1">
                  Ngày khám
                </p>
                <p className="text-sm">
                  {formatDateTime(reservation?.date, "vi", "long")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex items-center p-2 rounded-md bg-slate-100">
                <AccessTimeIcon sx={{ color: "gray" }} />
              </div>
              <div>
                <p className="text-xs uppercase text-gray-400 mb-1">Giờ khám</p>
                <p className="text-sm">
                  {reservation?.start_time} - {reservation?.end_time}
                </p>
              </div>
            </div>
          </div>
          <Divider sx={{ marginTop: 2 }} />
          <div>
            <p className="flex items-center gap-1 text-gray-500 font-semibold my-2">
              Thông tin bệnh nhân
            </p>
            <div className="grid grid-cols-2 gap-5 w-full py-2">
              <div>
                <p className="text-xs uppercase text-gray-500">Họ và tên</p>
                <p className="text-sm font-semibold text-gray-800">
                  {reservation?.health_profile.name}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-500">Ngày sinh</p>
                <p className="text-sm font-semibold text-gray-800">
                  {formatDateTime(reservation?.health_profile.date_of_birth, "vi", "long")}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-500">Giới tính</p>
                <p className="text-sm font-semibold text-gray-800">
                  {reservation?.health_profile.gender}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-500">Số điện thoại</p>
                <p className="text-sm font-semibold text-gray-800">
                  0123 345 539
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-gray-500">Email</p>
                <p className="text-sm font-semibold text-gray-800">
                  example@example.com
                </p>
              </div>
            </div>
          </div>
          <Divider />
          {reservation?.attachments && reservation.attachments.length > 0 && (
            <div className="mt-4">
              <p className="flex items-center gap-1 text-gray-500 font-semibold my-2">
                <AttachFileIcon fontSize="small" />
                Tài liệu đính kèm
              </p>
              <div className="grid grid-cols-1 gap-2">
                {reservation.attachments.map((file, index) => (
                  <a
                    key={index}
                    href={file.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <Chip
                      icon={getFileIcon(file.file_type)}
                      label={`${file.file_name} (${formatFileSize(
                        file.file_size
                      )})`}
                      variant="outlined"
                      className="w-full justify-start"
                      sx={{
                        "& .MuiChip-label": {
                          whiteSpace: "normal",
                          textAlign: "left",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        },
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
          {user.role !== "3" && (
            <div className="min-h-30">
              <p className="flex items-center gap-1 text-gray-500 font-semibold my-2">
                Bác sĩ phụ trách
              </p>
              {reservation?.status == "pending" && (
                <Select
                  labelId="doctor-select-label"
                  value={selectedDoctor}
                  variant="standard"
                  fullWidth
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  label="Chọn bác sĩ"
                  displayEmpty
                >
                  <MenuItem value={null}>
                    <em>None</em>
                  </MenuItem>
                  {doctor.map((doc) => (
                    <MenuItem
                      key={doc.id}
                      value={doc.id}
                      sx={{
                        fontWeight: doc.recommend ? "bold" : "normal",
                        "&:hover": {
                          backgroundColor: doc.recommend
                            ? "rgba(25, 118, 210, 0.08)"
                            : "inherit",
                        },
                      }}
                    >
                      BS. {doc.name}
                      {doc.recommend && (
                        <span
                          style={{
                            marginLeft: "8px",
                            color: "#1976d2",
                            fontSize: "0.75rem",
                          }}
                        >
                          (Đề xuất)
                        </span>
                      )}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {selectedDoctor && (
                <div className="flex items-center gap-2 mt-4 p-2">
                  <Avatar
                    src={
                      doctor.find((doc) => doc.id === selectedDoctor)?.avatar
                    }
                    sx={{ width: 56, height: 56 }}
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {doctor.find((doc) => doc.id === selectedDoctor)?.name}
                    </p>
                    <p className="text-sm font-semibold">
                      {
                        doctor.find((doc) => doc.id === selectedDoctor)
                          ?.position
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      Chuyên khoa:{" "}
                      {
                        doctor.find((doc) => doc.id === selectedDoctor)
                          ?.specialization
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: "16px" }}>
          {user.role !== "3" && reservation?.status === "pending" && (
            <>
              <Button
                variant="outlined"
                color="error"
                onClick={handleReject}
                disabled={isRejecting || isAssigning}
              >
                Từ chối
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                disabled={
                  selectedDoctor == reservation?.doctor?.id ||
                  isRejecting ||
                  isAssigning
                }
              >
                {isAssigning ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </>
          )}
          {user.role === "3" && reservation?.status === "assigned" && (
            <Button color="primary" fullWidth onClick={handleToggleResult}>
              Thêm kết quả khám
            </Button>
          )}
          {reservation?.status === "completed" && (
            <Button
              color="primary"
              fullWidth
              component={Link}
              to={`/${user.role == 4 ? "facility" : "doctor"}/patients/${
                reservation?.health_profile.id
              }?appointmentId=${reservation?.id}&tab=1`}
            >
              Xem kết quả khám
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={rejectDialogOpen}
        onClose={handleCloseRejectDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Bạn có chắc muốn từ chối đơn khám của bệnh nhân không ?
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Lý do từ chối"
            fullWidth
            multiline
            rows={4}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            variant="outlined"
            disabled={isRejecting}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseRejectDialog}
            color="primary"
            disabled={isRejecting}
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmReject}
            color="error"
            variant="contained"
            disabled={!rejectReason.trim() || isRejecting}
          >
            {isRejecting ? "Đang từ chối..." : "Xác nhận từ chối"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ReservationPopUp.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    health_profile: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      date_of_birth: PropTypes.string,
      gender: PropTypes.string,
    }),
    medical_service: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
    doctor: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    date: PropTypes.string,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    status: PropTypes.string,
    reason: PropTypes.string,
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        file_name: PropTypes.string,
        file_path: PropTypes.string,
        file_type: PropTypes.string,
        file_size: PropTypes.number,
        file_extension: PropTypes.string,
      })
    ),
  }),
  openResult: PropTypes.bool,
  handleOpenResult: PropTypes.func,
  onRefresh: PropTypes.func.isRequired,
};

export default ReservationPopUp;
