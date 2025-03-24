import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';
const FacilityVerticalCard = ({facility}) => {
    return (
        <div className="facility-vertical-card">
            <img src={facility.logo} alt="" />
            <h3>{facility.facility_name}</h3>
            <p>
                <LocationOnIcon />
                {facility.address}
            </p>
            <p>
                {/* <PhoneIcon /> */}
                {facility.phone}
            </p>
            <Link to={`/clinic/${facility.id}`} className="btn btn-primary">
                Xem chi tiết
            </Link>
            <Link to={`/booking/${facility.id}`} className="btn btn-primary">
                Đặt lịch ngay
            </Link>
        </div>
    );
}

export default FacilityVerticalCard;
