import { CircularProgress, Pagination } from "@mui/material";
import ServiceCard from "../../../components/card/ServiceCard";
import PropTypes from "prop-types";
import { useState } from "react";

const SERVICES_PER_PAGE = 12;

const SearchResult = ({ loading, services }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(services.length / SERVICES_PER_PAGE);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const paginatedServices = services.slice(
    (page - 1) * SERVICES_PER_PAGE,
    page * SERVICES_PER_PAGE
  );

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="mt-5">
          <p className="mb-2 font-semibold">Dịch vụ ({services.length})</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
            <div className="flex justify-center mt-6">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                color="primary"
              />
            </div>
        </div>
      )}
    </div>
  );
};

SearchResult.propTypes = {
  loading: PropTypes.bool.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SearchResult;
