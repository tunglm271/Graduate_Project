import { useState, useRef, useEffect } from "react";
import colorImage from "@images/color-logo.png";
import loginImage from "@images/login-image.jpg";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import Cookies from "js-cookie";
import { loginRequest, googleLoginRequest } from "../../service/authApi";
import { useSearchParams } from "react-router-dom";
const Login = () => {
  const [searchParams] = useSearchParams();
  const auth = searchParams.get("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loginFormRef = useRef(null);
  const loginImageRef = useRef(null);
  const collaboratorFormRef = useRef(null);
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

  useEffect(() => {
    if (auth == "unauthenticated") {
      console.log("test");
      showErrorSnackbar("Vui lòng đăng nhập để tiếp tục!");
    }
  }, [auth]);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleEmailChange = (event) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (event.target.value === "") {
      setEmail({
        value: event.target.value,
        error: true,
        helperText: "Email không được để trống",
      });
    } else if (!emailRegex.test(event.target.value)) {
      setEmail({
        value: event.target.value,
        error: true,
        helperText: "Email không đúng định dạng, ví dụ: abc@example.com",
      });
    } else {
      setEmail({
        ...email,
        value: event.target.value,
        error: false,
        helperText: "",
      });
    }
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    if (passwordValue === "") {
      setPassword({
        value: passwordValue,
        error: true,
        helperText: "Mật khẩu không được để trống.",
      });
    } else if (passwordValue.length < 6) {
      setPassword({
        value: passwordValue,
        error: true,
        helperText: "Mật khẩu phải có ít nhất 6 ký tự.",
      });
    } else {
      setPassword({
        value: passwordValue,
        error: false,
        helperText: "",
      });
    }
  };

  const getDefaultRouteByRole = (role) => {
    switch (role) {
      case "1":
        return "/admin";
      case "2":
        return "/home";
      case "3":
        return "/doctor";
      case "4":
        return "/facility/dashboard";
      default:
        return "/home";
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (
      !email ||
      (!password && email.error === false && password.error === false)
    ) {
      return;
    }

    setError(""); // Reset error message
    setLoading(true); // Set loading state

    try {
      const response = await loginRequest(email.value, password.value);
      console.log("Login success:", response);
      showSuccessSnackbar("Đăng nhập thành công!");

      const intendedRoute = Cookies.get("intendedRoute");
      const intendedRole = Cookies.get("intendedRole");
      const userRole = Cookies.get("role");

      // Clear the cookies
      Cookies.remove("intendedRoute");
      Cookies.remove("intendedRole");

      // Only redirect to intended route if the roles match
      if (intendedRoute && intendedRole === userRole) {
        navigate(intendedRoute);
      } else {
        // Redirect to default route based on user role
        navigate(getDefaultRouteByRole(userRole));
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      await googleLoginRequest(credentialResponse);
      showSuccessSnackbar("Đăng nhập thành công!");

      const intendedRoute = Cookies.get("intendedRoute");
      const intendedRole = Cookies.get("intendedRole");
      const userRole = Cookies.get("role");

      // Clear the cookies
      Cookies.remove("intendedRoute");
      Cookies.remove("intendedRole");

      // Only redirect to intended route if the roles match
      if (intendedRoute && intendedRole === userRole) {
        navigate(intendedRoute);
      } else {
        // Redirect to default route based on user role
        navigate(getDefaultRouteByRole(userRole));
      }
    } catch (error) {
      console.error("Google login error:", error);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="form-section" ref={loginFormRef}>
        <div className="heading-section">
          <div className="logo">
            <img src={colorImage} alt="Doficy Logo" />
            <h1>Doficy</h1>
          </div>
          <GoogleLoginButton onLoginSuccess={handleGoogleLogin} />
          <Divider
            sx={{ fontSize: "14px", marginTop: "10px", marginBottom: "10px" }}
          >
            Hoặc dùng email hoặc mật khẩu
          </Divider>
        </div>

        <Box
          component="form"
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {error && (
            <Alert severity="error" sx={{ marginTop: "5px" }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            placeholder="Nhập email của bạn"
            fullWidth
            margin="normal"
            value={email.value}
            onChange={handleEmailChange}
            error={email.error}
            helperText={email.helperText}
            aria-label="Email field"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            placeholder="Nhập mật khẩu của bạn"
            fullWidth
            margin="normal"
            InputProps={{
              style: { borderRadius: "5px" },
            }}
            value={password.value}
            error={password.error}
            helperText={password.helperText}
            onChange={handlePasswordChange}
            aria-label="Password field"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "25px",
              textAlign: "right",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontSize: "14px",
              }}
              className="auth-link"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ padding: "10px 20px" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </Box>

        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Bạn chưa có tài khoản?
          <Link
            to="/auth/register"
            className="auth-link"
            style={{
              color: "#1976d2",
              lineHeight: 1.6,
              textDecoration: "underline",
            }}
          >
            {" "}
            Đăng ký tại đây
          </Link>
        </p>
        <Button
          style={{ display: "block", margin: "10px auto" }}
          onClick={() => {
            loginFormRef.current.classList.add("fade");
            loginImageRef.current.classList.add("move-left");
            collaboratorFormRef.current.classList.add("fade-in");
          }}
        >
          Tôi là cộng tác viên
        </Button>
      </div>

      <img src={loginImage} alt="Login visual" ref={loginImageRef} />

      <div className="collaborator-form" ref={collaboratorFormRef}>
        <h3 style={{ width: "100%", textAlign: "center" }}>
          Đăng nhập với tư cách cơ sở y tế hoặc bác sĩ
        </h3>
        <Box
          component="form"
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {error && (
            <Alert severity="error" sx={{ marginTop: "5px" }}>
              {error}
            </Alert>
          )}

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email.value}
            onChange={handleEmailChange}
            error={email.error}
            helperText={email.helperText}
            aria-label="Email field"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{
              style: { borderRadius: "5px" },
            }}
            value={password.value}
            error={password.error}
            helperText={password.helperText}
            onChange={handlePasswordChange}
            aria-label="Password field"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "25px",
              textAlign: "right",
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                fontSize: "14px",
              }}
              className="auth-link"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ padding: "10px 20px" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </Box>
        <Button
          style={{ marginTop: "10px" }}
          onClick={() => {
            loginFormRef.current.classList.remove("fade");
            loginImageRef.current.classList.remove("move-left");
            collaboratorFormRef.current.classList.remove("fade-in");
            collaboratorFormRef.current.classList.add("fade");
          }}
        >
          Đăng nhập với tư cách bệnh nhân
        </Button>
      </div>
    </div>
  );
};

export default Login;
