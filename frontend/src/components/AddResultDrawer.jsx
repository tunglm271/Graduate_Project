import {
  Drawer,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Slide,
  Autocomplete,
  Typography,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import FileUploader from "./FileUploader";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getIndicatorTypes, getMedicines } from "../hooks/useCachedData";
import appointmentApi from "../service/appointmentApi";
import useCustomSnackbar from "../hooks/useCustomSnackbar";
import DownloadIcon from "@mui/icons-material/Download";
import { ChartBarDecreasing } from "lucide-react";
import * as XLSX from "xlsx";

const AddResultDrawer = ({ open, onClose, appointmentId, onSuccess }) => {
  // State management
  const [toggleNumerialResult, setToggleNumerialResult] = useState(false);
  const { showErrorSnackbar, showSuccessSnackbar } = useCustomSnackbar();
  const [numerialResults, setNumerialResults] = useState([]);
  const [toggleImageResult, setToggleImageResult] = useState(false);
  const [togglePrescription, setTogglePrescription] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [toggleSchedule, setToggleSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleReason, setScheduleReason] = useState("");
  const [postedFiles, setPostedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [treatmentPlan, setTreatmentPlan] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");
  const [indicatorTestSummary, setIndicatorTestSummary] = useState("");
  const [imageTestSummary, setImageTestSummary] = useState("");
  const { data: indicatorTypes = [] } = getIndicatorTypes();
  const { data: medicinesData = [] } = getMedicines();
  const [openNumerialUploadDialog, setOpenNumerialUploadDialog] =
    useState(false);

  // Event handlers
  const handleAddNumerialResult = () => {
    setToggleNumerialResult(true);
    setNumerialResults([{ indicator_type_id: "", value: "", evaluation: "" }]);
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    setPostedFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      examinationName: "",
    }));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  // Add handler for examination name changes
  const handleExaminationNameChange = (index, value) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews[index].examinationName = value;
    setPreviewImages(updatedPreviews);
  };

  // Handlers for medicine state changes
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][field] = value;
    setMedicines(updatedMedicines);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { id: "", usage: "", amount: "" }]);
  };

  const handleRemoveMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleTogglePrescription = () => {
    setTogglePrescription(!togglePrescription);
    if (!togglePrescription) {
      setMedicines([{ id: "", usage: "", amount: "" }]);
    }
  };

  const handleToggleSchedule = () => {
    setToggleSchedule(!toggleSchedule);
    if (!toggleSchedule) {
      setScheduleDate("");
      setScheduleTime("");
      setScheduleReason("");
    }
  };

  const handleSubmit = () => {
    if (isSubmitting) return; // Prevent multiple submissions

    if (!result.trim()) {
      showErrorSnackbar("Vui lòng nhập kết quả khám bệnh.");
      return;
    }

    // Validate examination names if images are uploaded
    if (
      toggleImageResult &&
      previewImages.some((img) => !img.examinationName.trim())
    ) {
      showErrorSnackbar("Vui lòng nhập tên xét nghiệm cho tất cả hình ảnh.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("diagnosis", result);
    formData.append("medicines", JSON.stringify(medicines));

    if (toggleNumerialResult) {
      formData.append("indicatorTestSummary", indicatorTestSummary);
      formData.append("indicators", JSON.stringify(numerialResults));
    }

    if (toggleImageResult && postedFiles.length > 0) {
      postedFiles.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
        formData.append(
          `examinationNames[${index}]`,
          previewImages[index].examinationName
        );
      });
      formData.append("imageTestSummary", imageTestSummary);
    }

    if (toggleSchedule) {
      console.log(scheduleDate, scheduleTime, scheduleReason);
      formData.append("follow_up_date", scheduleDate);
      formData.append("follow_up_start_time", scheduleTime);
      formData.append("follow_up_reason", scheduleReason);
    }

    appointmentApi
      .addResult(appointmentId, formData)
      .then(() => {
        showSuccessSnackbar("Thêm kết quả thành công!");
        onSuccess?.();
        onClose();
      })
      .catch((error) => {
        console.error("Error adding result:", error);
        showErrorSnackbar(
          error.response?.data?.message ||
            "Đã xảy ra lỗi khi thêm kết quả. Vui lòng thử lại."
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Handlers for numerical results
  const handleNumerialResultChange = (index, field, value) => {
    const updatedResults = [...numerialResults];
    updatedResults[index][field] = value;
    setNumerialResults(updatedResults);
  };

  const handleAddNumerialResultItem = () => {
    setNumerialResults([
      ...numerialResults,
      { indicator_type_id: "", value: "", evaluation: "" },
    ]);
  };

  // Get current date in YYYY-MM-DD format for default date input value
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleNumerialUploadFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // Bỏ qua dòng tiêu đề nếu có, lấy từ dòng 2 trở đi
        const rows = jsonData.slice(1);
        const results = rows
          .map((row) => ({
            indicator_type_id: row[0] || "",
            value: row[1] || "",
            evaluation: row[2] || "",
          }))
          .filter((item) => item.indicator_type_id && item.value);
        if (results.length === 0) {
          showErrorSnackbar("File không có dữ liệu hợp lệ.");
        } else {
          setNumerialResults(results);
        }
      };
      reader.readAsBinaryString(file);
      setOpenNumerialUploadDialog(false);
      showSuccessSnackbar("Tải lên kết quả chỉ số thành công!");
    } else {
      showErrorSnackbar("Chỉ chấp nhận file .xlsx");
    }
  };

  const handleDownloadTemplate = () => {
    // Replace with your actual template file path or download logic
    const link = document.createElement("a");
    link.href = "/templates/numerial_result_template.xlsx";
    link.download = "numerial_result_template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render treatment plan section
  const renderTreatmentPlan = () => (
    <div>
      <div className="flex mb-4 items-center">
        <IconButton
          onClick={() => setTreatmentPlan(false)}
          disabled={isSubmitting}
        >
          <KeyboardReturnIcon />
        </IconButton>
        <p className="font-bold">Kế hoạch điều trị</p>
      </div>

      {togglePrescription ? (
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex justify-between items-center">
            <p className="font-bold">Đơn thuốc</p>
            <Button
              variant="outlined"
              color="error"
              onClick={handleTogglePrescription}
              disabled={isSubmitting}
            >
              Xóa
            </Button>
          </div>

          {medicines.map((medicine, index) => (
            <div
              key={index}
              className="flex gap-5 justify-between items-center mb-1"
            >
              <div style={{ width: "60%" }}>
                <Autocomplete
                  options={medicinesData}
                  getOptionLabel={(option) => option.name || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  getOptionKey={(option) => `medicine-${option.id}`} // Add this line
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tên thuốc"
                      variant="standard"
                      required
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      {...props}
                      display="flex"
                      width="100%"
                      gap={1}
                    >
                      <Typography sx={{ fontSize: 14 }}>
                        {option.name}
                      </Typography>
                      <Typography sx={{ fontSize: 10, color: "gray" }}>
                        {option.description}
                      </Typography>
                    </Box>
                  )}
                  fullWidth
                  value={
                    medicinesData?.find(
                      (option) => option.id === medicine.id
                    ) || null
                  }
                  onChange={(e, newValue) =>
                    handleMedicineChange(index, "id", newValue?.id || "")
                  }
                  slotProps={{
                    popper: {
                      sx: {
                        zIndex: 99999,
                      },
                    },
                  }}
                />
                <TextField
                  id={`usage-${index}`}
                  label="Chỉ định"
                  variant="standard"
                  fullWidth
                  rows={2}
                  required
                  value={medicine.usage}
                  onChange={(e) =>
                    handleMedicineChange(index, "usage", e.target.value)
                  }
                />
              </div>
              <TextField
                id={`amount-${index}`}
                label="Liều lượng"
                variant="standard"
                type="number"
                required
                value={medicine.amount}
                onChange={(e) =>
                  handleMedicineChange(index, "amount", e.target.value)
                }
              />
              <IconButton
                sx={{ p: 1, mt: 2 }}
                color="error"
                onClick={() => handleRemoveMedicine(index)}
                disabled={isSubmitting}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          ))}

          <Button
            color="primary"
            onClick={handleAddMedicine}
            startIcon={<AddIcon />}
          >
            Thêm thuốc
          </Button>
        </div>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 2, p: 2 }}
          onClick={handleTogglePrescription}
        >
          Tạo Đơn thuốc
        </Button>
      )}

      {toggleSchedule ? (
        <div className="flex flex-col gap-2 mb-2">
          <div className="flex justify-between items-center">
            <p className="font-bold">Lịch tái khám</p>
            <Button
              variant="outlined"
              color="error"
              onClick={handleToggleSchedule}
              disabled={isSubmitting}
            >
              Xóa
            </Button>
          </div>

          <div className="flex flex-col gap-3 bg-slate-50 border-gray-400 rounded border-[1px] p-3 mt-2">
            <div className="flex gap-4 mb-2">
              <TextField
                id="schedule-date"
                label="Ngày tái khám"
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
              <TextField
                id="schedule-time"
                label="Giờ tái khám"
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </div>

            <TextField
              id="schedule-reason"
              label="Lý do tái khám"
              variant="outlined"
              placeholder="Nhập lý do tái khám"
              value={scheduleReason}
              onChange={(e) => setScheduleReason(e.target.value)}
              required
              multiline
              rows={4}
              fullWidth
            />
          </div>
        </div>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 2, p: 2 }}
          onClick={handleToggleSchedule}
        >
          Tạo Lịch tái khám
        </Button>
      )}
    </div>
  );

  // Render examination results section
  const renderExaminationResults = () => (
    <div className="h-full p-2">
      <p className="font-bold mb-2">Kết quả xét nghiệm</p>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-2">
          {toggleNumerialResult ? (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold">Xét nghiệm chỉ số</p>
                <div className="flex gap-2 items-center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setOpenNumerialUploadDialog(true)}
                  >
                    Upload
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setToggleNumerialResult(false)}
                    disabled={isSubmitting}
                  >
                    Xóa
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 bg-slate-50 border-gray-400 rounded border-[1px] p-3">
                {numerialResults.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-5 justify-between items-center"
                  >
                    <Autocomplete
                      options={indicatorTypes}
                      getOptionLabel={(option) => option.name || ""}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      getOptionKey={(option) => `indicator-${option.id}`}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tên chỉ số"
                          variant="standard"
                          required
                        />
                      )}
                      renderOption={(props, option) => {
                        const { key, ...otherProps } = props;
                        return (
                          <Box
                            component="li"
                            key={`indicator-${option.id}`}
                            {...otherProps}
                            display="flex"
                            width="100%"
                          >
                            <Typography sx={{ fontSize: 14 }}>
                              {option.name}
                            </Typography>
                            <Typography sx={{ fontSize: 10, color: "gray" }}>
                              {option.unit}
                            </Typography>
                          </Box>
                        );
                      }}
                      fullWidth
                      value={
                        indicatorTypes?.find(
                          (option) => option.id === item.indicator_type_id
                        ) || null
                      }
                      onChange={(e, newValue) =>
                        handleNumerialResultChange(
                          index,
                          "indicator_type_id",
                          newValue?.id || ""
                        )
                      }
                      slotProps={{
                        popper: {
                          sx: {
                            zIndex: 99999,
                          },
                        },
                      }}
                    />
                    <TextField
                      id={`numerial-value-${index}`}
                      label="Giá trị"
                      variant="standard"
                      required
                      value={item.value}
                      onChange={(e) =>
                        handleNumerialResultChange(
                          index,
                          "value",
                          e.target.value
                        )
                      }
                    />
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120, fontSize: 12 }}
                    >
                      <InputLabel>Đánh giá</InputLabel>
                      <Select
                        value={item.evaluation}
                        onChange={(e) =>
                          handleNumerialResultChange(
                            index,
                            "evaluation",
                            e.target.value
                          )
                        }
                        label="Đánh giá"
                        MenuProps={{
                          style: { zIndex: 35001 },
                        }}
                      >
                        <MenuItem value="normal">Bình thường</MenuItem>
                        <MenuItem
                          value="Needs monitoring"
                          sx={{ color: "orange" }}
                        >
                          Cần theo dõi
                        </MenuItem>
                        <MenuItem value="abnormal" sx={{ color: "red" }}>
                          Bất bình thường
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <IconButton
                      sx={{ p: 1, mt: 2 }}
                      color="error"
                      onClick={() =>
                        setNumerialResults(
                          numerialResults.filter((_, i) => i !== index)
                        )
                      }
                      disabled={isSubmitting}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                ))}

                <Button
                  color="primary"
                  onClick={handleAddNumerialResultItem}
                  startIcon={<AddIcon />}
                >
                  Thêm chỉ số
                </Button>
              </div>

              <div>
                <TextField
                  id="numerial-result-evaluation"
                  label="Đánh giá tổng quát"
                  variant="outlined"
                  placeholder="Nhập đánh giá tổng quát"
                  value={indicatorTestSummary}
                  onChange={(e) =>
                    setIndicatorTestSummary(e.target.value)
                  }
                  required
                  multiline
                  rows={2}
                  fullWidth
                />
              </div>
              <Divider />
            </div>
          ) : (
            <Button variant="outlined" onClick={handleAddNumerialResult}>
              Thêm xét nghiệm chỉ số
            </Button>
          )}

          {toggleImageResult ? (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="font-bold">Xét nghiệm hình ảnh</p>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setToggleImageResult(false)}
                  disabled={isSubmitting}
                >
                  Xóa
                </Button>
              </div>

              <FileUploader text="Tải lên hình ảnh" onChange={handleAddImage} />
              {previewImages.length > 0 && (
                <div className="flex flex-col gap-4 my-5">
                  {previewImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-2 justify-center items-center w-3/4 mx-auto"
                    >
                      <TextField
                        label="Tên xét nghiệm"
                        variant="outlined"
                        fullWidth
                        required
                        value={image.examinationName}
                        onChange={(e) =>
                          handleExaminationNameChange(index, e.target.value)
                        }
                        placeholder="Nhập tên xét nghiệm"
                        size="small"
                      />
                      <div className="w-full h-auto">
                        <img
                          src={image.url}
                          alt="preview"
                          className="w-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <TextField
                id="image-result-evaluation"
                label="Đánh giá hình ảnh"
                variant="outlined"
                placeholder="Nhập đánh giá hình ảnh"
                required
                multiline
                rows={2}
                fullWidth
                sx={{ mt: 2 }}
              />
              <Divider />
            </div>
          ) : (
            <Button
              variant="outlined"
              onClick={() => setToggleImageResult(true)}
            >
              Thêm xét nghiệm hình ảnh
            </Button>
          )}

          <p className="font-bold">Chẩn đoán</p>
          <TextField
            id="result"
            label="Kết quả khám"
            variant="outlined"
            placeholder="Nhập kết quả khám"
            required
            multiline
            rows={4}
            fullWidth
            value={result}
            onChange={(e) => setResult(e.target.value)}
          />
        </div>

        <Button
          variant="outlined"
          color="success"
          sx={{ borderStyle: "dashed", mt: "auto" }}
          startIcon={<AddIcon />}
          onClick={() => setTreatmentPlan(true)}
          disabled={isSubmitting}
        >
          Kế hoạch điều trị
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? (
              <CircularProgress
                size={20}
                color="inherit"
                sx={{
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
            ) : null
          }
          sx={{
            position: "relative",
            "&.Mui-disabled": {
              backgroundColor: "primary.main",
              opacity: 0.7,
            },
          }}
        >
          {isSubmitting ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>Đang xử lý</span>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <span>.</span>
                <span style={{ animationDelay: "0.2s" }}>.</span>
                <span style={{ animationDelay: "0.4s" }}>.</span>
              </Box>
            </Box>
          ) : (
            "Thêm kết quả"
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "900px",
          padding: "20px",
        },
        zIndex: 1399,
        overflowX: "hidden",
      }}
    >
      <Slide
        key={treatmentPlan ? "treatment-plan" : "result"}
        direction={treatmentPlan ? "left" : "right"}
        appear={true}
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={400}
      >
        {treatmentPlan ? renderTreatmentPlan() : renderExaminationResults()}
      </Slide>
      <Dialog
        open={openNumerialUploadDialog}
        onClose={() => setOpenNumerialUploadDialog(false)}
        maxWidth="xs"
        fullWidth
        sx={{
          zIndex: 1401,
        }}
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            Tải lên kết quả chỉ số
            <p
              className="text-sm flex items-center text-blue-500 hover:underline cursor-pointer"
              onClick={handleDownloadTemplate}
            >
              <DownloadIcon fontSize="14px" />
              Tải template
            </p>
          </div>
        </DialogTitle>
        <DialogContent>
          <FileUploader
            icon={<ChartBarDecreasing />}
            text={"Chọn file chỉ số xét nghiệm (.xlsx)"}
            onChange={handleNumerialUploadFileChange}
            accept=".xlsx, .xls"
            multiple={false}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenNumerialUploadDialog(false)}
            color="secondary"
          >
            Đóng
          </Button>
          {/* Add upload logic here if needed */}
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default AddResultDrawer;
