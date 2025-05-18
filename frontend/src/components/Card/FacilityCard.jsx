import { Button } from "@mui/material";
import facilityImg from "@images/facility.jpg";

const FacilityCard = () => {
  return (
    <div className="facility-card">
      <img src={facilityImg} alt="" />
      <div className="my-2">
        <h4 className="text-lg font-semibold">
          Bệnh viện Đa khoa Quốc tế Vinmec
        </h4>
        <div className="row" style={{ padding: 0 }}>
          <p style={{fontSize: '12px'}}>Địa chỉ: Số 11 Thái Hà, Đống Đa, Hà Nội</p>
        </div>
        <div style={{display: 'flex', gap: '10px', margin: '5px 0px', padding: 0}}>
          <Button variant="outlined" sx={{
            boxShadow: 'none',
            padding: '3px 10px',
          }}>Liên hệ</Button>
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
