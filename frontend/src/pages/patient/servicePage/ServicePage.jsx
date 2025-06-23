import "./service.css";
import { Breadcrumbs, Divider, Skeleton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import BookingPopUp from "../../../components/dialog/BookingPopUp";
import { useEffect, useState } from "react";
import medicalServiceApi from "../../../service/medicalServiceAPi";
import ServiceCard from "../../../components/card/ServiceCard";
import { useTranslation } from "react-i18next";
const ServicePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [toogleBookingPopUp, setToogleBookingPopUp] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    medicalServiceApi
      .getByIdForPatient(id)
      .then((res) => {
        console.log(res.data);
        setService(res.data.service);
        setRecommendations(res.data.recommmend_services);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div id="service-page">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/services" style={{ color: "#007bff" }}>
          Dịch vụ
        </Link>
        {loading ? (
          <Skeleton variant="text" width={200} height={40} />
        ) : (
          <Typography sx={{ color: "text.primary", fontStyle: "italic" }}>
            {service?.name}
          </Typography>
        )}
      </Breadcrumbs>

      <div className="flex max-lg:flex-col justify-between items-start gap-4">
        <div className="flex flex-col gap-4 w-full lg:w-[70%]">
          <div id="service-content">
            {loading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={300}
                  sx={{ borderRadius: "10px", marginBottom: "20px" }}
                />
                <Skeleton
                  variant="text"
                  width={"100%"}
                  height={40}
                  sx={{ marginBottom: "10px" }}
                />
                <Skeleton
                  variant="text"
                  width={"100%"}
                  height={40}
                  sx={{ marginBottom: "10px" }}
                />
                <Skeleton
                  variant="text"
                  width={"100%"}
                  height={40}
                  sx={{ marginBottom: "10px" }}
                />
              </>
            ) : (
              <>
                <img src={service?.thumbnail} alt="" />
                <div className="service-title">
                  <h3>{service?.name}</h3>
                  <h2
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      marginTop: "10px",
                    }}
                  >
                    {service?.price} đ{" "}
                    <span
                      style={{
                        background: "red",
                        color: "white",
                        fontSize: "14px",
                        padding: "3px",
                        borderRadius: "15px",
                      }}
                    >
                      -9%
                    </span>
                  </h2>
                  <h4>{service?.price} đ</h4>
                </div>
              </>
            )}

            <div className="service-infor">
              <h4
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <BookmarksIcon fontSize="small" color="primary" />
                <span>Thông tin gói khám</span>
              </h4>
              <Divider />
              <ul>
                <li>
                  <span>Hình thức thực hiện</span>
                  <span>Tại cơ sở y tế</span>
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
                  <span>{t(service?.service_audience_gender)}</span>
                </li>
                <li>
                  <span>Độ tuổi</span>
                  <span>Dưới 40</span>
                </li>
              </ul>
            </div>

            <div className="service-location">
              <h4
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <BookmarksIcon fontSize="small" color="primary" />
                <span>Thông tin cơ sở khám</span>
              </h4>
              <Divider />

              <div className="my-4">
                {loading ? (
                  <>
                    <div className="info-item flex items-start gap-3 mb-4">
                      <div className="w-1/4">
                        <Skeleton variant="text" width="80%" height={24} />
                      </div>
                      <div className="w-3/4">
                        <Skeleton variant="text" width="90%" height={24} />
                      </div>
                    </div>
                    <div className="info-item flex items-start gap-3 mb-4">
                      <div className="w-1/4">
                        <Skeleton variant="text" width="80%" height={24} />
                      </div>
                      <div className="w-3/4">
                        <Skeleton variant="text" width="90%" height={24} />
                      </div>
                    </div>
                    <div className="info-item flex items-start gap-3">
                      <div className="w-1/4">
                        <Skeleton variant="text" width="80%" height={24} />
                      </div>
                      <div className="w-3/4">
                        <Skeleton variant="text" width="90%" height={24} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="info-item flex items-start gap-3 mb-4">
                      <div className="w-1/4 font-medium text-gray-600">
                        Tên cơ sở
                      </div>
                      <div className="w-3/4">
                        <p className="font-semibold text-gray-800">
                          {service?.medical_facility?.facility_name}
                        </p>
                      </div>
                    </div>
                    <div className="info-item flex items-start gap-3 mb-4">
                      <div className="w-1/4 font-medium text-gray-600">
                        Địa chỉ
                      </div>
                      <div className="w-3/4">
                        <p className="font-semibold text-gray-800">
                          {service?.medical_facility?.address}
                        </p>
                      </div>
                    </div>
                    <div className="info-item flex items-start gap-3">
                      <div className="w-1/4 font-medium text-gray-600">
                        Giờ làm việc
                      </div>
                      <div className="w-3/4">
                        <p className="font-semibold text-gray-800">
                          {service?.medical_facility?.working_time ||
                            "08:00 - 17:00"}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="service-description">
              <h4
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <BookmarksIcon fontSize="small" color="primary" />
                <span>Mô tả chi tiết</span>
              </h4>
              <Divider />
              <p className="mt-2">{service?.description}</p>
            </div>
          </div>

          <div id="labtest-section">
            <h4
              style={{
                marginBottom: "5px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <BookmarksIcon fontSize="small" color="primary" />
              <span>Hạng mục xét nghiệm</span>
            </h4>
            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{
                  boxShadow: "none", // Remove the shadow
                  "&:before": {
                    display: "none", // Remove the divider line above Accordion
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
            <Accordion sx={{ boxShadow: "none" }}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{
                  boxShadow: "none", // Remove the shadow
                  "&:before": {
                    display: "none", // Remove the divider line above Accordion
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
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-[30%]">
          <img
            src="https://nuu.edu.vn/wp-content/uploads/quang-cao-phong-kham-da-khoa-nhu-the-nao-1024x1024.jpg"
            alt=""
            className="rounded-lg hidden lg:block"
          />
          <img
            src="https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/032025/6-3.4_20250306091709.jpg"
            alt=""
            className="rounded-lg hidden lg:block"
          />
          <p className="font-semibold text-lg">Các dịch vụ khác</p>
          {recommendations?.length > 0 ? (
            recommendations.map((item) => (
              <ServiceCard service={item} key={item.id} />
            ))
          ) : (
            <p>Không có dịch vụ nào</p>
          )}
        </div>
      </div>

      <div id="book-action">
        <button id="book-btn" onClick={() => setToogleBookingPopUp(true)}>
          Đặt lịch ngay
        </button>
        <button id="advise-btn">Tư vấn ngay</button>
      </div>

      <BookingPopUp
        open={toogleBookingPopUp}
        onClose={() => setToogleBookingPopUp(false)}
        facility={service?.medical_facility}
        id={id}
      />
    </div>
  );
};

export default ServicePage;
