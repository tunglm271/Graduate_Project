import {
  Breadcrumbs,
  Typography,
  Divider,
  Avatar,
  Button,
  Box,
  Tabs,
  Tab,
  Skeleton,
  List,
  ListItem,
  ListItemText,
  Chip,
  Drawer,
  CircularProgress,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import healthProfileApi from "../../../service/healthProfileApi";
import { useTranslation } from "react-i18next";
import medicalRecordApi from "../../../service/medicalRecordApi";

const PatientDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [medicalRecord, setMedicalRecord] = useState({});
  const [medicalRecordLoading, setMedicalRecordLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    healthProfileApi
      .getById(id)
      .then((response) => {
        console.log(response.data);
        setPatient(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  }, [id]);

  useEffect(() => {
    if (selectedAppointment) {
      setMedicalRecordLoading(true);
      medicalRecordApi
        .getById(selectedAppointment?.medical_record.id)
        .then((response) => {
          console.log(response.data);
          setMedicalRecord(response.data);
          setMedicalRecordLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching medical record:", error);
          setMedicalRecordLoading(false);
        });
    } else {
      setMedicalRecord(null);
    }
  }, [selectedAppointment]);

  useEffect(() => {
    if (appointmentId && patient.appointments) {
      const appointment = patient.appointments.find(
        (app) => app.id === parseInt(appointmentId)
      );
      if (appointment) {
        setTab(1);
        setSelectedAppointment(appointment);
      }
    }
  }, [appointmentId, patient.appointments]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div>
      <div
        className="flex items-center justify-between"
        style={{ padding: "1rem 1.5rem" }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="hover:underline" to="/doctor/patients">
            Danh sách bệnh nhân
          </Link>
          <Typography color="text.primary">Chi tiết bệnh nhân</Typography>
        </Breadcrumbs>
      </div>
      <Divider />
      <div>
        <div
          className="flex items-center justify-between"
          style={{ padding: "1rem 1.5rem" }}
        >
          <div className="flex gap-2 items-center">
            <Avatar
              alt={patient.name}
              src={patient.avatar}
              sx={{ width: 56, height: 56 }}
            />
            {loading ? (
              <Skeleton
                variant="text"
                width={200}
                height={30}
                sx={{ fontSize: "1rem" }}
              />
            ) : (
              <p className="font-bold text-xl">{patient.name}</p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <Link
              className="rounded bg-[#007bff] text-white px-4 py-2 hover:bg-[#0056b3]"
              to={`/doctor/service-assignment?patientId=${id}`}
            >
              Thêm lịch hẹn
            </Link>
            <Button variant="outlined" color="primary" sx={{ paddingX: 0 }}>
              <MoreVertIcon />
            </Button>
          </div>
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={(event, value) => setTab(value)}
          aria-label="basic tabs example"
        >
          <Tab label="Thông tin bệnh nhân" />
          <Tab label="Lịch sử khám bệnh" />
        </Tabs>
      </Box>
      <div className="p-4 mt-2">
        {tab === 0 && (
          <div>
            <p className="uppercase text-lg font-semibold border-l-2 border-gray-500 pl-3">
              Thông tin cơ bản
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-gray-500 text-sm">
                Họ và tên
                <p className="text-black text-base">
                  {loading ? <Skeleton /> : patient.name}
                </p>
              </div>
              <div className="text-gray-500 text-sm">
                Ngày sinh
                <p className="text-black text-base">
                  {loading ? <Skeleton /> : formatDate(patient.date_of_birth)}
                </p>
              </div>
              <div className="text-gray-500 text-sm">
                Giới tính
                <p className="text-black text-base">
                  {loading ? <Skeleton /> : t(patient.gender)}
                </p>
              </div>
              <div className="text-gray-500 text-sm">
                Số điện thoại
                <p className="text-black text-base">
                  {loading ? <Skeleton /> : patient.phone}
                </p>
              </div>
              <div className="text-gray-500 text-sm">
                Email
                <p className="text-black text-base">
                  {loading ? <Skeleton /> : patient.email}
                </p>
              </div>
              <div className="text-gray-500 text-sm">
                Số BHYT
                <p className="text-black text-base">
                  {loading ? (
                    <Skeleton />
                  ) : (
                    patient.healthInsuranceNumber || "Không có"
                  )}
                </p>
              </div>
            </div>

            <p className="uppercase text-lg font-semibold border-l-2 border-gray-500 pl-3 mt-6">
              Thông tin sức khỏe
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-gray-500 text-sm">
                Chiều cao
                <p className="text-black text-base">
                  {loading ? <Skeleton /> : `${patient.height} cm`}
                </p>
              </div>
              <div className="text-gray-500 text-sm">
                Cân nặng
                <p className="text-black text-base">
                  {loading ? <Skeleton /> : `${patient.weight} kg`}
                </p>
              </div>
            </div>

            <p className="uppercase text-lg font-semibold border-l-2 border-gray-500 pl-3 mt-6">
              Dị ứng
            </p>
            <div className="mt-4">
              {loading ? (
                <Skeleton variant="rectangular" height={60} />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {patient.allergies && patient.allergies.length > 0 ? (
                    patient.allergies.map((allergy, index) => (
                      <Chip
                        key={index}
                        label={allergy.name}
                        color="warning"
                        variant="outlined"
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">Không có thông tin dị ứng</p>
                  )}
                </div>
              )}
            </div>

            <p className="uppercase text-lg font-semibold border-l-2 border-gray-500 pl-3 mt-6">
              Bệnh mãn tính
            </p>
            <div className="mt-4">
              {loading ? (
                <Skeleton variant="rectangular" height={60} />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {patient.chronicDiseases &&
                  patient.chronicDiseases.length > 0 ? (
                    patient.chronicDiseases.map((disease, index) => (
                      <Chip
                        key={index}
                        label={disease.name}
                        color="error"
                        variant="outlined"
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">
                      Không có thông tin bệnh mãn tính
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {tab === 1 && (
          <div>
            <p className="uppercase text-lg font-semibold border-l-2 border-gray-500 pl-3">
              Lịch sử khám bệnh
            </p>
            {loading ? (
              <div className="mt-4">
                <Skeleton variant="rectangular" height={100} />
                <Skeleton variant="rectangular" height={100} className="mt-4" />
              </div>
            ) : patient.appointments && patient.appointments.length > 0 ? (
              <List className="mt-4">
                {patient.appointments.map((appointment) => (
                  <ListItem
                    key={appointment.id}
                    className="border rounded-lg mb-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <ListItemText
                      primary={
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">
                            {appointment.medical_service.name}
                          </span>
                          <Chip
                            label={
                              appointment.status === "completed"
                                ? "Đã hoàn thành"
                                : appointment.status === "cancelled"
                                ? "Đã hủy"
                                : "Đang chờ"
                            }
                            color={
                              appointment.status === "completed"
                                ? "success"
                                : appointment.status === "cancelled"
                                ? "error"
                                : "warning"
                            }
                            size="small"
                          />
                        </div>
                      }
                      secondary={
                        <div className="mt-2">
                          <p>Ngày khám: {formatDate(appointment.date)}</p>
                          <p>
                            Giờ khám:{" "}
                            {`${appointment.start_time} - ${appointment.end_time}`}
                          </p>
                          {appointment.doctor && (
                            <p>
                              Bác sĩ phụ trách: {appointment.doctor.name} -{" "}
                              {appointment.medical_facility.facility_name}
                            </p>
                          )}
                        </div>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <p className="text-gray-500 mt-4">Chưa có lịch sử khám bệnh</p>
            )}
          </div>
        )}
      </div>
      <Drawer
        open={Boolean(selectedAppointment)}
        onClose={() => setSelectedAppointment(null)}
        anchor="bottom"
        PaperProps={{
          sx: { height: "80vh" },
        }}
      >
        {selectedAppointment && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Thông tin lịch hẹn</h3>
              <Button onClick={() => setSelectedAppointment(null)}>Đóng</Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-500">Ngày khám</p>
                <p className="font-medium">
                  {formatDate(selectedAppointment.date)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Giờ khám</p>
                <p className="font-medium">{`${selectedAppointment.start_time} - ${selectedAppointment.end_time}`}</p>
              </div>
              <div>
                <p className="text-gray-500">Bác sĩ</p>
                <p className="font-medium">{selectedAppointment.doctor.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Trạng thái</p>
                <p className="font-medium">
                  {selectedAppointment.status === "completed"
                    ? "Đã hoàn thành"
                    : selectedAppointment.status === "cancelled"
                    ? "Đã hủy"
                    : "Đang chờ"}
                </p>
              </div>
            </div>

            {medicalRecordLoading ? (
              <div className="flex justify-center items-center h-40">
                <CircularProgress />
              </div>
            ) : medicalRecord ? (
              <div className="space-y-6">
                {/* Diagnosis Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">Chuẩn đoán</h4>
                  <p className="text-gray-700">{medicalRecord.diagnosis}</p>
                </div>

                {/* Examinations Section */}
                {medicalRecord.examinations &&
                  medicalRecord.examinations.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        Kết quả xét nghiệm
                      </h4>
                      {medicalRecord.examinations.map((examination, index) => (
                        <div key={index} className="mb-4">
                          <h5 className="font-medium mb-2">
                            {examination.test_name}
                          </h5>

                          {/* Metrics Results */}
                          {examination.examination_type === "metrics" &&
                            examination.indicators && (
                              <div className="overflow-x-auto">
                                <table className="min-w-full border">
                                  <thead>
                                    <tr className="bg-gray-50">
                                      <th className="px-4 py-2 border">
                                        Chỉ số
                                      </th>
                                      <th className="px-4 py-2 border">
                                        Giá trị
                                      </th>
                                      <th className="px-4 py-2 border">
                                        Đánh giá
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {examination.indicators.map(
                                      (indicator, idx) => (
                                        <tr key={idx}>
                                          <td className="px-4 py-2 border">
                                            {indicator.indicator_type.name}
                                          </td>
                                          <td className="px-4 py-2 border">
                                            {indicator.value}{" "}
                                            {indicator.indicator_type.unit}
                                          </td>
                                          <td className="px-4 py-2 border">
                                            <Chip
                                              label={
                                                indicator.evaluation ===
                                                "normal"
                                                  ? "Bình thường"
                                                  : indicator.evaluation ===
                                                    "Needs monitoring"
                                                  ? "Cần theo dõi"
                                                  : "Bất thường"
                                              }
                                              color={
                                                indicator.evaluation ===
                                                "normal"
                                                  ? "success"
                                                  : indicator.evaluation ===
                                                    "Needs monitoring"
                                                  ? "warning"
                                                  : "error"
                                              }
                                              size="small"
                                            />
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}

                          {/* Image Results */}
                          {examination.examination_type === "images" &&
                            examination.images && (
                              <div className="grid grid-cols-2 gap-4">
                                {examination.images.map((image, idx) => (
                                  <div key={idx} className="border rounded p-2">
                                    <img
                                      src={image.url}
                                      alt={`Examination image ${idx + 1}`}
                                      className="w-full h-48 object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                          {examination.conclusion && (
                            <p className="mt-2 text-gray-600 italic">
                              {examination.conclusion}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                {/* Prescription Section */}
                {medicalRecord.prescription &&
                  medicalRecord.prescription.medicines && (
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Đơn thuốc</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 border">Thuốc</th>
                              <th className="px-4 py-2 border">Đơn vị</th>
                              <th className="px-4 py-2 border">Số lượng</th>
                              <th className="px-4 py-2 border">Cách dùng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {medicalRecord.prescription.medicines.map(
                              (medicine, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-2 border">
                                    {medicine.name || ""}
                                  </td>
                                  <td className="px-4 py-2 border">
                                    {medicine.unit || ""}
                                  </td>
                                  <td className="px-4 py-2 border">
                                    {medicine.pivot?.amount || ""}
                                  </td>
                                  <td className="px-4 py-2 border">
                                    {medicine.pivot?.usage || ""}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Chưa có thông tin kết quả khám bệnh
              </p>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default PatientDetail;
