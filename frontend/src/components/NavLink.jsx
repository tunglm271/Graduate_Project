import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const NavLink = ({ icon, text, collapse, to }) => {
    
    const url = useLocation();
    const isActive = url.pathname === to;
    const linkClassName = isActive ? "nav-link active" : "nav-link";

    return (
        <Link to={to} className={linkClassName} style={{justifyContent: collapse?"left":"center"}}>
            {icon}
            {collapse?<span className="nav-link-text">{text}</span>:undefined}
        </Link>
    );
}

NavLink.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    collapse: PropTypes.bool.isRequired,
    to: PropTypes.string.isRequired,
};

export default NavLink;