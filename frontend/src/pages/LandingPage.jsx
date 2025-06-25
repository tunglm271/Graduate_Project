import React from "react";
import { Container, Grid, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ServiceCard from "../components/card/ServiceCard";
import FacilityCard from "../components/card/FacilityCard";
import api from "../service/api.js";
import { Link, Navigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import Cookies from "js-cookie";

const IntroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  color: "white",
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.spacing(2),
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
  },
}));

const IntroImage = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100%",
  minHeight: "400px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: theme.spacing(2),
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  },
}));

const CardContainer = styled(Box)(({ theme }) => ({
  "& .service-card, & .facility-card": {
    backgroundColor: "white",
    borderRadius: theme.spacing(2),
    boxShadow: "0 4px 6px rgba(173, 216, 230, 0.7)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
}));

// Mock data for demonstration
const mockServices = [
  {
    id: 1,
    name: "Khám Tổng Quát",
    thumbnail: "/images/service1.jpg",
    price: 500000,
    service_audience_gender: "both",
  },
  {
    id: 2,
    name: "Khám Nhi",
    thumbnail: "/images/service2.jpg",
    price: 300000,
    service_audience_gender: "both",
  },
  {
    id: 3,
    name: "Khám Phụ Khoa",
    thumbnail: "/images/service3.jpg",
    price: 400000,
    service_audience_gender: "female",
  },
];

const mockFacilities = [
  {
    id: 1,
    facility_name: "Phòng Khám Đa Khoa Hà Nội",
    logo: "/images/clinic1.jpg",
    address: "123 Đường Láng, Đống Đa, Hà Nội",
  },
  {
    id: 2,
    facility_name: "Phòng Khám Nhi Đồng",
    logo: "/images/clinic2.jpg",
    address: "456 Nguyễn Văn Cừ, Long Biên, Hà Nội",
  },
  {
    id: 3,
    facility_name: "Phòng Khám Sản Phụ Khoa",
    logo: "/images/clinic3.jpg",
    address: "789 Trần Duy Hưng, Cầu Giấy, Hà Nội",
  },
];

export default function LandingPage() {
  const [services, setServices] = React.useState([]);
  const [facilities, setFacilities] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const isAuthenticated = !!Cookies.get("token");

  if(isAuthenticated) {
    return <Navigate to="/home" />;
  }

  React.useEffect(() => {
    setLoading(true);
    api
      .get("landing-page")
      .then((response) => {
        console.log("Landing page data:", response.data);
        // Safely handle the response data
        if (response.data && Array.isArray(response.data.services)) {
          setServices(response.data.services);
        } else {
          setServices(mockServices);
        }

        if (response.data && Array.isArray(response.data.facilities)) {
          setFacilities(response.data.facilities);
        } else {
          setFacilities(mockFacilities);
        }
      })
      .catch((error) => {
        console.error("Error fetching landing page data:", error);
        // Use mock data as fallback
        setServices(mockServices);
        setFacilities(mockFacilities);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return (
    <div className="p-5">
      {/* Introduction Section */}
      <IntroSection>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <p className="text-4xl font-bold mb-4 text-white">
                  Kết Nối Y Tế Thông Minh
                </p>
                <p className="text-xl mb-6 text-white">
                  Nền tảng kết nối người dùng với các cơ sở y tế uy tín
                </p>
                <p className="text-base mb-8 text-white/90 leading-relaxed">
                  Chúng tôi cung cấp giải pháp kết nối thông minh giữa người
                  dùng và các cơ sở y tế. Với hệ thống đặt lịch trực tuyến, quản
                  lý hồ sơ y tế và đánh giá dịch vụ, chúng tôi giúp bạn dễ dàng
                  tiếp cận các dịch vụ y tế chất lượng cao.
                </p>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{
                      backgroundColor: "white",
                      color: "#2196F3",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    Tìm Dịch Vụ
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                    component={Link}
                    to="/auth/facility-register"
                  >
                    Đăng Ký Cơ Sở
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <IntroImage>
                <img
                  src="https://media.vneconomy.vn/images/upload/2024/12/02/du-lieu-y-te-1.jpg"
                  alt="Kết nối y tế thông minh"
                />
              </IntroImage>
            </Grid>
          </Grid>
        </Container>
      </IntroSection>

      {/* Featured Services Section */}
      <Container sx={{ py: 8 }}>
        <p className="text-3xl font-bold mb-6">Dịch Vụ Nổi Bật</p>
        <CardContainer>
          <Grid container spacing={4}>
            {loading
              ? // Show loading state
                Array.from(new Array(3)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "white",
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        height={200}
                        sx={{ mb: 2 }}
                      />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </Box>
                  </Grid>
                ))
              : services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service.id}>
                    <ServiceCard service={service} />
                  </Grid>
                ))}
          </Grid>
        </CardContainer>
      </Container>

      {/* Featured Facilities Section */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 8 }}>
        <Container>
          <p className="text-3xl font-bold mb-6">Cơ Sở Y Tế Uy Tín</p>
          <CardContainer>
            <Grid container spacing={4}>
              {loading
                ? // Show loading state
                  Array.from(new Array(3)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 2,
                          boxShadow: 1,
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          height={200}
                          sx={{ mb: 2 }}
                        />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </Box>
                    </Grid>
                  ))
                : facilities.map((facility) => (
                    <Grid item xs={12} sm={6} md={4} key={facility.id}>
                      <FacilityCard facility={facility} />
                    </Grid>
                  ))}
            </Grid>
          </CardContainer>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container sx={{ py: 8 }}>
        <p className="text-3xl font-bold text-center mb-8">
          Cách Thức Hoạt Động
        </p>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center", p: 2 }}>
              <LocalHospitalIcon
                sx={{ fontSize: 60, color: "#2196F3", mb: 2 }}
              />
              <p className="text-xl font-semibold mb-3">Tìm Kiếm</p>
              <p className="text-gray-600">
                Tìm kiếm dịch vụ y tế phù hợp từ các cơ sở uy tín
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center", p: 2 }}>
              <HealthAndSafetyIcon
                sx={{ fontSize: 60, color: "#2196F3", mb: 2 }}
              />
              <p className="text-xl font-semibold mb-3">So Sánh & Lựa Chọn</p>
              <p className="text-gray-600">
                So sánh giá và đánh giá để chọn dịch vụ tốt nhất
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center", p: 2 }}>
              <SearchIcon sx={{ fontSize: 60, color: "#2196F3", mb: 2 }} />
              <p className="text-xl font-semibold mb-3">Đặt Lịch</p>
              <p className="text-gray-600">
                Đặt lịch khám nhanh chóng và nhận xác nhận ngay lập tức
              </p>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
