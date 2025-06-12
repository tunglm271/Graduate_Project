import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Breadcrumbs,
  TextField,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Autocomplete,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import RelationshipIcon from "@icon/RelationshipIcon";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import EditIcon from "@mui/icons-material/Edit";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import relationshipKeys from "../../../utlis/RelationshipData.jsx";
import MultiSelectAutocomplete from "../../../components/MultiSelectAutocomplete.jsx";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ScaleIcon from "@mui/icons-material/Scale";
import EmailIcon from "@mui/icons-material/Email";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar.jsx";
import healthProfileApi from "../../../service/healthProfileApi";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { getDiseases, getAllergies } from "../../../hooks/useCachedData.js";
import dayjs from "dayjs";
import AvatarEditor from "../../../components/AvatarEditor.jsx";
import { Link } from "react-router-dom";

const HealthProfileEdit = () => {
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
  const [loading, setLoading] = useState(false);
  const [croppedPreviewURL, setCroppedPreviewURL] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [profileValues, setProfileValues] = useState({
    name: "",
    relationship: "",
    phone: "",
    dateOfBirth: null, // Initialize with null for dayjs type
    gender: "male",
    email: "",
    address: "",
    healthInsuranceNumber: "",
    height: 0,
    weight: 0,
    allergies: [],
    diseases: [],
  });
  const isEditing = !!id;
  const { data: diseases = [] } = getDiseases();
  const { data: allergies = [] } = getAllergies();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (isEditing) {
      healthProfileApi
        .getById(id)
        .then((res) => {
          setProfileValues({
            ...profileValues,
            name: res.data.name,
            relationship: res.data.relationship,
            gender: res.data.gender,
            email: res.data.email,
            phone: res.data.phone,
            height: res.data.height,
            weight: res.data.weight,
            allergies: res.data.allergies.map((a) => a.id),
            diseases: res.data.diseases.map((d) => d.id),
            dateOfBirth: dayjs(res.data.date_of_birth),
          });
          setCroppedPreviewURL(res.data.avatar);
          console.log(res.data);
        })
        .catch((error) => {
          showErrorSnackbar(error);
        });
    }
  }, [isEditing]);

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    if (image) {
      formData.append("avatar", image);
    }
    if (profileValues.dateOfBirth) {
      formData.append(
        "date_of_birth",
        new Date(profileValues.dateOfBirth?.$d).toISOString().split("T")[0]
      );
    }
    formData.append("name", profileValues.name);
    formData.append("relationship", profileValues.relationship);
    formData.append("phone", profileValues.phone);
    formData.append("gender", profileValues.gender);
    formData.append("email", profileValues.email);
    formData.append("height", profileValues.height);
    formData.append("weight", profileValues.weight);
    formData.append(
      "healthInsuranceNumber",
      profileValues.healthInsuranceNumber
    );
    formData.append("allergies", JSON.stringify(profileValues.allergies));
    formData.append("diseases", JSON.stringify(profileValues.diseases));

    if (isEditing) {
      healthProfileApi.update(id, formData).then(() => {
        showSuccessSnackbar("Cập nhật hồ sơ sức khỏe thành công");
        navigate("/health-profile");
      });
      return;
    }

    healthProfileApi
      .create(formData)
      .then(() => {
        showSuccessSnackbar("Tạo hồ sơ sức khỏe thành công");
        navigate("/health-profile");
      })
      .catch((error) => {
        showErrorSnackbar(error);
      });
  };

  return (
    <div
      id="profile-edit-section"
      style={{ padding: isMobile ? "10px" : "20px" }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          marginBottom: 2,
          flexWrap: "wrap",
          "& .MuiBreadcrumbs-ol": {
            flexWrap: "wrap",
          },
        }}
      >
        <Link to={"/health-profile"} className="hover:underline">
          {t("health-profiles-list")}
        </Link>
        {isEditing && <p className="text-gray-900">{profileValues.name}</p>}
        <p className="text-gray-900">
          {isEditing ? t("profile.common.edit") : t("profile.common.create")}
        </p>
      </Breadcrumbs>
      <div
        className="profile-edit-card"
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: isMobile ? "60px" : "80px",
            background: "linear-gradient(135deg, #007bff, #00c6ff)",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        ></div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: isMobile ? "-40px" : "-60px",
            mb: 2,
          }}
        >
          <AvatarEditor
            image={image}
            setImage={setImage}
            defaultImg={croppedPreviewURL}
            sx={{
              width: isMobile ? 120 : 150,
              height: isMobile ? 120 : 150,
              border: "4px solid white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
        <div
          className="profile-edit-form"
          style={{
            padding: isMobile ? "10px" : "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            label={t("profile.detail.name")}
            value={profileValues.name || ""}
            onChange={(e) =>
              setProfileValues({ ...profileValues, name: e.target.value })
            }
            fullWidth
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Autocomplete
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            options={relationshipKeys}
            getOptionLabel={(option) => t(option)}
            value={profileValues.relationship}
            onChange={(e, value) =>
              setProfileValues({ ...profileValues, relationship: value })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("profile.detail.relationship")}
                InputProps={{
                  ...params.InputProps, // Ensures Autocomplete functionalities work
                  startAdornment: (
                    <InputAdornment position="start">
                      <RelationshipIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <TextField
            label={t("profile.detail.phone")}
            value={profileValues.phone}
            onChange={(e) =>
              setProfileValues({ ...profileValues, phone: e.target.value })
            }
            fullWidth
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-select-label">{t("gender")}</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-simple-select"
              value={profileValues.gender}
              onChange={(e) =>
                setProfileValues({ ...profileValues, gender: e.target.value })
              }
              label={t("profile.detail.gender")}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {selected === "male" ? (
                    <MaleIcon sx={{ marginRight: 1 }} />
                  ) : (
                    <FemaleIcon sx={{ marginRight: 1 }} />
                  )}
                  {selected === "male"
                    ? t("profile.gender.male")
                    : t("profile.gender.female")}
                </Box>
              )}
            >
              <MenuItem value="male">
                <ListItemIcon>
                  <MaleIcon />
                </ListItemIcon>
                <ListItemText primary={t("profile.gender.male")} />
              </MenuItem>
              <MenuItem value="female">
                <ListItemIcon>
                  <FemaleIcon />
                </ListItemIcon>
                <ListItemText primary={t("profile.gender.female")} />
              </MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ m: "auto 0" }}>
              <DatePicker
                label={t("profile.detail.date-of-birth")}
                sx={{ width: "100%" }}
                value={profileValues.dateOfBirth}
                onChange={(date) =>
                  setProfileValues({ ...profileValues, dateOfBirth: date })
                }
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            label="Email"
            value={profileValues.email}
            onChange={(e) =>
              setProfileValues({ ...profileValues, email: e.target.value })
            }
            fullWidth
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <TextField
              label={`${t("profile.height")} (cm)`}
              type="number"
              value={profileValues.height}
              onChange={(e) =>
                setProfileValues({ ...profileValues, height: e.target.value })
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessibilityIcon />
                    </InputAdornment>
                  ),
                },
              }}
              className="w-full md:w-1/2"
            />
            <TextField
              label={`${t("profile.weight")} (kg)`}
              type="number"
              value={profileValues.weight}
              onChange={(e) =>
                setProfileValues({ ...profileValues, weight: e.target.value })
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ScaleIcon />
                    </InputAdornment>
                  ),
                },
              }}
              className="w-full md:w-1/2"
            />
          </div>
        </div>
        <div style={{ padding: isMobile ? "10px" : "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mb: 2,
            }}
          >
            <p className="text-lg font-semibold w-full md:w-1/5 mb-2 md:mb-0">
              {t("address")}
            </p>
            <TextField
              label={t("address")}
              fullWidth
              sx={{ width: { xs: "100%", md: "80%" } }}
              value={profileValues.address}
              onChange={(e) =>
                setProfileValues({ ...profileValues, address: e.target.value })
              }
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mb: 2,
            }}
          >
            <p className="text-lg font-semibold w-full md:w-1/5 mb-2 md:mb-0">
              {t("profile.detail.insurance-code")}
            </p>
            <TextField
              label={t("profile.detail.insurance-code")}
              fullWidth
              sx={{ width: { xs: "100%", md: "80%" } }}
              value={profileValues.healthInsuranceNumber}
              onChange={(e) =>
                setProfileValues({
                  ...profileValues,
                  healthInsuranceNumber: e.target.value,
                })
              }
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mb: 2,
            }}
          >
            <p className="text-lg font-semibold w-full md:w-1/5 mb-2 md:mb-0">
              {t("profile.detail.allergies-list")}
            </p>
            <MultiSelectAutocomplete
              options={allergies}
              label={t("profile.detail.allergies-list")}
              sx={{ width: { xs: "100%", md: "80%" } }}
              getOptionLabel={(option) => option.name}
              value={allergies.filter((a) =>
                profileValues.allergies.includes(a.id)
              )}
              onChange={(allergies) =>
                setProfileValues({
                  ...profileValues,
                  allergies: allergies.map((a) => a.id),
                })
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p className="mr-2.5 w-auto">{option.name}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    {option.description}
                  </p>
                </Box>
              )}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mb: 2,
            }}
          >
            <p className="text-lg font-semibold w-full md:w-1/5 mb-2 md:mb-0">
              {t("profile.detail.chronic-diseases-list")}
            </p>
            <MultiSelectAutocomplete
              options={diseases}
              label={t("profile.detail.chronic-diseases-list")}
              sx={{ width: { xs: "100%", md: "80%" } }}
              getOptionLabel={(option) => option.name}
              value={diseases.filter((a) =>
                profileValues.diseases.includes(a.id)
              )}
              onChange={(diseases) =>
                setProfileValues({
                  ...profileValues,
                  diseases: diseases.map((a) => a.id),
                })
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p className="mr-2.5">{option.name}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </Box>
              )}
            />
          </Box>
        </div>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              minWidth: { xs: "100%", sm: "200px" },
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
            startIcon={<SaveIcon />}
            onClick={() => handleSubmit()}
            disabled={loading}
          >
            {loading ? t("common.loading") : t("profile.common.save")}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default HealthProfileEdit;
