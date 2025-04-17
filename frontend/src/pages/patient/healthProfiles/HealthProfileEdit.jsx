import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Breadcrumbs, 
    Typography, 
    TextField, 
    Avatar, 
    Box, 
    IconButton, 
    InputAdornment, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem, 
    ListItemIcon, 
    ListItemText,
    Autocomplete, 
    Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import RelationshipIcon from '@icon/RelationshipIcon';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EditIcon from "@mui/icons-material/Edit";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from "react-i18next";
import relationshipKeys from '../../../utlis/RelationshipData.jsx';
import MultiSelectAutocomplete from '../../../components/MultiSelectAutocomplete.jsx';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ScaleIcon from '@mui/icons-material/Scale';
import EmailIcon from '@mui/icons-material/Email';
import useCustomSnackbar from '../../../hooks/useCustomSnackbar.jsx';
import healthProfileApi from '../../../service/healthProfileApi';
import { useNavigate } from 'react-router-dom';
import { getDiseases, getAllergies } from '../../../hooks/useCachedData.js';
import dayjs from 'dayjs';
import AvatarEditor from '../../../components/AvatarEditor.jsx';

const HealthProfileEdit = () => {
    const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
    const [ loading, setLoading ] = useState(false);
    const [croppedPreviewURL, setCroppedPreviewURL] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const [ image, setImage ] = useState(null);
    const [ profileValues, setProfileValues ] = useState({
        name: '',
        relationship: '',
        phone: '',
        dateOfBirth: null, // Initialize with null for dayjs type
        gender : 'male',
        email: '',
        address: '',
        healthInsuranceNumber: '',
        height: 0,
        weight: 0,
        allergies: [],
        diseases: []
    });
    const isEditing = !!id;
    const { data: diseases = [] } = getDiseases();
    const { data: allergies = [] } = getAllergies();

    useEffect(() => {
        if (isEditing) {
            healthProfileApi.getById(id)
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
                    allergies: res.data.allergies.map(a => a.id),
                    diseases: res.data.diseases.map(d => d.id),
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
        if(image) {
            formData.append('avatar', image);
        }
        if(profileValues.dateOfBirth) {
            formData.append("date_of_birth", new Date(profileValues.dateOfBirth?.$d).toISOString().split("T")[0]);
        }
        formData.append("name", profileValues.name);
        formData.append("relationship", profileValues.relationship);
        formData.append("phone", profileValues.phone);
        formData.append('gender', profileValues.gender);
        formData.append("email", profileValues.email);
        formData.append("height", profileValues.height);
        formData.append("weight", profileValues.weight);
        formData.append("healthInsuranceNumber", profileValues.healthInsuranceNumber);
        formData.append("allergies", JSON.stringify(profileValues.allergies));
        formData.append("diseases", JSON.stringify(profileValues.diseases));

        if(isEditing) {
            healthProfileApi.update(id, formData)
            .then((data) => {
                showSuccessSnackbar('Cập nhật hồ sơ sức khỏe thành công');
                navigate('/health-profile');
            })
            return;
        }
        
        healthProfileApi.create(formData)
        .then((data) => {
            showSuccessSnackbar('Tạo hồ sơ sức khỏe thành công');
            navigate('/health-profile');
        })
        .catch((error) => {
            showErrorSnackbar(error);
        });

    }

    return (
        <div id='profile-edit-section'>
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
                <Typography color="text.primary">Home</Typography>
                <Typography color="text.primary">Profile</Typography>
                {
                    isEditing && <Typography color="text.primary">Nguyen Van A</Typography>
                }
                <Typography color="text.primary">{isEditing ? 'Edit' : 'New'}</Typography>
            </Breadcrumbs>
            <div className="profile-edit-card">
                <div style={{ width: "100%", height: "80px", background: "linear-gradient(135deg, #007bff, #00c6ff)" , borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}></div>
                <AvatarEditor 
                    image={image} 
                    setImage={setImage}
                    defaultImg={croppedPreviewURL}
                    sx = {{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '-60px',
                    }}
                />
                <div className="profile-edit-form">
                    <TextField
                        label="Name"
                        value={profileValues.name || ''}
                        onChange={(e) => setProfileValues({ ...profileValues, name: e.target.value })}
                        fullWidth
                        margin="normal"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }
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
                        onChange={(e, value) => setProfileValues({ ...profileValues, relationship: value })}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label={t("relationship")}
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
                        label="Phone"
                        value={profileValues.phone}
                        onChange={(e) => setProfileValues({ ...profileValues, phone: e.target.value })}
                        fullWidth
                        margin="normal"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LocalPhoneIcon />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                    <FormControl  fullWidth margin="normal">
                        <InputLabel id="gender-select-label">{t('gender')}</InputLabel>
                        <Select
                            labelId="gender-select-label"
                            id="gender-simple-select"
                            value={profileValues.gender}
                            onChange={(e) => setProfileValues({ ...profileValues, gender: e.target.value })}
                            label={t("gender")}
                            renderValue={(
                                (selected) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {selected === 'male' ? <MaleIcon sx={{ marginRight: 1 }} /> : <FemaleIcon sx={{ marginRight: 1 }} />}
                                        {selected === 'male' ? 'Nam' : 'Nữ'}
                                    </Box>
                                )
                            )}
                        >
                            <MenuItem value="male">
                                <ListItemIcon>
                                    <MaleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Nam" />
                            </MenuItem>
                            <MenuItem value="female">
                                <ListItemIcon>
                                    <FemaleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Nữ" />
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']} sx={{ m: "auto 0"}}>
                            <DatePicker 
                                label="Ngày sinh"  
                                sx={{width: "100%"}}
                                value={profileValues.dateOfBirth}
                                onChange={(date) => setProfileValues({ ...profileValues, dateOfBirth: date })}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <TextField
                        label="Email"
                        value={profileValues.email}
                        onChange={(e) => setProfileValues({ ...profileValues, email: e.target.value })}
                        fullWidth
                        margin="normal"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                    <TextField
                        label="Chiều cao (cm)"
                        type="number"
                        value={profileValues.height}
                        onChange={(e) => setProfileValues({ ...profileValues, height: e.target.value })}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccessibilityIcon />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                    <TextField
                        label="Cân nặng (kg)"
                        type='number'
                        value={profileValues.weight}
                        onChange={(e) => setProfileValues({ ...profileValues, weight: e.target.value })}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ScaleIcon />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />

                </div>
                <div>
                    <Box display={{ xs: "block", md: "flex", padding: "20px" }}>
                        <h4 style={{ width: "20%"}}>Địa chỉ</h4>
                        <TextField
                            label="Địa chỉ"
                            fullWidth
                            sx={{ width: "80%" }}
                            value={profileValues.address}
                            onChange={(e) => setProfileValues({ ...profileValues, address: e.target.value })}
                        />
                    </Box>


                    <Box display={{ xs: "block", md: "flex", padding: "20px" }}>
                        <h4 style={{ width: "20%"}}>Mã số Bảo hiểm y tế</h4>
                        <TextField
                            label="Mã số BHYT"
                            fullWidth
                            sx={{ width: "80%" }}
                            value={profileValues.healthInsuranceNumber}
                            onChange={(e) => setProfileValues({ ...profileValues, healthInsuranceNumber: e.target.value })}
                        />
                    </Box>

                    <Box display={{ xs: "block", md: "flex", padding: "20px", gap: "10px" }}>
                        <h4 style={{width: "20%"}}>Danh sách các bệnh di ứng</h4>
                        <MultiSelectAutocomplete
                            options={allergies}
                            label="Allergies"
                            sx={{ width: "80%" }}
                            getOptionLabel={(option) => option.name}
                            value={allergies.filter(a => profileValues.allergies.includes(a.id))}
                            onChange={(allergies) => setProfileValues({ ...profileValues, allergies: allergies.map(a => a.id) })}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} display="flex" justifyContent="space-between" width="100%">
                                    <Typography sx={{ mr: "10px" }}>{option.name}</Typography>
                                    <Typography variant="body2" color="gray">{option.description}</Typography>
                                </Box>
                            )}
                        />
                    </Box>
                    <Box display={{ xs: "block", md: "flex", padding: "20px", gap: "10px" }}>
                        <h4 style={{ maxWidth: "20%"}}>Danh sách các bệnh mãn tính</h4>
                        <MultiSelectAutocomplete
                            options={diseases}
                            label="Chronic diseases"
                            sx={{ width: "80%" }}
                            getOptionLabel={(option) => option.name}
                            value={diseases.filter(a => profileValues.diseases.includes(a.id))}
                            onChange={(diseases) => setProfileValues({ ...profileValues, diseases: diseases.map(a => a.id) })}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} display="flex" justifyContent="space-between" width="100%">
                                    <Typography sx={{ mr: "10px" }}>{option.name}</Typography>
                                    <Typography variant="body2" color="gray">{option.description}</Typography>
                                </Box>
                            )}
                        />
                    </Box>
                </div>
                <Button 
                    variant="contained" 
                    sx={{
                        display: "block",
                        margin: "auto",
                        mt: 1,
                        backgroundColor: "#007bff",
                    }}
                    onClick={() => handleSubmit()}
                    loading={loading}
                >Lưu thông tin</Button>
            </div>
        </div>
    );
};

export default HealthProfileEdit;