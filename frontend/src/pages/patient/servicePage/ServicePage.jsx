import "./service.css"
import { Breadcrumbs, Divider, List, ListItem, ListItemText, Skeleton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import {Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import BookingPopUp from "../../../components/dialog/BookingPopUp";
import { useEffect, useState } from "react";
import medicalServiceApi from "../../../service/medicalServiceAPi";
const ServicePage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState({});
    const [toogleBookingPopUp, setToogleBookingPopUp] = useState(false);

    useEffect(() => {
        medicalServiceApi.getById(id).then((res) => {
            setService(res.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    },[id])

    return (
        <div id='service-page'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/services" style={{ color: '#007bff' }}>Dịch vụ</Link>
                {
                    loading
                    ? 
                    <Skeleton variant="text" width={200} height={40} />
                    :
                    <Typography sx={{ color: 'text.primary', fontStyle: 'italic' }}>{service?.name}</Typography>
                }
            </Breadcrumbs>


            <div id='service-content'>
                {
                    loading 
                    ?
                    <>
                        <Skeleton variant="rectangular" width={"100%"} height={300} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
                        <Skeleton variant="text" width={"100%"} height={40} sx={{ marginBottom: "10px" }} />
                        <Skeleton variant="text" width={"100%"} height={40} sx={{ marginBottom: "10px" }} />
                        <Skeleton variant="text" width={"100%"} height={40} sx={{ marginBottom: "10px" }} />
                    </>
                    :
                    <>
                        <img src={service?.thumbnail} alt="" />
                        <div className="service-title">
                            <h3>{service?.name}</h3>
                            <h2 style={{display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px'}}>{service?.price} đ <span style={{background: 'red', color:'white', fontSize: '14px', padding: '3px', borderRadius: '15px'}}>-9%</span></h2>
                            <h4>{service?.price} đ</h4>
                        </div>
                    </>
                }

                <div className='service-infor'>
                        <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                            <BookmarksIcon fontSize='small' color='primary' />
                            <span>Thông tin gói khám</span>
                        </h4>
                        <Divider />
                        <ul>
                            <li>
                                <span>Hình thức thực hiện</span>
                                <span>Tại nhà, tại viện</span>
                            </li>
                            <li>
                                <span>Thời gian thực hiện</span>
                                <span>{service?.duration} phút</span>
                            </li>
                            <li>
                                <span>Địa điểm thực hiện</span>
                                <span>Hà Nội</span>
                            </li>
                            <li>
                                <span>Giới tính</span>
                                <span>{service?.service_audience_gender}</span>
                            </li>
                            <li>
                                <span>Độ tuổi</span>
                                <span>Dưới 40</span>
                            </li>
                        </ul>
                </div>

                

                <div className='service-location'>
                        <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}} >
                            <BookmarksIcon fontSize='small' color='primary' />
                            <span>Địa điểm áp dụng</span>
                        </h4>
                        <Divider />

                       <List>
                            <ListItem>
                                <Typography component="span" sx={{ fontWeight: "600", marginRight: "12px" }}> 1 </Typography>
                                <ListItemText primary="Hà Nội - phòng khám đa khoa rạng động Hà Nội" secondary="171 P. Vũ Tông Phan, Khương Trung, Thanh Xuân, Hà Nội"/>
                            </ListItem>
                            <ListItem>
                                <Typography component="span" sx={{ fontWeight: "600", marginRight: "12px" }}> 2 </Typography>
                                <ListItemText primary="Hồ Chí Minh - phòng khám đa khoa rạng động số 2" secondary="171 P. Vũ Tông Phan, Khương Trung, Thanh Xuân, Hà Nội" />
                            </ListItem>
                            <ListItem>
                                <Typography component="span" sx={{ fontWeight: "600", marginRight: "12px" }}> 3 </Typography>
                                <ListItemText primary="Tại nhà" secondary="Nhân viên y tế đến xét nghiệm tại nhà - lấy kết quả online" />
                            </ListItem>
                       </List>
                </div>

                <div className='service-description'>
                        <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}} >
                            <BookmarksIcon fontSize='small' color='primary' />
                            <span>Mô tả chi tiết</span>
                        </h4>
                        <Divider />
                        <p>{service?.description}</p>
                </div>
            </div>


            <div id="labtest-section">
                <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}} >
                    <BookmarksIcon fontSize='small' color='primary' />
                    <span>Hạng mục xét nghiệm</span>
                </h4>
                <Accordion sx={{ boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        sx={{
                            boxShadow: 'none', // Remove the shadow
                            '&:before': {
                              display: 'none', // Remove the divider line above Accordion
                            },
                          }}
                    >
                        <h4>Xét nghiệm tổng máu 27 chỉ số</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            <li>AST(GOT)</li>
                            <li>Billrubin trực tiếp</li>
                            <li>Billrubin gián tiếp</li>
                            <li>GGT</li>
                            <li>glucose máu</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ boxShadow: 'none' }}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}
                        sx={{
                            boxShadow: 'none', // Remove the shadow
                            '&:before': {
                              display: 'none', // Remove the divider line above Accordion
                            },
                          }}
                    >
                        <h4>Xét nghiệm tổng phân tích nước tiểu</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            <li>AST(GOT)</li>
                            <li>Billrubin trực tiếp</li>
                            <li>Billrubin gián tiếp</li>
                            <li>GGT</li>
                            <li>glucose máu</li>
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </div>

            <div id="book-action">
                <button id="book-btn" onClick={() => setToogleBookingPopUp(true)}>Đặt lịch ngay</button>
                <button id="advise-btn">Tư vấn ngay</button>
            </div>


            <BookingPopUp open={toogleBookingPopUp} onClose={() => setToogleBookingPopUp(false)} facility={service?.medical_facility} id={id}/>
        </div>
    );
}

export default ServicePage;
