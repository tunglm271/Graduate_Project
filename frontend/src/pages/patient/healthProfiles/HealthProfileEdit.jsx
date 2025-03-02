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
import EditAvatarBox from '../../../components/dialog/EditAvatarBox';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WcIcon from '@mui/icons-material/Wc';
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
import { getAllergies, getChronicDiseases, createHealthProfile } from '../../../service/backendApi.js';
import useCustomSnackbar from '../../../hooks/useCustomSnackbar.jsx';
import { useNavigate } from 'react-router-dom';

const HealthProfileEdit = () => {
    const { showSuccessSnackbar } = useCustomSnackbar();
    const { navigate } = useNavigate();
    const { id } = useParams();
    const { t } = useTranslation();
    const [toggleCropDialog, setToggleCropDialog] = useState(false);
    const [ allergies, setAllergies ] = useState([]);
    const [ chronicDiseases, setChronicDiseases ] = useState([]);
    const [ image, setImage ] = useState();
    const [croppedFile, setCroppedFile] = useState(null);
    const [croppedPreviewURL, setCroppedPreviewURL] = useState(null);
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
        chronicDiseases: []
    });
    const fileInputRef = useRef(null);
    const isEditing = !!id;


    useEffect(() => {
        getAllergies().then((data) => {
            setAllergies(data);
            console.log(data);
        });
        getChronicDiseases().then((data) => {
            setChronicDiseases(data);
        });
    },[])
   
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
                setToggleCropDialog(true);
            };
        }
    };

    const handleCropComplete = async (file, previewURL) => {
        setCroppedFile(file);
        setCroppedPreviewURL(previewURL);
    };


    const handleSubmit = () => {
        const data = {
            name: profileValues.name,
            relationship: profileValues.relationship,
            phone: profileValues.phone,
            dateOfBirth: profileValues.dateOfBirth?.$d,
            gender: profileValues.gender,
            email: profileValues.email,
            address: profileValues.address,
            healthInsuranceNumber: profileValues.healthInsuranceNumber,
            height: profileValues.height,
            weight: profileValues.weight,
            allergies: profileValues.allergies,
            chronicDiseases: profileValues.chronicDiseases
        };
        createHealthProfile(data, croppedFile).then((data) => {
            showSuccessSnackbar('Tạo hồ sơ sức khỏe thành công');
            navigate('/patient/health-profile');
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
                <Box
                    sx={{
                        position: "relative",
                        width: 120,
                        height: 120,
                        marginTop: '-60px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        display: "block",
                        borderRadius: "50%",
                        border: "2px solid white",
                        "&:hover .avatar-overlay": {
                        opacity: 1,
                        },
                    }}
                    onClick={handleAvatarClick}
                >
                        <Avatar
                            src={croppedPreviewURL}
                            alt="avatar"
                            sx={{ width: "100%", height: "100%" }}
                        />

                        <Box
                            className="avatar-overlay"
                            sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            opacity: 0,
                            transition: "opacity 0.3s ease-in-out",
                            }}
                        >
                            <IconButton sx={{ color: "white" }}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                </Box>
                <div className="profile-edit-form">
                    <TextField
                        label="Name"
                        value={profileValues.name}
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

                    <Box display={{ xs: "block", md: "flex", padding: "20px" }}>
                        <h4 style={{width: "20%"}}>Danh sách các bệnh di ứng</h4>
                        <MultiSelectAutocomplete
                            options={allergies}
                            label="Allergies"
                            sx={{ width: "80%" }}
                            getOptionLabel={(option) => option.name}
                            onChange={(allergies) => setProfileValues({ ...profileValues, allergies: allergies.map(a => a.id) })}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} display="flex" justifyContent="space-between" width="100%">
                                <Typography sx={{ mr: "10px" }}>{option.name}</Typography>
                                <Typography variant="body2" color="gray">{option.description}</Typography>
                                </Box>
                            )}
                        />
                    </Box>
                    <Box display={{ xs: "block", md: "flex", padding: "20px" }}>
                        <h4 style={{width: "20%"}}>Danh sách các bệnh mãn tính</h4>
                        <MultiSelectAutocomplete
                            options={chronicDiseases}
                            label="Chronic diseases"
                            sx={{ width: "80%" }}
                            getOptionLabel={(option) => option.name}
                            onChange={(chronicDiseases) => setProfileValues({ ...profileValues, chronicDiseases: chronicDiseases.map(a => a.id) })}
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
                >Lưu thông tin</Button>
            </div>
            <EditAvatarBox image={image} open={toggleCropDialog} onClose={() => setToggleCropDialog(false)}  onCropComplete={handleCropComplete}/>
        </div>
    );
};

export default HealthProfileEdit;