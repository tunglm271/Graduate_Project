import { useNavigate } from 'react-router-dom';
import serviceImg from '@images/service.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ServiceCard = () => {
    const navigate = useNavigate();
    return (
        <div className="service-card" onClick={() => navigate('/services/1')}>
            <div style={{position: 'relative'}}>
                <img src={serviceImg} alt="" />
                <span>90%</span>
            </div>
            
            <div style={{padding: '5px', flexGrow: 1}}>
                <h4 style={{marginBottom: '10px'}}>Gói tầm soát ưng thư nâng cao cho bệnh nhân dưới 40</h4>
                <div className='row'>
                    <div>
                        <p style={{fontWeight: 700}}>1,355,000đ</p>
                        <p style={{textDecoration: 'line-through'}}>1,485,000đ</p>
                    </div>

                    <div style={{textAlign: 'right'}}>
                        <p style={{display: 'flex', alignItems: 'center', fontSize: '12px'}}><LocationOnIcon fontSize='18' color='primary'/> Hà Nội</p>
                        <p>Đã đánh giá: 5</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;
