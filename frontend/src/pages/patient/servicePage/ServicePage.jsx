import "./service.css"
import { Breadcrumbs, Divider, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import serviceImg from "../../../assets/images/service.png";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
// import LabTestDropDown from "../../../components/LabTestDropDown";
import {Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import BookingPopUp from "../../../components/dialog/BookingPopUp";
import { useState } from "react";

const ServicePage = () => {
    const [toogleBookingPopUp, setToogleBookingPopUp] = useState(false);


    return (
        <div id='service-page'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/services" style={{ color: '#007bff' }}>Dịch vụ</Link>
                <Typography sx={{ color: 'text.primary', fontStyle: 'italic' }}>Gói tầm soát ưng thư nâng cao cho bệnh nhân dưới 40</Typography>
            </Breadcrumbs>


            <div id='service-content'>
                <img src={serviceImg} alt="" />
                <div className="service-title">
                    <h3>Gói tầm soát ưng thư nâng cao cho bệnh nhân dưới 40</h3>
                    <h2 style={{display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px'}}>1,355,000 đ <span style={{background: 'red', color:'white', fontSize: '14px', padding: '3px', borderRadius: '15px'}}>-9%</span></h2>
                    <h4>1,485,000 đ</h4>
                </div>

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
                                <span>60 phút</span>
                            </li>
                            <li>
                                <span>Địa điểm thực hiện</span>
                                <span>Hà Nội</span>
                            </li>
                            <li>
                                <span>Giới tính</span>
                                <span>Nam</span>
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
                        <p>Dịch vụ được cung cấp từ Thứ 2 đến Thứ 7 hàng tuần, khung giờ từ 7:00 sáng đến 5:00 chiều. </p>
                        <p>Dịch vụ khám sức khỏe tổng quát định kỳ giúp phát hiện sớm các vấn đề tiềm ẩn về sức khỏe, hỗ trợ bệnh nhân nắm bắt tình trạng cơ thể, từ đó đưa ra các giải pháp kịp thời nhằm cải thiện và duy trì sức khỏe.</p>
                        <p>Nội dung chính của dịch vụ:
                            Khám lâm sàng toàn diện, bao gồm: kiểm tra huyết áp, đo chỉ số BMI, kiểm tra nhịp tim, phổi và các cơ quan khác.
                            Xét nghiệm máu để phát hiện các bất thường về chức năng gan, thận, đường huyết, mỡ máu,...
                            Siêu âm ổ bụng, đo điện tim, và chụp X-quang nếu cần.</p>
                </div>
            </div>


            <div id="labtest-section">
                <h4 style={{marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}} >
                    <BookmarksIcon fontSize='small' color='primary' />
                    <span>Hạng mục xét nghiệm</span>
                </h4>

                {/* <LabTestDropDown title={"Xét nghiệm tổng máu 27 chỉ số"}>
                    Đánh giá các chỉ số sau trong máu:
                       <ul>
                        <li>AST(GOT)</li>
                        <li>Billrubin trực tiếp</li>
                        <li>Billrubin gián tiếp</li>
                        <li>GGT</li>
                        <li>glucose máu</li>
                       </ul>
                </LabTestDropDown>
                <LabTestDropDown title={"Xét nghiệm tổng phân tích nước tiểu"}>
                    Đánh giá các chỉ số sau trong máu:
                       <ul>
                        <li>AST(GOT)</li>
                        <li>Billrubin trực tiếp</li>
                        <li>Billrubin gián tiếp</li>
                        <li>GGT</li>
                        <li>glucose máu</li>
                       </ul>
                </LabTestDropDown> */}
                <Accordion>
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
                <Accordion>
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


            <BookingPopUp open={toogleBookingPopUp} onClose={() => setToogleBookingPopUp(false)} />
        </div>
    );
}

export default ServicePage;
