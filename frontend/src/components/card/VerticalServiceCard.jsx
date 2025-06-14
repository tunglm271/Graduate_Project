import LocationOnIcon from '@mui/icons-material/LocationOn';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import { formatCurrency } from '../../utlis/caculateFun';
import { Link } from 'react-router-dom';
const VerticalServiceCard = ({ service }) => {
    return (
        <Link className="vertical-service-card" to={`/services/${service?.id}`}>
            <img src={service.thumbnail} alt="" />
            <p className='mb-2 font-semibold line-clamp-1 truncate'>{service?.name || "Gói khám tổng quát cơ bản nữ"}</p>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div className='service-price'>
                    <p>{formatCurrency(service?.price * 0.9 )}</p>
                    <p>{formatCurrency(service?.price)}</p>
                </div>
                <div style={{textAlign: "right"}}>
                    <p style={{display: 'flex', alignItems: 'center', fontSize: '12px', marginBottom: "5px"}}><LocationOnIcon fontSize='18' color='primary'/> Hà Nội</p>
                    {service?.service_audience_gender == "male" &&
                        <p style={{display: 'flex', alignItems: 'center', fontSize: '12px'}}>
                            <MaleIcon fontSize='18' color='primary'/>Nam
                        </p>
                    }
                    {service?.service_audience_gender == "both" &&
                        <p style={{display: 'flex', alignItems: 'center', fontSize: '12px'}}>
                            <TransgenderIcon fontSize='18'/> Cả hai
                        </p>
                    }
                     {service?.service_audience_gender == "female" &&
                        <p style={{display: 'flex', alignItems: 'center', fontSize: '12px'}}>
                            <FemaleIcon fontSize='18' color='error'/> Nữ
                        </p>
                    }
                </div>
            </div>
        </Link>
    );
}

export default VerticalServiceCard;
