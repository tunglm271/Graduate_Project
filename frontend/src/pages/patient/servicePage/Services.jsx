import "./service.css"
import { Select, MenuItem, FormControl, Radio,RadioGroup, FormControlLabel, FormLabel, Divider, Button} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterPopUp from "../../../components/dialog/FilterPopUp";
import SearchIcon from '@mui/icons-material/Search';
import PediatricsIcon from "@icon/service-category/PediatricsIcon";
import InfectiousIcon from "@icon/service-category/InfectiousIcon";
import InpatientIcon from "@icon/service-category/InpatientIcon";
import ObstetricsIcon from "@icon/service-category/ObstetricsIcon";
import DnaIcon from "@icon/service-category/DnaIcon";
import ToothIcon from "@icon/service-category/ToothIcon";
import GeneralIcon from "@icon/service-category/GeneralIcon";
import InternalMedicineIcon from "@icon/service-category/InternalMedicineIcon";
import { useEffect, useState } from "react";
import VerticalServiceCard from "../../../components/card/VerticalServiceCard";
import FacilityVerticalCard from "../../../components/card/FacilityVerticalCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import facilityApi from "../../../service/FacilityApi";
const Services = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [facilityList, setFacilityList] = useState([]);

    useEffect(() => {
        facilityApi.getAll().then((res) => {
            console.log(res.data);
            setFacilityList(res.data);
        });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
      };
    const serviceCategories = [
        {
            label: "Khoa nhi",
            icon: <PediatricsIcon />,
        },
        {
            label: "Bệnh lây nhiễm",
            icon: <InfectiousIcon />,
        },
        {
            label: "Dịch vụ nội trú",
            icon: <InpatientIcon />,
        },
        {
            label: "Khoa sản",
            icon: <ObstetricsIcon />,
        },
        {
            label: "Tầm soát ưng thư",
            icon: <DnaIcon />,
        },
        {
            label: "Răng hàm mặt",
            icon: <ToothIcon />,
        },
        {
            label: "Khám tổng quát",
            icon: <GeneralIcon />,
        },
        {
            label: "Nội khoa",
            icon: <InternalMedicineIcon />,
        },
    ]

    return (
        <div id='services-page'>
            <div id="service-search-bar">
                <SearchIcon />
                <input type="text" placeholder="Tìm kiếm dịch vụ" />
                <Divider orientation="vertical" flexItem sx={{marginLeft: "auto"}}/>
                <Button startIcon={<FilterAltIcon />} color="#e4e5ea" onClick={() => setFilterOpen(true)}>Bộ lọc</Button>
            </div>
            <h2>Danh mục khám</h2>
            <div className="categories-list">
                {
                    serviceCategories.map((category, index) => (
                        <button key={index} className="service-category-card">
                            {category.icon}
                            <p>{category.label}</p>
                        </button>
                    ))
                }
            </div>
            <div style={{margin: "20px 0"}}>
                <h2>Dịch vụ nổi bật</h2>
            </div>
            <Slider {...settings} style={{padding: "5px 0"}}>
                <VerticalServiceCard />
                <VerticalServiceCard />
                <VerticalServiceCard />
                <VerticalServiceCard />
                <VerticalServiceCard />
                <VerticalServiceCard />
                <VerticalServiceCard />
            </Slider>
            <div style={{margin: "30px 0"}}>
                <h2>Cơ sở y tế đặt khám nhiều nhất</h2>
            </div>
            <div className="flex justify-between">
                {facilityList.map((facility, index) => (
                    <FacilityVerticalCard key={index} facility={facility} />
                ))}
            </div>

            <FilterPopUp open={filterOpen} onClose={() => setFilterOpen(false)} />
        </div>
    );
}

export default Services;
