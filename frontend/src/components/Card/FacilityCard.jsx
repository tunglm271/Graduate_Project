import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const FacilityCard = ({ facility }) => {
  return (
    <div className="facility-card">
      <div className="p-1 w-2/5">
        <img src={facility.logo} alt="" className="object-cover"/>
      </div>
      <div className="my-2">
        <p className="text-sm font-semibold line-clamp-2 mb-1">
          {facility.facility_name}
        </p>
        <div className="row" style={{ padding: 0 }}>
          <p className="text-xs line-clamp-2 mb-2">{facility.address}</p>
        </div>
        <div className="flex gap-4 mx-2">
          <Button 
            variant="outlined"
            component={Link}
            to={`/clinic/${facility.id}`}
            sx={{
              boxShadow: 'none',
              padding: '3px 10px',
            }}
          >
            Liên hệ
          </Button>
          <Button variant="contained" sx={{
            boxShadow: 'none',
            padding: '3px 10px',
          }}>Đặt lịch</Button>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
