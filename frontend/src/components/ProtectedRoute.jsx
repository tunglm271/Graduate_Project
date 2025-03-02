import {  Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
const ProtectedRoute = ({role, element}) => {
    const authToken = Cookies.get('token');
    const userRole = Cookies.get('role');
    const isAuthenticated = !!authToken && userRole == role;
    if(!isAuthenticated){
        return <Navigate to="/auth/login" />;
    }
    
    return element;
}

export default ProtectedRoute;
