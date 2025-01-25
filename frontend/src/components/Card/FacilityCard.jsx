import { Button } from "@mui/material";
import facilityImg from "@images/facility.jpg";

const FacilityCard = () => {
  return (
    <div className="facility-card">
      <img src={facilityImg} alt="" />
      <div>
        <h4 style={{ marginBottom: "0px" }}>
          Bệnh viện Đa khoa Quốc tế Vinmec
        </h4>
        <div className="row" style={{ padding: 0 }}>
          <p style={{fontSize: '12px'}}>Địa chỉ: Số 11 Thái Hà, Đống Đa, Hà Nội</p>
        </div>
        <div style={{display: 'flex', gap: '10px', marginTop: '3px', padding: 0}}>
          <Button variant="outlined">Liên hệ</Button>
          <Button variant="contained" sx={{
            boxShadow: 'none',
          }}>Đặt lịch</Button>
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
