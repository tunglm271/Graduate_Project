import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Select,
  Breadcrumbs,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import facilityApi from "../../../service/FacilityApi";
import { getCities } from "../../../hooks/useCachedData";

const facilityTypes = [
  { value: "all", label: "Tất cả" },
  { value: "Bệnh viện đa khoa", label: "Bệnh viện đa khoa" },
  { value: "Bệnh viện chuyên khoa", label: "Bệnh viện chuyên khoa" },
  { value: "Phòng khám đa khoa", label: "Phòng khám đa khoa" },
  { value: "Phòng khám chuyên khoa", label: "Phòng khám chuyên khoa" },
  { value: "Cơ sở xét nghiệm", label: "Phòng xét nghiệm" },
  { value: "Khác", label: "Khác" },
];

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const { data: citiesData, isLoading: isLoadingCities } = getCities();
  const cities = citiesData || [];

  const stripHtmlTags = (str) => {
    if (!str) return "Không có mô tả";
    return str.replace(/<[^>]*>/g, "");
  };

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        const response = await facilityApi.getAll();
        console.log("Fetched facilities:", response.data);
        setFacilities(response.data);
        setFilteredFacilities(response.data);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    let result = facilities;

    // Filter by type
    if (selectedType !== "all") {
      result = result.filter((facility) => facility.facility_type_name === selectedType);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (facility) =>
          facility.facility_name.toLowerCase().includes(searchLower) ||
          facility.address.toLowerCase().includes(searchLower) ||
          stripHtmlTags(facility.description)
            .toLowerCase()
            .includes(searchLower)
      );
    }

    // Filter by location (if implemented)
    if (selectedLocation !== "all") {
      result = result.filter(
        (facility) => facility.city_id == selectedLocation
      );
    }

    setFilteredFacilities(result);
  }, [facilities, searchTerm, selectedType, selectedLocation]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50">
      <Breadcrumbs aria-label="breadcrumb" className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          Trang chủ
        </Link>
        <Typography color="text.primary">Cơ sở y tế</Typography>
      </Breadcrumbs>

      <div className="mb-8">
        <p className="text-2xl md:text-3xl font-bold my-6 text-gray-800">
          Danh sách cơ sở y tế
        </p>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 transition-shadow duration-300 hover:shadow-lg">
          <div className="flex md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm cơ sở y tế..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <Select
              value={selectedType}
              onChange={handleTypeChange}
              native
            >
              {facilityTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
            <Select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="min-w-[200px] bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              native
              disabled={isLoadingCities}
            >
              <option value="all">Tất cả địa điểm</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-4">
          Tìm thấy {filteredFacilities.length} cơ sở y tế
        </p>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <Link
              to={`/clinic/${facility.id}`}
              key={facility.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={facility.logo || "https://via.placeholder.com/400x200"}
                  alt={facility.facility_name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
                  {
                    facilityTypes.find((type) => type.value === facility.type)
                      ?.label
                  }
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                  {facility.facility_name}
                </h3>
                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <LocationOnIcon className="text-sm transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600" />
                  <p className="text-sm line-clamp-1">{facility.address}</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <StarIcon className="transition-transform duration-300 group-hover:animate-pulse" />
                  <span className="text-sm font-medium">
                    {facility.rating || "Chưa có đánh giá"}
                  </span>
                </div>
                <div className="text-sm text-gray-600 line-clamp-2">
                  {stripHtmlTags(facility.description)}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredFacilities.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-500 text-lg">
              Không tìm thấy cơ sở y tế nào phù hợp với tiêu chí tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Facilities;
