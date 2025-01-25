import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import './authLayout.css'

const AuthLayout = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div id='auth-layout'>
            <Outlet />
        </div>
    );
}

export default AuthLayout;
