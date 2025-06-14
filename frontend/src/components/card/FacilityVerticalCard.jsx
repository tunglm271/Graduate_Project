import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link } from 'react-router-dom';
const FacilityVerticalCard = ({facility}) => {
    return (
        <div className="facility-vertical-card">
            <img src={facility.logo} alt="" />
            <h3 className='font-bold h-10 text-center w-full mb-4'>{facility.facility_name}</h3>
            <p className="text-sm">
                <LocationOnIcon />
                {facility.address}
            </p>
            <p>
                <LocalPhoneIcon />
                {facility.phone}
            </p>
            <Link to={`/clinic/${facility.id}`} className="btn btn-primary mt-auto">
                Xem chi tiết
            </Link>
            <Link to={`/booking/${facility.id}`} className="btn btn-primary">
                Đặt lịch ngay
            </Link>
        </div>
    );
}

export default FacilityVerticalCard;
