import { TextField, Button, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/phone'
import { Link } from 'react-router-dom';
import { registerRequest } from '../../service/backendApi';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }
        registerRequest(form.username, form.email, form.phoneNumber, form.password, form.confirmPassword, form.role)
            .then((res) => {
                Cookies.set('authToken', res.token);
                navigate('/home');
            })
            .catch((err) => {
                console.error(err);
                alert('Đăng ký thất bại');
            });
    };

    return (
        <div className="auth-card" style={{ flexDirection: 'column' }}>
            <h3>Đăng ký tài khoản người dùng</h3>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
                Bạn đã có tài khoản? &nbsp;
                <Link to={'/auth/login'} style={{color: '#1976d2'}}>Đăng nhập</Link>
            </p>
            <form className='patient-register-form' onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role">Vai trò</InputLabel>
                    <Select
                        label="Vai trò"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <MenuItem value="patient">Bệnh nhân</MenuItem>
                        <MenuItem value="doctor">Bác sĩ</MenuItem>
                        <MenuItem value="health-faicility">Cơ sở y tế</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Tên đăng nhập"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    placeholder="Nhập tên đăng nhập của bạn"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon />
                            </InputAdornment>
                        ),
                        style: { padding: '0 9px' }
                    }}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    placeholder="Nhập email của bạn"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                        style: { padding: '0 9px' }
                    }}
                />
                <TextField
                    label="Số điện thoại"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    placeholder="Nhập số điện thoại của bạn"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneIcon />
                            </InputAdornment>
                        ),
                        style: { padding: '0 9px' }
                    }}
                />
                <TextField
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    placeholder="Nhập mật khẩu của bạn"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                        style: { padding: '0 9px' }
                    }}
                />
                <TextField
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    placeholder="Xác nhận mật khẩu của bạn"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                        style: { padding: '0 9px' }
                    }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Đăng ký
                </Button>
                <p style={{ fontSize: '12px'}}>Bằng việc nhấn nút Đăng ký bạn đã đồng ý với <span style={{color: '#1976d2', fontWeight: 600}}>Quy chế hoạt động</span> và <span style={{color: '#1976d2', fontWeight: 600}}>Chính sách bảo vệ thông tin</span> của MEDLATEC</p>
            </form>
        </div>
    );
};

export default Register;