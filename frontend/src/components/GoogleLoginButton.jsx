import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onLoginSuccess, onLoginError }) => {
  return (
    <div className="google-login-wrapper">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (onLoginSuccess) {
            onLoginSuccess(credentialResponse);
          }
        }}
        onError={() => {
          if (onLoginError) {
            onLoginError();
          }
        }}
      />
    </div>
  );
};

export default GoogleLoginButton;
