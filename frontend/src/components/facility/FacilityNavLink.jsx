import { Link, useLocation } from "react-router-dom";

const FacilityNavLink = ({icon, text, to}) => {

    const url = useLocation();
    const isActive = url.pathname === to;

    return (
        <Link 
            to={to} 
            className={`flex text-sm gap-2 items-center hover:text-blue-300 hover:bg-blue-50 rounded-md 
                ${isActive?"bg-blue-100 text-blue-500":"text-gray-500"}`} 
            style={{padding: "0.3rem 0.5rem", margin: "0.5rem 0"}}
        >
            {icon}
            <span>{text}</span>
        </Link>
    );
}

export default FacilityNavLink;
