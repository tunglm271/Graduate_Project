import './AuthLayout.css';
import { Outlet } from 'react-router-dom';
const AuthLayout = () => {
    return (
        <div id='auth-layout'>
            <Outlet />
        </div>
    );
}

export default AuthLayout;
