import serviceImg from '@images/service.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MaleIcon from '@mui/icons-material/Male';
const VerticalServiceCard = () => {
    return (
        <div className="vertical-service-card">
            <img src={serviceImg} alt="" />
            <h4 style={{marginBottom: "5px"}}>Gói khám tổng quát cơ bản nữ</h4>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <div className='service-price'>
                    <p>1.000.000đ</p>
                    <p>1.200.000đ</p>
                </div>
                <div style={{textAlign: "right"}}>
                    <p style={{display: 'flex', alignItems: 'center', fontSize: '12px', marginBottom: "5px"}}><LocationOnIcon fontSize='18' color='primary'/> Hà Nội</p>
                    <p style={{display: 'flex', alignItems: 'center', fontSize: '12px'}}><MaleIcon fontSize='18' color='primary'/>Nam</p>
                </div>
            </div>
        </div>
    );
}

export default VerticalServiceCard;
