import "./profile.css";
import { getUser } from "../../utlis/auth";
import { Divider, IconButton, TextField, InputAdornment, Box, Tab, Tabs, Button } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState, useRef } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import LocationPicker from "../../components/LocationPicker";
import RichTextEditor from "../../components/RichTextEditor";
import facilityApi from "../../service/FacilityApi";
const FacilityProfile = () => {
    const [tab, setTab] = useState(0);
    const [inforTab, setInforTab] = useState(0);
    const [facility, setFacility] = useState({
        id: null,
        working_time: "",
        hotline: "",
        address: "",
        website: "",
        medical_practice_license: "",
        legal_representative_name: "",
        legal_representative_id: "",
        tax_code: "",
        issuance_date: "",
        issuance_place: "",
        description: "",
        lat: 21.0285,
        lng: 105.8544,
    });
    const editorRef = useRef(null);
    const user = getUser();

    useEffect(() => {
        facilityApi.getbyAuth().then((res) => {
            console.log(res.data);
            setFacility(res.data);
        });
    },[]);
        

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFacility({ ...facility, [name]: value });
    };
    
    const handleChangeCordi = (cordi) => {
        setFacility({ ...facility, lat: cordi.lat, lng: cordi.lng });
    }

    const handleEditorChange = (content) => {
        setFacility(prev => ({ ...prev, description: content }));
    }

    const handleSubmit = () => {
        facilityApi.update(facility.id, facility).then((res) => {
            console.log(res.data);
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <div className="flex justify-between items-start gap-4">
                <div className="profile-menu">
                    <div className="relative">
                        <img src={user.avatar} alt="" className="w-20 h-20 object-cover rounded-full" style={{
                            margin: "0 auto",
                        }}/>
                        <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/3">
                            <input
                                type="file"
                                id="file-upload"
                                style={{ display: "none" }} // Ẩn input
                                onChange={(e) => console.log(e.target.files)}
                            />
                            <label htmlFor="file-upload">
                                <IconButton sx={{
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '5px',
                                    border: '1px solid white',
                                    "&:hover": {
                                        backgroundColor: '#0056b3',
                                    }
                                }}>
                                    <CameraAltIcon fontSize="small"/>
                                </IconButton>
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center justify-center" style={{ margin: "15px 0" }}>
                        <p>{user.name}</p>
                        <IconButton sx={{ padding: '5px', color: '#007bff' }}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </div>

                    {["Thông tin cơ bản","Nội dung mô tả","Danh sách bác sĩ"].map((item, index) => (
                        <div key={index} className="profile-menu-item">
                            <button 
                                className={`cursor-pointer w-full rounded-lg text-left ${tab == index ? "bg-[#007bff] text-white" : "hover:bg-slate-100"}`}
                                style={{padding: "0.5rem 1rem", margin: "0.5rem 0"}}
                                onClick={() => setTab(index)}
                            >
                                {item}
                            </button>
                            {index != 2 && <Divider/>}
                        </div>
                    ))}
                </div>
                <div className="profile-content">
                    <div className="relative">
                        <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e35b250-4872-4384-b3c9-5bebe7b48939-gt1.jpg&w=3840&q=75" alt="clinic-thumbnail" className="clinic-thumbnail" />
                        <div className="relative">
                            <img src={"https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F721f45d6-348b-4ce2-bce0-260516ad21a0-logo_512x512px.png&w=3840&q=75"} alt="" className="absolute rounded-full w-24 h-24 border-4 border-white object-cover -translate-y-1/2 left-7"/>
                            <p className="absolute left-32 font-semibold">{facility.facility_name}</p>
                        </div>
                        {tab == 0 && 
                        <div  style={{padding: '1rem 0', marginTop: "3rem"}}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white', borderBottomWidth: '1.5px' }}>
                            <Tabs value={inforTab} onChange={(e, newValue) => setInforTab(newValue)} aria-label="basic tabs example">
                                <Tab label="Thông tin cơ bản"  />
                                <Tab label="Thông tin pháp lý"  />
                            </Tabs>
                        </Box>
                            {inforTab == 0 && 
                                <div className="grid grid-cols-2 gap-4" style={{ margin: "1rem auto", padding: "1rem" }}>
                                    <TextField
                                        label="Thời gian làm việc"
                                        variant="outlined"
                                        name="working_time"
                                        value={facility.working_time || ""}
                                        onChange={handleChange}
                                        placeholder="Thời gian làm việc"
                                        margin="normal"
                                        fullWidth
                                        aria-label="Email field"
                                        slotProps={{
                                            input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccessTimeIcon />
                                                </InputAdornment>
                                            ),
                                            }
                                        }}
                                    />
                                    <TextField
                                        label="Hotline"
                                        variant="outlined"
                                        placeholder="Hotline"
                                        margin="normal"
                                        name="phone"
                                        value={facility.phone || ""}
                                        onChange={handleChange}
                                        aria-label="Hotline field"
                                        fullWidth
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
                                    <div className="text-sm">
                                        <TextField
                                            label="Địa chỉ"
                                            variant="outlined"
                                            placeholder="Địa chỉ"
                                            margin="normal"
                                            fullWidth
                                            aria-label="Adress field"
                                            name="address"
                                            value={facility.address || ""}
                                            onChange={handleChange}
                                            slotProps={{
                                                input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LocationOnIcon />
                                                    </InputAdornment>
                                                ),
                                                }
                                            }}
                                        />
                                        <LocationPicker 
                                            onLocationSelect={handleChangeCordi} 
                                            defaultAddresses={facility.address} 
                                            lat={facility.lat} 
                                            lng={facility.lng}
                                        />
                                        <p>Kinh độ : {facility.lat || 0}</p>
                                        <p>Vĩ độ: {facility.lng || 0}</p>
                                    </div>
                                    <TextField
                                        label="Website (nếu có)"
                                        variant="outlined"
                                        placeholder="Website"
                                        margin="normal"
                                        name="website"
                                        value={facility.website || ""}
                                        onChange={handleChange}
                                        fullWidth
                                        aria-label="Website field"
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LanguageIcon />
                                                    </InputAdornment>
                                                ),
                                            }
                                        }}
                                    />
                                    <div className="col-span-2">
                                     <Button 
                                        sx={{
                                            margin: "0.5rem auto",
                                            display: "block",

                                        }}
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                    >
                                        Lưu thay đổi
                                    </Button>
                                    </div>
                                </div>
                            }
                            {inforTab == 1 && (
                                <div className="grid grid-cols-2 gap-4" style={{ margin: "1rem auto", padding: "1rem" }}>
                                    <p className="col-span-2 italic text-sm">
                                        *Thông tin pháp lý không thể chỉnh sửa, thông tin này sẽ chỉ được hiển thị với quản trị viên của hệ thống
                                    </p>
                                    <TextField
                                        label="Giấy phép hoạt động"
                                        variant="outlined"
                                        placeholder="Giấy phép hoạt động"
                                        margin="normal"
                                        fullWidth
                                        value={facility.medical_practice_license || ""}
                                        aria-label="License field"
                                        disabled
                                    />
                                    <TextField
                                        label="Người đại diện"
                                        variant="outlined"
                                        placeholder="Người đại diện"
                                        margin="normal"
                                        fullWidth
                                        aria-label="Representative field"
                                        value={facility.legal_representative_name || ""}
                                        disabled
                                    />
                                    <TextField
                                        label="Số CMND/CCCD"
                                        variant="outlined"
                                        placeholder="Số CMND/CCCD"
                                        margin="normal"
                                        fullWidth
                                        aria-label="ID field"
                                        value={facility.legal_representative_id || ""}
                                        disabled
                                    />
                                    <TextField
                                        label="Mã số thuế"
                                        variant="outlined"
                                        placeholder="Mã số thuế"
                                        margin="normal"
                                        fullWidth
                                        aria-label="Tax ID field"
                                        value={facility.tax_code || ""}
                                        disabled
                                    />
                                    <TextField
                                        label="Ngày cấp"
                                        variant="outlined"
                                        placeholder="Ngày cấp"
                                        margin="normal"
                                        fullWidth
                                        aria-label="Issued Date field"
                                        
                                        value={facility.issuance_date || ""}
                                        disabled
                                    />
                                    <TextField
                                        label="Nơi cấp"
                                        variant="outlined"
                                        placeholder="Nơi cấp"
                                        margin="normal"
                                        fullWidth
                                        aria-label="Issued Place field"
                                        value={facility.issuance_place || ""}
                                        disabled
                                    />
                                </div>
                            )}
                        </div>
                    }

                    {tab == 1 && 
                        <div style={{padding: '1rem 0', marginTop: "3rem"}}>
                            <RichTextEditor ref={editorRef} content={facility.description} onChange={handleEditorChange}/>
                            <Button onClick={handleSubmit}>
                                Lưu thay đổi
                            </Button>
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacilityProfile;
