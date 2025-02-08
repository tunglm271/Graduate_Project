import './MedicalRecord.css';
import { Button, Breadcrumbs, Typography, ListItem , ListItemText, ListItemIcon, Stack, Divider  } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IndicatorTable from '../homepage/IndicatorTable';
import ScienceIcon from '@mui/icons-material/Science';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
const MedicalRecord = () => {
    return (
        <div id="medical-record-detail">
            <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
                <Typography color="text.primary">Home</Typography>
                <Typography color="text.primary">Health Profiles</Typography>
                <Typography color="text.primary">Nguyen Van A (Bố)</Typography>
                <Typography color="text.primary">Medical Record</Typography>
            </Breadcrumbs>

            <div className="appointment-infor-section">
                <h1>Thông tin khám bệnh</h1>
                <p>Mã lần khám: A132412NB4123AA</p>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <ListItem sx={{ p: 0 }}>
                        <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                            <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary="12 tháng 12, 2023" secondary="Ngày khám" />
                    </ListItem>
                    <ListItem sx={{ p: 0 }}>
                        <ListItemIcon sx={{ minWidth: 'auto', marginRight: 1 }}>
                            <EventAvailableIcon />
                        </ListItemIcon>
                        <ListItemText primary="14 tháng 12, 2023" secondary="Ngày trả kết quả khám" />
                    </ListItem>
                </div>

                <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}} >
                    <BookmarksIcon fontSize='small' color='primary' />
                    <span>Cơ sở khám</span>
                </h4>
                <Divider />
                <ListItem sx={{ p: 0 }}>
                    <ListItemText 
                        primary="Bệnh viện Đa khoa Quốc tế Vinmec" 
                        secondary={
                            <Stack direction="row" spacing={2}>
                                <Typography>458 Minh Khai, Hai Bà Trưng, Hà Nội</Typography>
                                <Typography>02439742222</Typography>
                                <Typography>vinmec@vimec.com</Typography>
                            </Stack>
                        }
                    />
                </ListItem>
                <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}} >
                    <BookmarksIcon fontSize='small' color='primary' />
                    <span>Người phụ trách</span>
                </h4>
                <Divider />
                <ListItem sx={{ p: 0 }}>
                    <ListItemText 
                        primary="Bác sĩ Nguyễn Văn A" 
                        secondary={
                            <Stack direction="row" spacing={2}>
                                <Typography>Bác sĩ tai mũi họng</Typography>
                                <Typography>0123456789</Typography>
                                <Typography>Anguyenvan@vimec.com</Typography>
                            </Stack>
                        }
                    />
                </ListItem>
            </div>

            <div className="appoiment-result">
                <div className="examination-result">
                        <Accordion sx={{ boxShadow: 'none' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <ScienceIcon />
                                <Typography sx={{ marginLeft: '5px', fontWeight: 600}}>Xét nghiệm chỉ số</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <IndicatorTable />
                            </AccordionDetails>    
                        </Accordion>
                        <Accordion sx={{ boxShadow: 'none' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >   
                                <PhotoLibraryIcon />
                                <Typography sx={{ marginLeft: '5px', fontWeight: 600}}>Xét nghiệm hình ảnh</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant='h6'>
                                    Siêu âm ổ bụng
                                </Typography>                                
                                <img style={{
                                    margin: '0 auto',
                                    display: 'block',
                                }} src='https://img.ykhoadiamond.com/Uploads/Content/20032023/ecd65afd-4a54-43dc-bb06-b2dda1b9382a.jpg'/>
                                <p style={{marginTop: '10px'}}>
                                    <span style={{
                                        fontWeight: 600
                                    }}>Kết luận sơ bộ:</span> &nbsp;
                                    Gan, thận, và các cơ quan nội tạng khác đều trong giới hạn bình thường.
                                </p>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{ boxShadow: 'none' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >   
                                <TextSnippetIcon />
                                <Typography sx={{ marginLeft: '5px', fontWeight: 600}}>Kết quả</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Kết quả xét nghiệm cho thấy các chỉ số sinh hóa trong giới hạn bình thường. Hình ảnh siêu âm không phát hiện bất thường. Bệnh nhân được khuyến cáo tiếp tục theo dõi và tái khám sau 6 tháng hoặc khi có triệu chứng bất thường.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                </div>
                <div className="conclusion">

                </div>
            </div>
        </div>
    );
}

export default MedicalRecord;
