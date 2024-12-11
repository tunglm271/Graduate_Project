import React, { useState } from "react";
import colorImage from "../../assets/images/color-logo.png";
import loginImage from "../../assets/images/login-image.jpg";
import {
  TextField,
  FormControlLabel,
  Switch,
  Button,
  FormGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import { loginRequest } from "../../service/BackendApi";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginRequest(email, password);
      console.log(response);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-card">
      <div className="form-section">
        <div className="heading-section">
          <div className="logo">
            <img src={colorImage} alt="" />
            <h1>Doficy</h1>
          </div>
          <p>
            Bạn chưa có tài khoản?
            <Link
              to="/register"
              className="auth-link"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                lineHeight: 1.6,
              }}
            >
              {" "}
              Đăng ký tại đây
            </Link>
          </p>
        </div>
        <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              style: { borderRadius: "20px" },
            }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              style: { borderRadius: "20px" },
            }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormControlLabel
            control={
              <Switch checked={showPassword} onChange={handleShowPassword} />
            }
            label="Hiện mật khẩu"
            style={{ justifyContent: "flex-end", marginRight: "0" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ padding: "10px 20px" }}
            onClick={(event) => handleLogin(event)}
          >
            Đăng nhập
          </Button>
        </form>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "5px",
            textAlign: "right",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              lineHeight: 1.6,
            }}
            className="auth-link"
          >
            Quên mật khẩu ?
          </Link>
        </div>
      </div>

      <img src={loginImage} alt="" />
    </div>
  );
};

export default Login;
