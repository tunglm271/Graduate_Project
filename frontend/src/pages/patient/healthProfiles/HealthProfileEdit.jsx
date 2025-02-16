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
    Autocomplete 
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
const HealthProfileEdit = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [toggleCropDialog, setToggleCropDialog] = useState(false);
    const [ image, setImage ] = useState();
    const [ profileValues, setProfileValues ] = useState({
        name: '',
        relationship: '',
        phone: '',
        dateOfBirth: new Date(),
        gender : '',
        email: '',
        allergies: [],
    });
    const fileInputRef = useRef(null);
    const isEditing = !!id;


    useEffect(() => {
        console.log(toggleCropDialog);
    },[toggleCropDialog])
   
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

    const handleDateChange = (date) => {
        setProfileValues({ ...profileValues, dateOfBirth: date });
    };

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
                            src="/path-to-image.jpg"
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
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label={t("relationship")}
                            InputProps={{
                                ...params.InputProps, // Ensures Autocomplete functionalities work
                                startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
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
                            onChange={(e) => setProfileValues({ ...profile, gender: e.target.value })}
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
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker 
                                label="Ngày sinh"  
                                sx={{width: "100%"}}
                                value={profileValues.dateOfBirth}
                                onChange={handleDateChange}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <TextField
                        label="Email"
                        value={profileValues.email}
                        onChange={(e) => setProfileValues({ ...profileValues, email: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </div>
            </div>
            <EditAvatarBox image={image} open={toggleCropDialog} onClose={() => setToggleCropDialog(false)}/>
        </div>
    );
};

export default HealthProfileEdit;