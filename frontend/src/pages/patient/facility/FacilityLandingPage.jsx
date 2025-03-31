import { Breadcrumbs, Divider, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./facility-landing-page.css"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VerticalServiceCard from "../../../components/card/VerticalServiceCard";
import AppContext from "../../../context/AppContext";
import Slider from "react-slick";
import { useContext, useEffect, useState } from "react";
import facilityApi from "../../../service/FacilityApi";
import Map from "../../../components/Map";

const doctorDefaultImg = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"


const FacilityLandingPage = () => {
    const { setChatbox } = useContext(AppContext);
    const { facilityId } = useParams();
    const [facility, setFacility] = useState({});

    useEffect(() => {
        facilityApi.getById(facilityId).then((res) => {
            console.log(res.data);
            setFacility(res.data);
        });
    }, [facilityId]);


    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
      };
    

    return (
        <div className="facility-landing-page">
            <Breadcrumbs sx={{marginBottom: "1rem"}} aria-label="breadcrumb">
                <Link to="/home">Trang chủ</Link>
                <Link to="/patient/facility" className="font-semibold">{facility.facility_name}</Link>
            </Breadcrumbs>
            <div className="flex justify-between items-start gap-8">
                <div className="w-1/3">
                    <div className="facility-info">
                        <img src={facility.logo} alt="" />
                        <p className="text-[#007bff] font-bold text-center text-xl" style={{display: "block"}}>{facility.facility_name}</p>
                        <Divider />
                        <p>
                            <LocationOnIcon />
                            {facility.address}
                        </p>
                        <p>
                            <AccessTimeIcon />
                            {facility.working_time || "Không có thông tin"}
                        </p>
                        <p>
                            <LocalPhoneIcon />
                            Hỗ trợ đặt khám: {facility.phone || "Không có thông tin"} 
                        </p>
                        <Button 
                            variant="outlined" 
                            sx={{
                                p: "7px",
                                borderRadius: "20px",
                                textTransform: "none",
                            }}
                            onClick={() => setChatbox({contactId: facility.user_id?.toString(), contactName: facility.facility_name})}
                        >
                            Liên hệ
                        </Button>
                        <Link>
                            Đặt khám ngay
                        </Link>
                    </div>

                    <div className="facility-doctors">
                        <ul>
                            {facility?.doctors && facility.doctors.map((doc, index) => (
                                <li key={index} className="flex gap-4 items-center justify-start" style={{padding: "1rem"}}>
                                    <img src={doc.avatar || doctorDefaultImg} alt="doctor-avatar" className="doctor-avatar" />
                                    <div>
                                        <p className="font-semibold">{doc.name}</p>
                                        <p>{doc.position}</p>
                                        <p>Chuyên trị: {doc.specialization}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>

                <div className="w-2/3">
                    <div className="facility-description">
                        <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn.medpro.vn%2Fprod-partner%2F9e35b250-4872-4384-b3c9-5bebe7b48939-gt1.jpg&w=3840&q=75" alt="clinic-thumbnail" className="clinic-thumbnail"/>
                        <div className="flex flex-col gap-4" style={{padding: "1rem"}}>
                           <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: facility.description }} />
                        </div>
                    </div>

                    <div className="facility-services">
                        <p className="text-center font-bold text-3xl" style={{
                            margin: "1rem 0",
                            color: "#007bff"
                        }}>Các dịch vụ</p>
                        <Slider {...settings} style={{padding: "5px 0"}}>
                           {facility.services?.map((service, index) => (
                                <VerticalServiceCard key={index} service={service} />
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
            <Map />
        </div>
    );
}

export default FacilityLandingPage;
