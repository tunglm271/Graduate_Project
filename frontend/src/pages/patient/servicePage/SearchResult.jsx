import { CircularProgress  } from "@mui/material";
import ServiceCard from "../../../components/card/ServiceCard";
const SearchResult = ({loading, services}) => {
    console.log(services);
    return (
        <div>
            {
                loading ? 
                <CircularProgress />
                :
                <div className="mt-5">
                    <p className="mb-2 font-semibold">Dịch vụ ({services.length})</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default SearchResult;
