import "./service.css";
import {
  Divider,
  Button,
  IconButton,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterPopUp from "../../../components/dialog/FilterPopUp";
import SearchIcon from "@mui/icons-material/Search";
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
import medicalServiceApi from "../../../service/medicalServiceAPi";
import SearchResult from "./SearchResult";

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState(false);
  const [facilityList, setFacilityList] = useState([]);
  const [servicesList, setServiceList] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState({
    maxPrice: 4000000,
    gender: "all",
  });

  useEffect(() => {
    medicalServiceApi.getAll().then((res) => {
      setFacilityList(res.data.facilities);
      setServiceList(res.data.services);
      setLoading(false);
    });
  }, []);

  const submitSearch = () => {
    setSearchResult(true);
    setLoading(true);
    medicalServiceApi.getAll({ q: search, ...filterData }).then((res) => {
      setFacilityList(res.data.facilities);
      setServiceList(res.data.services);
      setLoading(false);
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 3 : 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: !isMobile,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
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
  ];

  const renderLoadingSkeletons = () => (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} variant="rounded" height={120} />
        ))}
      </div>
      <div className="mb-8">
        <Skeleton variant="text" width="40%" height={40} className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} variant="rounded" height={200} />
          ))}
        </div>
      </div>
      <div>
        <Skeleton variant="text" width="40%" height={40} className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} variant="rounded" height={150} />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div id="services-page" className="p-4 md:p-6">
      <div
        id="service-search-bar"
        className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm mb-6"
      >
        <Button
          startIcon={<FilterAltIcon />}
          onClick={() => setFilterOpen(true)}
          className="text-gray-600 hover:bg-gray-100"
        >
          Bộ lọc
        </Button>
        <Divider orientation="vertical" flexItem />
        <input
          type="text"
          placeholder="Tìm kiếm dịch vụ"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border-none focus:outline-none"
        />
        <IconButton
          onClick={submitSearch}
          className="text-gray-600 hover:bg-gray-100"
        >
          <SearchIcon />
        </IconButton>
      </div>

      {loading ? (
        renderLoadingSkeletons()
      ) : searchResult ? (
        <SearchResult loading={loading} services={servicesList} />
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Danh mục khám</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {serviceCategories.map((category, index) => (
              <button
                key={index}
                className="service-category-card hover:shadow-md transition-shadow duration-200"
              >
                {category.icon}
                <p className="text-sm mt-2">{category.label}</p>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Dịch vụ nổi bật</h2>
            <div className="px-2">
              <Slider {...settings}>
                {servicesList.map((service, index) => (
                  <div key={index} className="px-2">
                    <VerticalServiceCard service={service} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Cơ sở y tế đặt khám nhiều nhất
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {facilityList.map((facility, index) => (
                <FacilityVerticalCard key={index} facility={facility} />
              ))}
            </div>
          </div>
        </>
      )}

      <FilterPopUp
        open={filterOpen}
        handleFilter={setFilterData}
        onClose={() => setFilterOpen(false)}
      />
    </div>
  );
};

export default Services;
