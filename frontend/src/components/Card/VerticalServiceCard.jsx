import LocationOnIcon from '@mui/icons-material/LocationOn';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import { Link } from 'react-router-dom';
const VerticalServiceCard = ({ service }) => {
    return (
        <Link className="vertical-service-card" to={`/services/${service?.id}`}>
            <img src={service.thumbnail} alt="" />
            <h4 style={{marginBottom: "5px"}}>{service?.name || "Gói khám tổng quát cơ bản nữ"}</h4>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div className='service-price'>
                    <p>{service?.price || "1.000.000" }đ</p>
                    <p>1.200.000đ</p>
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
