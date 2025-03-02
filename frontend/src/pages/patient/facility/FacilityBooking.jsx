import { Breadcrumbs, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InpatientIcon from "@icon/service-category/InpatientIcon";
import StethoscopeIcon from "@icon/StethoscopeIcon";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { useState } from "react";
import "./facility-booking.css"
import BookingPopUp from "../../../components/dialog/BookingPopUp";
const FacilityBooking = () => {
    const [toogleBookingPopUp, setToogleBookingPopUp] = useState(false);
    const [bookingType, setBookingType] = useState("");

    return (
        <div style={{padding: "20px"}}> 
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/facility" className="text-decoration-none">Cơ sở y tế</Link>
                <Typography color="text.primary">Đặt lịch khám</Typography>
            </Breadcrumbs>
            <div className="flex justify-center gap-7" style={{ marginTop: "20px" }}>
                <div className="w-1/4 bg-white rounded-lg h-fit" style={{ marginTop: "70px", padding: "10px", boxShadow: "0 4px 8px rgba(173, 216, 230, 0.5)"}}>
                    <h3 className="text-center" style={{marginBottom: "1rem"}}>THông tin cơ sở</h3>
                    <div className="flex justify-between gap-2">
                        <InpatientIcon size={30}/>
                        <div className="w-5/6">
                            <h4>Bệnh Viện Mắt</h4>
                            <p className="text-xs">280 Điện Biên Phủ, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh</p>
                        </div>
                    </div>
                </div>
                <div className={`w-2/3 flex flex-col gap-2 ${bookingType === "" ? "fade-in" : "fade-out"}`}>
                    <div className="text-center">
                        <h2>Chọn hình thức đặt khám</h2>
                        <p>Đặt khám nhanh chóng, không phải chờ đợi với nhiều cơ sở y tế trên khắp các tỉnh thành</p>
                    </div>
                    <button className="booking-option" onClick={() => setBookingType("service")}>
                        <CalendarMonthIcon />
                        Đặt lịch khám theo dịch vụ
                    </button>
                    <button className="booking-option" onClick={() => setBookingType("doctor")}>
                        <StethoscopeIcon />
                        Đặt khám theo bác sĩ
                    </button>
                    <button className="booking-option" onClick={() => setBookingType("re-exam")}>
                        <CalendarMonthIcon />
                        Đặt lịch tái khám
                    </button>
                </div>

                <div className={`w-2/3 flex flex-col gap-2 ${bookingType === "service" ? "fade-in" : "fade-out"}`}>
                    <div className="text-center">
                        <h2>Chọn dịch vụ khám</h2>
                    </div>
                    <div className="option-list">
                    <table className="text-left w-full border-collapse text-[#003553]">
                        <thead>
                            <tr className="border-b">
                                <th className="w-[50px]" style={{ padding: "30px 10px" }}>#</th>
                                <th className="w-1/2">Dịch vụ</th>
                                <th className="w-[100px] whitespace-normal break-words">Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="w-[50px]" style={{ padding: "30px 10px" }}>1</td>
                                <td className="w-1/2 text-left">
                                    <p className="font-bold">Khám tổng quát</p>
                                    <p className="italic">Thời gian: 30 phút</p>
                                </td>
                                <td className="w-[100px] whitespace-normal break-words">200.000 VND</td>
                                <td>
                                    <div className="flex gap-2" style={{ paddingLeft: "8px" }}>
                                        <Link to={`/services/1`} className="bg-[#ecf5ff] rounded-lg text-blue-400 font-semibold hover:bg-white" style={{ padding: "8px" }}>Chi tiết</Link>
                                        <button className="register-btn" onClick={() => setToogleBookingPopUp(true)}>Đặt lịch ngay</button>
                                    </div>
                                </td>
                            </tr>

                            <tr className="border-b">
                                <td className="w-[50px]" style={{ padding: "30px 10px" }}>2</td>
                                <td className="w-1/2 text-left">
                                    <p className="font-bold">Khám BHYT</p>
                                    <p className="italic">Thời gian: 30 phút</p>
                                </td>
                                <td className="w-[100px] whitespace-normal break-words">Thanh toán trực tiếp</td>
                                <td>
                                    <div className="flex gap-2" style={{ paddingLeft: "8px" }}>
                                        <Link href="#" className="bg-[#ecf5ff] rounded-lg text-blue-400 font-semibold hover:bg-white" style={{ padding: "8px" }}>Chi tiết</Link>
                                        <button className="register-btn">Đặt lịch ngay</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <button 
                        onClick={() => setBookingType("")} 
                        className="flex gap-2 items-center cursor-pointer rounded-lg justify-start hover:bg-slate-200 w-fit" 
                        style={{padding: "7px 10px"}}
                    >
                        Quay lại
                        <KeyboardReturnIcon />
                    </button>
                </div>  
            </div>
             <BookingPopUp open={toogleBookingPopUp} onClose={() => setToogleBookingPopUp(false)} />
        </div>
    );
}

export default FacilityBooking;
