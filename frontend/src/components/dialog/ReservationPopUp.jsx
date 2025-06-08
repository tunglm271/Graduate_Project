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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddResultDrawer from "../AddResultDrawer";
import { useEffect, useState } from "react";
import medicalServiceApi from "../../service/medicalServiceAPi";
import appointmentApi from "../../service/appointmentApi";
import { getUser } from "../../utlis/auth";
import { Link } from "react-router-dom";
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const ReservationPopUp = ({
  open,
  onClose,
  reservation,
  openResult,
  handleOpenResult,
}) => {
  const user = getUser();
  const [doctor, setDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [position, setPosition] = useState("50%");
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleReject = () => {
    setRejectDialogOpen(true);
  };

  const handleConfirmReject = () => {
    appointmentApi
      .rejectAppointment(reservation?.id, rejectReason)
      .then((res) => {
        console.log(res.data);
        setRejectDialogOpen(false);
        onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseRejectDialog = () => {
    setRejectDialogOpen(false);
    setRejectReason("");
  };

  const handleUpdate = () => {
    appointmentApi
      .assignDoctor(reservation?.id, selectedDoctor)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    onClose();
  };

  useEffect(() => {
    if (reservation) {
      console.log(reservation);
      medicalServiceApi
        .getDoctor(reservation?.medical_service.id, reservation?.id)
        .then((res) => {
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
            <Avatar sx={{ width: 56, height: 56, bgcolor: getRandomColor() }}>
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
                  {new Date(reservation?.date).toLocaleDateString("vi-VN")}
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
                  {reservation?.health_profile.date_of_birth}
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
          {user.role !== "3" && (
            <div className="min-h-44">
              <p className="flex items-center gap-1 text-gray-500 font-semibold my-2">
                Bác sĩ phụ trách
              </p>
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
                  <MenuItem key={doc.id} value={doc.id}>
                    BS. {doc.name}
                  </MenuItem>
                ))}
              </Select>
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
              <Button variant="outlined" color="error" onClick={handleReject}>
                Từ chối
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                disabled={selectedDoctor == reservation?.doctor?.id}
              >
                Cập nhật
              </Button>
            </>
          )}
          {user.role === "3" && reservation?.status === "assigned" && (
            <Button color="primary" fullWidth onClick={handleToggleResult}>
              Thêm kết quả khám
            </Button>
          )}
          {user.role === "3" && reservation?.status === "completed" && (
            <Button
              color="primary"
              fullWidth
              component={Link}
              to={`/doctor/patients/${reservation?.health_profile.id}?appointmentId=${reservation?.id}&tab=1`}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog} color="primary">
            Hủy
          </Button>
          <Button
            onClick={handleConfirmReject}
            color="error"
            variant="contained"
            disabled={!rejectReason.trim()}
          >
            Xác nhận từ chối
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservationPopUp;
