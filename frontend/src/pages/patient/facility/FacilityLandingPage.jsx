import {
  Breadcrumbs,
  Divider,
  Button,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useParams, useNavigate  } from "react-router-dom";
import "./facility-landing-page.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import VerticalServiceCard from "../../../components/card/VerticalServiceCard";
import AppContext from "../../../context/AppContext";
import Slider from "react-slick";
import { useContext, useEffect, useState } from "react";
import facilityApi from "../../../service/FacilityApi";
import Map from "../../../components/Map";
import ParagraphSkeleton from "../../../components/loading/ParagraphSkeleton";
import Cookies from "js-cookie";


const doctorDefaultImg =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

const FacilityLandingPage = () => {
  const { setChatbox } = useContext(AppContext);
  const { facilityId } = useParams();
  const [loading, setLoading] = useState(true);
  const [facility, setFacility] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isAuthenticated = !!Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    facilityApi.getById(facilityId).then((res) => {
      setFacility(res.data);
      setLoading(false);
    });
  }, [facilityId]);

  const settings = {
    slidesToShow: isMobile ? 2 : 4,
    slidesToScroll: 1,
    dots: isMobile,
    infinite: true,
    speed: 500,
    autoplay: !isMobile,
    autoplaySpeed: 3000,
  };

  return (
    <div className="facility-landing-page">
      <Breadcrumbs sx={{ marginBottom: "1rem" }} aria-label="breadcrumb">
        <Link to="/home">Trang chủ</Link>
        <Link to="/patient/facility" className="font-semibold">
          {facility.facility_name}
        </Link>
      </Breadcrumbs>
      <div
        className={`flex ${
          isMobile ? "flex-col" : "flex-row"
        } justify-between items-start gap-8`}
      >
        <div className={`${isMobile ? "w-full" : "w-1/3"}`}>
          <div className="facility-info bg-white">
            {loading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  width="200px"
                  height="200px"
                  sx={{ mb: "1rem", mx: "auto" }}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  sx={{ mb: "1rem", mx: "auto" }}
                />
              </>
            ) : (
              <>
                <img src={facility.logo} alt="" className="mx-auto" />
                <p className="text-[#007bff] font-bold text-center text-xl block">
                  {facility.facility_name}
                </p>
              </>
            )}
            <Divider />
            <p className="flex items-center gap-2">
              <LocationOnIcon />
              {loading ? (
                <Skeleton variant="text" width="70%" sx={{ mb: "1rem" }} />
              ) : (
                facility.address
              )}
            </p>
            <p className="flex items-center gap-2">
              <AccessTimeIcon />
              {loading ? (
                <Skeleton variant="text" width="70%" sx={{ mb: "1rem" }} />
              ) : (
                facility.working_time || "Không có thông tin"
              )}
            </p>
            <p className="flex items-center gap-2">
              <LocalPhoneIcon />
              {loading ? (
                <Skeleton variant="text" width="70%" sx={{ mb: "1rem" }} />
              ) : (
                `Hỗ trợ đặt khám: ${facility.phone || "Không có thông tin"}`
              )}
            </p>
            <div className="flex flex-col gap-2">
              <Button
                variant="outlined"
                sx={{
                  p: "7px",
                  borderRadius: "20px",
                  textTransform: "none",
                }}
                onClick={() =>
                {
                  if (isAuthenticated) {
                    setChatbox({
                      contactId: facility.user_id?.toString(),
                      contactName: facility.facility_name,
                    })
                  } else {
                    navigate("/auth/login", {
                      state: { from: `/clinic/${facilityId}` },
                    });
                  }
                }
                }
              >
                Liên hệ
              </Button>
              <Link
                className="text-center text-blue-600 hover:text-blue-800"
                to={`/booking/${facilityId}`}
              >
                Đặt khám ngay
              </Link>
            </div>
          </div>

          <div className="facility-doctors">
            <ul className="divide-y">
              {facility?.doctors &&
                facility.doctors.map((doc, index) => (
                  <li
                    key={index}
                    className="flex gap-4 items-center justify-start p-4"
                  >
                    <img
                      src={doc.avatar || doctorDefaultImg}
                      alt="doctor-avatar"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">BS. {doc.name}</p>
                      <p className="text-sm text-gray-600">Chức danh: {doc.position}</p>
                      <p className="text-sm text-gray-600">
                        Chuyên khoa: {doc.specialization}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className={`${isMobile ? "w-full" : "w-2/3"}`}>
          <div className="facility-description bg-white">
            <img
              src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e35b250-4872-4384-b3c9-5bebe7b48939-gt1.jpg&w=3840&q=75"
              alt="clinic-thumbnail"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="flex flex-col gap-4 p-4">
              {loading ? (
                <ParagraphSkeleton />
              ) : (
                <div
                  className="ProseMirror"
                  dangerouslySetInnerHTML={{ __html: facility.description }}
                />
              )}
            </div>
          </div>

          <div className="facility-services">
            <p className="text-center font-bold text-3xl text-[#007bff] my-4">
              Các dịch vụ
            </p>
            <div className="px-2">
              <Slider {...settings}>
                {facility.services?.map((service, index) => (
                  <div key={index} className="px-2">
                    <VerticalServiceCard service={service} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Map />
      </div>
    </div>
  );
};

export default FacilityLandingPage;
