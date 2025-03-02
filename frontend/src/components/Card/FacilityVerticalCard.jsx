import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';
const FacilityVerticalCard = ({facility}) => {
    return (
        <div className="facility-vertical-card">
            <img src={facility.avatar} alt="" />
            <h3>{facility.name}</h3>
            <p>
                <LocationOnIcon />
                {facility.address}
            </p>
            <p>
                {/* <PhoneIcon /> */}
                {facility.phone}
            </p>
            <Link to={`/booking/${facility.id}`} className="btn btn-primary">
                Đặt lịch ngay
            </Link>
        </div>
    );
}

export default FacilityVerticalCard;
