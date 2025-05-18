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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import FileUploader from "./FileUploader";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getIndicatorTypes, getMedicines } from "../hooks/useCachedData";
import appointmentApi from "../service/appointmentApi";
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const AddResultDrawer = ({ open, onClose, appointmentId }) => {
  // State management
  const [toggleNumerialResult, setToggleNumerialResult] = useState(false);
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
    }));
    setPreviewImages((prev) => [...prev, ...previews]);
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
    if (!result.trim()) {
      alert("Vui lòng nhập kết quả khám bệnh.");
      return;
    }

    console.log(JSON.stringify(numerialResults));
    console.log(JSON.stringify(medicines));
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
      });
      formData.append("imageTestSummary", imageTestSummary);
    }

    appointmentApi
      .addResult(appointmentId, formData)
      .then((res) => {
        alert("Thêm kết quả thành công!");
        console.log(res.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error adding result:", error);
        alert("Có lỗi xảy ra khi thêm kết quả.");
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

  // Render treatment plan section
  const renderTreatmentPlan = () => (
    <div>
      <div className="flex mb-4 items-center">
        <IconButton onClick={() => setTreatmentPlan(false)}>
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
              <div className="flex justify-between items-center">
                <p className="font-bold">Xét nghiệm chỉ số</p>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setToggleNumerialResult(false)}
                >
                  Xóa
                </Button>
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
                >
                  Xóa
                </Button>
              </div>

              <FileUploader text="Tải lên hình ảnh" onChange={handleAddImage} />

              {previewImages.length > 0 && (
                <Slider {...sliderSettings}>
                  {previewImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center h-80"
                    >
                      <img
                        src={image.url}
                        alt="preview"
                        className="w-full object-contain"
                      />
                    </div>
                  ))}
                </Slider>
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

          <p className="font-bold">Chuẩn đoán</p>
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
        >
          Kế hoạch điều trị
        </Button>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Thêm kết quả
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
          width: "700px",
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
    </Drawer>
  );
};

export default AddResultDrawer;
