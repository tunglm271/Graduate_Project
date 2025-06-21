import { Breadcrumbs, Typography, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import InpatientIcon from "@icon/service-category/InpatientIcon";
import StethoscopeIcon from "@icon/StethoscopeIcon";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useState, useEffect } from "react";
import "./facility-booking.css";
import facilityApi from "../../../service/FacilityApi";
import { formatCurrency } from "../../../utlis/caculateFun";
import doctorDefaultImg from "../../../assets/images/doctor.png";
import BookingPopUp from "../../../components/dialog/BookingPopUp";

const FacilityBooking = () => {
  const [loading, setLoading] = useState(true);
  const { facilityId } = useParams();
  const [facility, setFacility] = useState({});
  const [bookingType, setBookingType] = useState("");
  const [toogleBookingPopUp, setToogleBookingPopUp] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    facilityApi.getById(facilityId).then((res) => {
      setFacility(res.data);
      setLoading(false);
      console.log(res.data);
    });
  }, [facilityId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Breadcrumbs aria-label="breadcrumb" className="mb-4">
        <Link to="/facility" className="text-decoration-none hover:underline">
          Cơ sở y tế
        </Link>
        <Link
          to={`/clinic/${facilityId}`}
          className="text-decoration-none hover:underline"
        >
          {facility.facility_name}
        </Link>
        <Typography color="text.primary">Đặt lịch khám</Typography>
      </Breadcrumbs>
      <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-7 mb-5">
        <div
          className="w-full lg:w-1/4 bg-white rounded-lg h-fit"
          style={{
            marginTop: "70px",
            padding: "10px",
            boxShadow: "0 4px 8px rgba(173, 216, 230, 0.5)",
          }}
        >
          <h3 className="text-center" style={{ marginBottom: "1rem" }}>
            Thông tin cơ sở
          </h3>
          <div className="flex justify-between gap-2">
            <InpatientIcon size={30} />
            <div className="w-5/6">
              <h4>{facility.facility_name}</h4>
              <p className="text-xs">{facility.address}</p>
            </div>
          </div>
        </div>
        <div
          className={`w-full lg:w-2/3 flex flex-col gap-2 ${
            bookingType === "" ? "fade-in" : "fade-out"
          }`}
        >
          <div className="text-center">
            <h2>Chọn hình thức đặt khám</h2>
            <p>
              Đặt khám nhanh chóng, không phải chờ đợi với nhiều cơ sở y tế trên
              khắp các tỉnh thành
            </p>
          </div>
          <button
            className="booking-option"
            onClick={() => setBookingType("service")}
          >
            <CalendarMonthIcon />
            Đặt lịch khám theo dịch vụ
          </button>
          <button
            className="booking-option"
            onClick={() => setBookingType("doctor")}
          >
            <StethoscopeIcon />
            Đặt khám theo bác sĩ
          </button>
          <button
            className="booking-option"
            onClick={() => setBookingType("re-exam")}
          >
            <CalendarMonthIcon />
            Đặt lịch tái khám
          </button>
        </div>

        <div
          className={`w-full lg:w-2/3 flex flex-col gap-2 ${
            bookingType === "service" ? "fade-in" : "fade-out"
          }`}
        >
          <div className="text-center">
            <h2>Chọn dịch vụ khám</h2>
          </div>
          <div className="option-list overflow-x-auto">
            <table className="text-left w-full border-collapse text-[#003553]">
              <thead>
                <tr className="border-b">
                  <th className="w-[50px]" style={{ padding: "30px 10px" }}>
                    #
                  </th>
                  <th className="w-1/2">Dịch vụ</th>
                  <th className="w-[100px] whitespace-normal break-words">
                    Giá
                  </th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {facility.services.length > 0 ? (
                  facility.services.map((service, index) => (
                    <tr key={service.id} className="border-b">
                      <td className="w-[50px]" style={{ padding: "30px 10px" }}>
                        {index + 1}
                      </td>
                      <td className="w-1/2 text-left">
                        <p className="font-bold">{service.name}</p>
                        <p className="italic">
                          Thời gian: {service.duration} phút
                        </p>
                      </td>
                      <td className="w-[100px] whitespace-normal break-words">
                        {service.price
                          ? `${formatCurrency(service.price)}`
                          : "Thanh toán trực tiếp"}
                      </td>
                      <td>
                        <div
                          className="flex flex-col sm:flex-row gap-2"
                          style={{ paddingLeft: "8px" }}
                        >
                          <Link
                            to={`/services/${service.id}`}
                            className="bg-[#ecf5ff] rounded-lg text-blue-400 font-bold hover:bg-white text-center"
                            style={{ padding: "8px" }}
                          >
                            Chi tiết
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedService(service.id);
                              setToogleBookingPopUp(true);
                            }}
                            className="register-btn"
                          >
                            Đặt khám ngay
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <p>Không có dịch vụ khám nào</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => {
              setBookingType("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex gap-2 items-center cursor-pointer rounded-lg justify-start hover:bg-slate-200 w-fit"
            style={{ padding: "7px 10px" }}
          >
            Quay lại
            <KeyboardReturnIcon />
          </button>
        </div>

        {/* Doctor List Section */}
        <div
          className={`w-full lg:w-2/3 flex flex-col gap-2 ${
            bookingType === "doctor" ? "fade-in" : "fade-out"
          }`}
        >
          <div className="text-center">
            <h2>Chọn bác sĩ khám</h2>
          </div>
          <div className="option-list overflow-x-auto">
            <table className="text-left w-full border-collapse text-[#003553]">
              <thead>
                <tr className="border-b">
                  <th className="w-[50px]" style={{ padding: "30px 10px" }}>
                    #
                  </th>
                  <th className="w-1/3">Bác sĩ</th>
                  <th className="w-1/4 text-center">Số điện thoại</th>
                  <th className="w-1/4">Chuyên khoa</th>
                  <th className="w-1/4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {facility.doctors && facility.doctors.length > 0 ? (
                  facility.doctors.map((doctor, index) => (
                    <tr key={doctor.id} className="border-b">
                      <td className="w-[50px]" style={{ padding: "30px 10px" }}>
                        {index + 1}
                      </td>
                      <td className="w-1/3 text-left">
                        <div className="flex items-center gap-2">
                          <img
                            src={doctor.avatar || doctorDefaultImg}
                            alt={doctor.name}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                          <div>
                            <p className="font-bold">{doctor.name}</p>
                            <p>{doctor.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="w-1/4 text-center">
                        {doctor.phone || "-"}
                      </td>
                      <td className="w-1/4">{doctor.specialization || "-"}</td>
                      <td className="w-1/4 text-center">
                        <button
                          className="register-btn"
                          onClick={() => {
                            setDoctor(doctor);
                            setToogleBookingPopUp(true);
                          }}
                        >
                          Đặt lịch ngay
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      <p>Không có bác sĩ khám nào</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setBookingType("")}
            className="flex gap-2 items-center cursor-pointer rounded-lg justify-start hover:bg-slate-200 w-fit"
            style={{ padding: "7px 10px" }}
          >
            Quay lại
            <KeyboardReturnIcon />
          </button>
        </div>
      </div>
      <BookingPopUp
        open={toogleBookingPopUp}
        onClose={() => setToogleBookingPopUp(false)}
        facility={facility}
        bookingType={bookingType}
        doctor={doctor}
        id={selectedService}
      />
    </div>
  );
};

export default FacilityBooking;
