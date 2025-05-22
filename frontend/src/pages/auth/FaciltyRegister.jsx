import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../service/api";
import { getCities } from "../../hooks/useCachedData";

const facilityTypes = [
  { id: 1, name: "Bệnh viện công" },
  { id: 2, name: "Bệnh viện tư" },
  { id: 3, name: "Phòng khám đa khoa" },
  { id: 4, name: "Phòng khám chuyên khoa" },
  { id: 5, name: "Phòng xét nghiệm" },
  { id: 6, name: "Khác" },
];

const validationSchema = Yup.object({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
  facility_name: Yup.string().required("Tên cơ sở y tế là bắt buộc"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại là bắt buộc"),
  address: Yup.string().required("Địa chỉ là bắt buộc"),
  description: Yup.string().required("Mô tả là bắt buộc"),
  working_time: Yup.string().required("Thời gian làm việc là bắt buộc"),
  website: Yup.string().url("Website không hợp lệ"),
  legal_representative_name: Yup.string().required(
    "Tên người đại diện pháp lý là bắt buộc"
  ),
  legal_representative_id: Yup.string().required(
    "CMND/CCCD người đại diện là bắt buộc"
  ),
  tax_code: Yup.string().required("Mã số thuế là bắt buộc"),
  medical_practice_license: Yup.string().required(
    "Giấy phép hành nghề là bắt buộc"
  ),
  issuance_date: Yup.date().required("Ngày cấp là bắt buộc"),
  issuance_place: Yup.string().required("Nơi cấp là bắt buộc"),
  facility_type_id: Yup.number().required("Loại cơ sở y tế là bắt buộc"),
  city_id: Yup.number().required("Thành phố là bắt buộc"),
});

export default function FacilityRegister() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: cities = [], isLoading: isLoadingCities } = getCities();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      facility_name: "",
      phone: "",
      address: "",
      description: "",
      working_time: "",
      website: "",
      legal_representative_name: "",
      legal_representative_id: "",
      tax_code: "",
      medical_practice_license: "",
      issuance_date: "",
      issuance_place: "",
      facility_type_id: "",
      city_id: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setError("");

        // First register the user account
        const userResponse = await api.post("/auth/register", {
          email: values.email,
          password: values.password,
          role: "medical_facility",
        });

        // Then create the facility profile
        const facilityData = {
          user_id: userResponse.data.id,
          facility_name: values.facility_name,
          phone: values.phone,
          address: values.address,
          description: values.description,
          working_time: values.working_time,
          website: values.website,
          legal_representative_name: values.legal_representative_name,
          legal_representative_id: values.legal_representative_id,
          tax_code: values.tax_code,
          medical_practice_license: values.medical_practice_license,
          issuance_date: values.issuance_date,
          issuance_place: values.issuance_place,
          facility_type_id: values.facility_type_id,
          city_id: values.city_id,
        };

        await api.post("/medical-facilities", facilityData);

        // Redirect to login page after successful registration
        navigate("/login", {
          state: {
            message: "Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.",
          },
        });
      } catch (err) {
        setError(err.response?.data?.message || "Có lỗi xảy ra khi đăng ký");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Paper
      elevation={3}
      className="max-h-[95vh] overflow-y-auto w-full max-w-4xl mx-auto p-6 md:p-8 rounded-xl bg-white"
    >
      <p className="text-center text-2xl mb-4 font-bold text-gray-800">
        Đăng ký cơ sở y tế
      </p>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Grid container spacing={3}>
          {/* Account Information */}
          <Grid item xs={12}>
            <p className="text-xl font-semibold mb-2 text-gray-700">
              Thông tin tài khoản
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Mật khẩu"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </Grid>

          {/* Facility Information */}
          <Grid item xs={12}>
            <p className="font-semibold text-xl mb-2 text-gray-700 mt-4">
              Thông tin cơ sở y tế
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="facility_name"
              name="facility_name"
              label="Tên cơ sở y tế"
              value={formik.values.facility_name}
              onChange={formik.handleChange}
              error={
                formik.touched.facility_name &&
                Boolean(formik.errors.facility_name)
              }
              helperText={
                formik.touched.facility_name && formik.errors.facility_name
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Số điện thoại"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              name="address"
              label="Địa chỉ"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="working_time"
              name="working_time"
              label="Thời gian làm việc"
              value={formik.values.working_time}
              onChange={formik.handleChange}
              error={
                formik.touched.working_time &&
                Boolean(formik.errors.working_time)
              }
              helperText={
                formik.touched.working_time && formik.errors.working_time
              }
              placeholder="VD: 8:00 - 17:00, Thứ 2 - Thứ 6"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="website"
              name="website"
              label="Website"
              value={formik.values.website}
              onChange={formik.handleChange}
              error={formik.touched.website && Boolean(formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              id="facility_type_id"
              name="facility_type_id"
              label="Loại cơ sở y tế"
              value={formik.values.facility_type_id}
              onChange={formik.handleChange}
              error={
                formik.touched.facility_type_id &&
                Boolean(formik.errors.facility_type_id)
              }
              helperText={
                formik.touched.facility_type_id &&
                formik.errors.facility_type_id
              }
            >
              {facilityTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              id="city_id"
              name="city_id"
              label="Thành phố"
              value={formik.values.city_id}
              onChange={formik.handleChange}
              error={formik.touched.city_id && Boolean(formik.errors.city_id)}
              helperText={formik.touched.city_id && formik.errors.city_id}
              disabled={isLoadingCities}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Legal Information */}
          <Grid item xs={12}>
            <p className="font-semibold text-xl mb-2 text-gray-700 mt-4">
              Thông tin pháp lý
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Đây là thông tin để quản trị viên kiểm soát tính minh bạch của cơ
              sở y tế. Thông tin này sẽ được bảo mật và không công khai với
              người dùng.
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="legal_representative_name"
              name="legal_representative_name"
              label="Tên người đại diện pháp lý"
              value={formik.values.legal_representative_name}
              onChange={formik.handleChange}
              error={
                formik.touched.legal_representative_name &&
                Boolean(formik.errors.legal_representative_name)
              }
              helperText={
                formik.touched.legal_representative_name &&
                formik.errors.legal_representative_name
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="legal_representative_id"
              name="legal_representative_id"
              label="CMND/CCCD người đại diện"
              value={formik.values.legal_representative_id}
              onChange={formik.handleChange}
              error={
                formik.touched.legal_representative_id &&
                Boolean(formik.errors.legal_representative_id)
              }
              helperText={
                formik.touched.legal_representative_id &&
                formik.errors.legal_representative_id
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="tax_code"
              name="tax_code"
              label="Mã số thuế"
              value={formik.values.tax_code}
              onChange={formik.handleChange}
              error={formik.touched.tax_code && Boolean(formik.errors.tax_code)}
              helperText={formik.touched.tax_code && formik.errors.tax_code}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="medical_practice_license"
              name="medical_practice_license"
              label="Giấy phép hành nghề"
              value={formik.values.medical_practice_license}
              onChange={formik.handleChange}
              error={
                formik.touched.medical_practice_license &&
                Boolean(formik.errors.medical_practice_license)
              }
              helperText={
                formik.touched.medical_practice_license &&
                formik.errors.medical_practice_license
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="date"
              id="issuance_date"
              name="issuance_date"
              label="Ngày cấp"
              value={formik.values.issuance_date}
              onChange={formik.handleChange}
              error={
                formik.touched.issuance_date &&
                Boolean(formik.errors.issuance_date)
              }
              helperText={
                formik.touched.issuance_date && formik.errors.issuance_date
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="issuance_place"
              name="issuance_place"
              label="Nơi cấp"
              value={formik.values.issuance_place}
              onChange={formik.handleChange}
              error={
                formik.touched.issuance_place &&
                Boolean(formik.errors.issuance_place)
              }
              helperText={
                formik.touched.issuance_place && formik.errors.issuance_place
              }
            />
          </Grid>
        </Grid>

        <Box className="flex justify-center mt-6">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            className="min-w-[200px]"
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Đăng ký"
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
