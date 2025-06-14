import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import { formatCurrency } from '../../utlis/caculateFun';

const ServiceCard = ({ service }) => {
    const genderIcon = () => {
        switch (service?.service_audience_gender) {
            case 'male':
                return <p className="flex items-center text-sm"><MaleIcon fontSize="small" color="primary" /> Nam</p>;
            case 'female':
                return <p className="flex items-center text-sm"><FemaleIcon fontSize="small" color="error" /> Nữ</p>;
            case 'both':
                return <p className="flex items-center text-sm"><TransgenderIcon fontSize="small" /> Cả hai</p>;
            default:
                return null;
        }
    };

    return (
        <Link to={`/services/${service?.id || 1}`} className="service-card">
            <div style={{ position: 'relative' }}>
                <img src={service.thumbnail} alt={service?.name || 'Service'} />
                <span>90%</span>
            </div>

            <div className="p-2 flex-grow flex flex-col">
                <h4 className="mb-auto">{service?.name || "Không có dữ liệu"}</h4>
                <div className="flex justify-between mt-auto items-center">
                    <div>
                        <p className="font-bold">{formatCurrency(service?.price)}</p>
                        <p style={{ textDecoration: 'line-through' }}>
                            {formatCurrency(service?.price * 0.9)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="flex items-center text-sm">
                            <LocationOnIcon fontSize="small" color="primary" /> Hà Nội
                        </p>
                        {genderIcon()}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;
