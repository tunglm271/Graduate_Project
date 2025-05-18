import {
  Breadcrumbs,
  Typography,
  Stack,
  IconButton,
  Divider,
  Switch,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import medicalServiceApi from "../../service/medicalServiceAPi";
import MultiSelectAutocomplete from "../../components/MultiSelectAutocomplete";
import doctorApi from "../../service/Doctorapi";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";

const categorys = [
  { value: "General Check-up", label: "Khám tổng quát" },
  { value: "Specialist Consultation", label: "Khám chuyên khoa" },
  { value: "Laboratory Tests", label: "Xét nghiệm" },
  { value: "Medical Treatment", label: "Điều trị y tế" },
  {
    value: "Vaccination & Preventive Care",
    label: "Tiêm chủng & Chăm sóc dự phòng",
  },
  { value: "Home Healthcare Services", label: "Dịch vụ chăm sóc tại nhà" },
  { value: "Health Consultation", label: "Tư vấn sức khỏe" },
];

const ServiceCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id; // Nếu có id thì là edit mode
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [toggleGenderRequirement, setToggleGenderRequirement] = useState(false);
  const [toggleAgeRequirement, setToggleAgeRequirement] = useState(false);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    thumbnail: null,
    duration: "",
    gender_requirement: "",
    min_age_requirement: "",
    max_age_requirement: "",
    instruction_note: "",
    is_public: true,
    doctors: [],
  });
  const [loading, setLoading] = useState(false);
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

  useEffect(() => {
    doctorApi
      .getAll()
      .then((response) => {
        setDoctorOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor data", error);
      });
  }, []);

  useEffect(() => {
    if (isEditMode) {
      medicalServiceApi
        .getById(id)
        .then((response) => {
          console.log(response.data);
          setFormData(response.data);
          if (response.data.thumbnail) {
            setThumbnailUrl(response.data.thumbnail); // Hiển thị ảnh đã có
          }
        })
        .catch((error) => {
          console.error("Error fetching service data", error);
        });
    }
  }, [id, isEditMode]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, thumbnail: file });
      setThumbnailUrl(imageUrl);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && key !== "doctors") {
        data.append(key, value);
      }
    });
    data.append("doctors", JSON.stringify(formData.doctors));
    console.log(JSON.stringify(formData.doctors));
    if(isEditMode) {
        medicalServiceApi.update(id, data)
        .then(() => {
          navigate("/facility/services");
          showSuccessSnackbar("Cập nhật dịch vụ thành công!");
        })
        .catch((error) => {
          console.error("Error updating service", error);
          showErrorSnackbar("Cập nhật dịch vụ thất bại!");
          setLoading(false);
        });
        return;
    }
    medicalServiceApi
      .create(data)
      .then(() => {
        navigate("/facility/services");
        showSuccessSnackbar("Tạo dịch vụ thành công!");
      })
      .catch((error) => {
        console.error("Error creating service", error);
        showErrorSnackbar("Tạo dịch vụ thất bại!");
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        marginBottom={"1rem"}
      >
        <IconButton
          component={Link}
          to={"/facility/services"}
          size="small"
          sx={{ p: 0 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs sx={{ display: "flex", alignItems: "center" }}>
          <Link to={"facility/services"}>Dịch vụ khám chữa</Link>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            New
          </Typography>
        </Breadcrumbs>
      </Stack>
      <div className="bg-white rounded-lg shadow-md flex flex-col">
        <h3 style={{ margin: "0.3rem 1rem" }}>Tạo dịch vụ mới</h3>
        <Divider />
        <div style={{ padding: "1rem 1.5rem", display: "flex", gap: "1rem" }}>
          <div style={{ width: "50%" }}>
            <h4 style={{ marginBottom: "1rem" }}>Thông tin cơ bản</h4>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginBottom: "1rem",
              }}
            >
              <TextField
                label="Tên dịch vụ"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                select
                label="Loại dịch vụ"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                fullWidth
              >
                {categorys.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Mô tả dịch vụ"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
              {formData.thumbnail ? (
                <Stack direction="row" spacing={2} alignItems="center">
                  <img
                    src={thumbnailUrl}
                    alt=""
                    style={{ width: 100, height: 100, borderRadius: 5 }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() =>
                      setFormData({ ...formData, thumbnail: null })
                    }
                  >
                    {" "}
                    Xóa ảnh
                  </Button>
                </Stack>
              ) : (
                <Button variant="outlined" component="label">
                  Thêm ảnh cho service
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              )}
              <Stack direction="row" alignItems="center">
                <Switch
                  name="is_public"
                  value={formData.is_public}
                  onChange={handleChange}
                />
                <span>Dịch vụ chỉ định</span>
              </Stack>
            </Box>
            <Divider />
            <h4 style={{ margin: "1rem 0" }}>Giá cả và thời gian</h4>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              marginBottom={"1rem"}
            >
              <TextField
                label="Giá"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                required
                fullWidth
              />
              <TextField
                label="Thời gian (phút)"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                type="number"
                required
                fullWidth
              />
            </Stack>
            <Divider />
            <h4 style={{ margin: "1rem 0" }}>Bác sĩ phụ trách</h4>
            <MultiSelectAutocomplete
              label="Chọn bác sĩ"
              options={doctorOptions}
              value={doctorOptions.filter((doctor) =>
                formData.doctors?.includes(doctor.id)
              )}
              onChange={(values) =>
                setFormData({
                  ...formData,
                  doctors: values.map((value) => value.id),
                })
              }
              getOptionLabel={(option) => option.name}
              fullWidth
            />
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h4 style={{ marginBottm: "1rem" }}>Đối tượng khám</h4>
            <TextField
              label="Lưu ý cho bệnh nhân"
              name="note"
              value={formData.note}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            {toggleGenderRequirement ? (
              <TextField
                select
                label="Chọn yêu cầu giới tính"
                name="genderRequirement"
                value={formData.genderRequirement}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
              </TextField>
            ) : (
              <Button
                startIcon={<AddIcon />}
                onClick={() => setToggleGenderRequirement(true)}
              >
                Yêu cầu giới tính
              </Button>
            )}

            {toggleAgeRequirement ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="Tuổi tối thiểu"
                  name="min_age_requirement"
                  value={formData.min_age_requirement}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                />
                <TextField
                  label="Tuổi tối đa"
                  name="max_age_requirement"
                  value={formData.max_age_requirement}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                />
              </Stack>
            ) : (
              <Button
                startIcon={<AddIcon />}
                onClick={() => setToggleAgeRequirement(true)}
              >
                Yêu cầu độ tuổi
              </Button>
            )}
          </div>
        </div>
        <Divider />
        <div style={{ padding: "1rem 1.5rem" }}>
          <Button
            loading={loading}
            variant="contained"
            type="submit"
            sx={{ display: "block", marginLeft: "auto" }}
            onClick={handleSubmit}
          >
            {isEditMode ? "Lưu thay đổi" : "Tạo dịch vụ"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCreate;
