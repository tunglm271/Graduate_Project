import { useState, forwardRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StepLabel from '@mui/material/StepLabel';
import facilityImg from '../../assets/images/facility.jpg';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { Autocomplete, TextField, Button, styled, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import dayjs from 'dayjs';
import "./BookingPopUp.css";
import MonthPicker from './monthPicker';
import DatePicker from './DatePicker';
import SectionPicker from './SectionPicker';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import healthProfileApi from '../../service/healthProfileApi';
import medicalServiceApi from '../../service/medicalServiceAPi';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';
import appointmentApi from '../../service/appointmentApi';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function BookingPopUp({open, onClose, facility, id}) {
    const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
    const [profileOption, setProfileOption] = useState([]);
    useEffect(() => {
      healthProfileApi.getAll().then((res) => {
        setProfileOption(res.data);
        console.log(res.data);
      })
      },[])


    const [chosenProfile, setChosenProfile] = useState(profileOption[0]);
    const [month, setMonth] = useState(new Date());
    const [date, setDate] = useState(dayjs());
    const [activeStep, setActiveStep] = useState(0);
    const [postedFiles, setPostedFiles] = useState([]);
    const [sectionList, setSectionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSection, setSelectedSection] = useState(null);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        const newActiveStep = activeStep < 2 ? activeStep + 1 : 0;
        if(newActiveStep === 0) {
          onClose();
          setChosenProfile([]);
        }
        if(activeStep == 2) {
          handleSubmit();
        }
        setActiveStep(newActiveStep);
    };

    useEffect(() => {
      if (activeStep === 1) {
        setLoading(true);
        medicalServiceApi.getValiableSlots(id, date.format('YYYY-MM-DD')).then((res) => {
          setSelectedSection(null);
          setSectionList(res.data);
          console.log(res.data);
          setLoading(false);
        }).catch((err) => {
          console.log(err);
        })
      }
    },[date])

    const steps = [
        'Nhập thông tin khám',
        'Chọn ngày khám',
        'Tài liệu đính kèm',
    ];

    const handleSubmit = () => {
      const formData = new FormData();
      formData.append('health_profile_id', chosenProfile.id);
      console.log(chosenProfile.id);
      formData.append('medical_service_id', id);
      formData.append('date', date.format('YYYY-MM-DD'));
      formData.append('start_time', selectedSection.start_time);
      formData.append('end_time', selectedSection.end_time);
      appointmentApi.create(formData).then((res) => {
        console.log(res.data);
        showSuccessSnackbar("Đặt lịch khám thành công!");
        setPostedFiles([]);
        setActiveStep(0);
        onClose();
      }).catch((err) => {
        console.log(err);
        showErrorSnackbar(err.response.data.message);
      })
    }


  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="lg"
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{
          padding: '12px 16px'
        }}>{"Đặt lịch khám"}</DialogTitle>
        <DialogContent sx={{
            width: '800px',
            background: '#F4F7FF',
            paddingTop: '20px',
        }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{marginTop: '20px'}}>
            {steps.map((label,index) => (
            <Step key={label} completed={index < activeStep}>
                <StepLabel>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
            {activeStep === 0 && 
            <div style={{paddingTop: '20px'}}>
                <div className='facility-popup-card'>
                    <img src={facilityImg} alt="" />
                    <div>
                        <h4>{facility?.facility_name}</h4>
                        <p style={{display: 'flex', alignItems: 'center', fontSize: '14px'}}>
                          <LocationOnIcon sx={{color: "#007bff"}}/>
                          Địa chỉ: {facility?.address}
                        </p>
                    </div>
                </div>

                <Autocomplete 
                id="profile-select"
                sx={{
                  background: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(173, 216, 230, 0.7)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    }
                  }  
                }}
                options={profileOption}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Chọn người khám" />}
                renderOption={(props, option) => (
                    <li {...props} style={{display: 'flex', gap: '10px'}}>
                        <div>{option.name}</div>
                        <div style={{color: 'gray', fontSize: '14px'}}>{option.relationship}</div>
                    </li>
                )}
                onChange={(event, value) => setChosenProfile(value)}
                defaultValue={profileOption[0]}
                />

                {chosenProfile && <div className='profile-detail'>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                          <BookmarksIcon fontSize='small' color='primary' />
                          <span>Thông tin hồ sơ</span>
                      </h4>
                      <Button sx={{
                        textTransform: 'none',
                      }}>Xem chi tiết</Button>
                  </div>
                  <ul>
                    <li>
                        <span>Họ và tên </span>
                        <span>{chosenProfile.name}</span>
                    </li>
                    <li>
                        <span>Ngày sinh </span>
                        <span>{chosenProfile.date_of_birth}</span>
                    </li>
                    <li>
                        <span>Giới tính </span>
                        <span>{chosenProfile.gender}</span>
                    </li>
                    <li>
                        <span>Số điện thoại </span>
                        <span>{chosenProfile.phone}</span>
                    </li>
                  </ul>  
                </div>
    }

                <TextField 
                  multiline
                  rows={4} 
                  label="Nhập lí do khám bệnh"
                  sx={{
                    width: '100%',
                    marginTop: '20px',
                    background: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px rgba(173, 216, 230, 0.7)',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      }
                    }  
                  }}
                  />

            </div>
            
            }


            {activeStep === 1 &&
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', fontSize: '16px'}}>
                  <h4>Chọn ngày khám</h4>
                  <MonthPicker setMonth={setMonth} />
              </div>

              <DatePicker month={month} date={date} setDate={setDate} />
              {loading ?
              <CircularProgress />
              :
              <SectionPicker sectionList={sectionList} onSelectSection={setSelectedSection} selectedSection={selectedSection} />
              }
            </div>
            }

            {activeStep === 2 &&
              <div style={{marginTop: '20px', minHeight: '200px'}}>
                  <label>
                    <Button component="span" sx={{
                      background: 'white',
                      textTransform: 'none',
                      display: 'flex',
                      gap: '10px',
                      padding: '10px',
                      borderRadius: '10px',
                      border: '1px dashed #007bff',
                    }}>
                        <CameraAltIcon />
                        Thêm hình ảnh, kết quả xét nghiệm, chụp chiếu gần nhất, thuận tiện cho bác sĩ tư vấn
                    </Button>
                    <VisuallyHiddenInput
                      type="file"
                      multiple
                      onChange={(event) => {
                        const files = Array.from(event.target.files);
                        setPostedFiles((prevFiles) => [...prevFiles, ...files]);
                      }}
                    />
                  </label>

                  <div className='uploaded-files'>
                    <h4 style={{margin: '10px 0px'}}>Hình ảnh tải lên</h4>
                    <div className='file-list'>
                      {postedFiles.map((file, index) => (
                        <div key={index} className='uploaded-file'>
                          <a
                          href={URL.createObjectURL(file)}
                          download={file.name}
                          >
                            {file.name}
                          </a>
                          <IconButton variant="outlined" color='error' onClick={() => {
                            setPostedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
                          }}>
                              <DeleteIcon />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                  </div>

              </div>
            }

        </DialogContent>
        <DialogActions sx={{background: '#F4F7FF'}}>
          <Button
            color="inherit" 
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Quay lại
           </Button>
          <Button onClick={handleNext}>{activeStep == 2?"Đặt lịch":"Tiếp tục"}</Button>
        </DialogActions>
      </Dialog>
  );
}