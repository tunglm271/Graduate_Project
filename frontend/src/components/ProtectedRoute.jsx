import {  Navigate } from "react-router-dom";

const ProtectedRoute = ({isAuthenticated, element}) => {
    
    if(!isAuthenticated){
        return <Navigate to="/auth/login" />;
    }
    
    return element;
}

export default ProtectedRoute;
