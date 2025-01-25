import logo from '../assets/logo.png';
import { Typography, Stack, Divider } from '@mui/material';
import FacebookIcon from '@icon/FacebookIcon';
import GoogleIcon from '@icon/GoogleIcon';
import SkypeIcon from '@icon/SkypeIcon';
import LinkedIcon from '../assets/icon/LinkedIcon';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
const PatientFooter = () => {
    return (
        <div id="footer">
            <div id="footer-header">
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <img src={logo} alt="" />
                    <Typography variant='h6' color='white'>Docify</Typography>
                </div>
                <Stack direction='row' spacing={2} alignItems={'center'}>
                    <FacebookIcon />
                    <GoogleIcon />
                    <SkypeIcon />
                    <LinkedIcon />
                </Stack>
            </div>

            <div id='footer-body'>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '10px', marginBottom: '20px'}}>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <Typography variant='body1' sx={{
                            marginBottom: '10px',
                        }}>Docify - Bạn dồng hành tin cậy với sức khỏe của bạn</Typography>
                        <Typography variant='body1' color='#7a809b' fontSize={'14px'} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                        }}><LocationOnIcon /> 315 Trường Chinh, Khương Mai, Thanh Xuân, Hà Nội</Typography>
                        <Typography variant='body1' color='#7a809b' fontSize={'14px'} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                        }}><LocalPhoneIcon /> +880 123 456 789</Typography>
                        <Typography variant='body1' color='#7a809b' fontSize={'14px'} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                        }}><EmailIcon /> tung.nx215162@sis.hust.edu.vn</Typography>
                    </div>
                    <div style={{flex: 1}}>
                        <Typography variant='h6' sx={{fontWeight: 600, marginBottom: '10px' }}>Quy chế hoạt động</Typography>
                        <ul style={{marginBottom: '20px'}}>
                            <li>Quy chế hoạt động</li>
                            <li>Chính sách bảo vệ thông tin</li>
                            <li>Trách nghiệm và cam kết</li>
                        </ul>

                        <Typography variant='h6' sx={{fontWeight: 600, marginBottom: '10px' }}>Dịch vụ</Typography>
                        <ul>
                            <li>Đặt lịch khám bệnh</li>
                            <li>Đăng ký phòng khám</li>
                            <li>Hỗ trợ quản lý phòng khám</li>
                        </ul>
                    </div>
                    <div style={{flex: 1}}>
                        <Typography variant='h6' sx={{fontWeight: 600, lineHeight: 1}}>Theo dõi tin tức và dịch vụ mới nhất của chúng tôi</Typography>
                        <div id='footer-subscribe'>
                            <input type="text" placeholder='Nhập email của bạn' />
                            <button>Đăng ký</button>
                        </div>
                        <p style={{marginTop: '20px', fontSize: '12px'}}>Bằng cách nhấn nút “<span style={{ fontWeight: 600}}>Đăng ký</span>”, tôi xác nhận đã đọc và đồng ý với các <span style={{ fontWeight: 600}}>Chính sách bảo vệ thông tin</span> của Docify</p>
                    </div>
                </div>

                <Divider />
                <div id='footer-footer'>
                    <Typography variant='body1' textAlign={'center'} marginTop={'15px'}>© 2025 Docify. All rights reserved</Typography>
                </div>
            </div>
        </div>
    )
}

export default PatientFooter;
