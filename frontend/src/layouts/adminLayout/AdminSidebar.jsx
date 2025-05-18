import { useAdminLayout } from "../../context/AdminLayoutProvider";
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
    Menu as MenuIcon, X, PanelLeftClose , PanelLeftOpen, Hospital,
    Home, Users, Settings, HelpCircle, BarChart, LogOut, ScrollText
  } from 'lucide-react';
import { Menu, MenuItem, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { logoutRequest } from "../../service/authApi";
import { getUser } from '../../utlis/auth';

const AdminSidebar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { 
        sidebarOpen, 
        setSidebarOpen, 
        sidebarExpanded,
        setSidebarExpanded,
        sidebarWidth, 
        setSidebarWidth,
        isResizing,
        setIsResizing,
        isMobile,
        toggleSidebar
    } = useAdminLayout();
    
    const location = useLocation();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const user = getUser();

    const resizeRef = useRef(null);
    const minWidth = 180;
    const maxWidth = 360;

    const startResizing = (e) => {
        setIsResizing(true);
    };
      
    const stopResizing = () => {
    setIsResizing(false);
    };
    
    const resize = (e) => {
    if (isResizing && !isMobile) {
        const newWidth = e.clientX;
        if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
        }
    }
    };
      
    useEffect(() => {
    if (isResizing) {
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResizing);
    }
    
    return () => {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResizing);
    };
    }, [isResizing]);


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    const handleLogout = () => {
        handleMenuClose();
        logoutRequest().then((res) => {
            console.log(res);
            navigate('/auth/login');
        });
    };

    const navItems = [
        { name: t('admin.sidebar.dashboard'), icon: <Home size={20} />, link: '/admin' },
        { name: t('admin.sidebar.facilities'), icon: <Hospital size={20} />, link: '/admin/facilities' },
        { name: t('admin.sidebar.patient_accounts'), icon: <Users size={20} />, link: '/admin/patient-accounts' },
        { name: t('admin.sidebar.blog'), icon: <ScrollText size={20} />, link: '/admin/blogs' },
        { name: t('admin.sidebar.analytics'), icon: <BarChart size={20} />, link: '/admin/analytics' },
        { name: t('admin.sidebar.settings'), icon: <Settings size={20} />, link: '/admin/settings' },
        { name: t('admin.sidebar.help'), icon: <HelpCircle size={20} />, link: '/admin/help' },
    ];

    return (
        <>
        {/* Mobile Overlay */}
        {sidebarOpen && isMobile && (
            <div 
            className="fixed inset-0 bg-black opacity-50 z-20"
            onClick={toggleSidebar}
            />
        )}
        
        {/* Sidebar */}
        <div 
            className={`
            ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'} 
            fixed z-30
            h-full bg-gray-800 text-white
            transition-all duration-300 ease-in-out
            flex flex-col
            `}
            style={{ 
            width: isMobile ? '240px' : 
                    (sidebarExpanded ? `${sidebarWidth}px` : '4rem') 
            }}
        >
            {/* Sidebar Header */}
            <div className={`flex items-center p-4 border-b border-gray-700 ${((sidebarExpanded && !isMobile) || isMobile) ? 'justify-between' : 'justify-center'}`}>
            {(sidebarExpanded || isMobile) && (
                <p className="text-lg font-bold">{t("admin.sidebar.title")}</p>
            )}
                <button 
                    onClick={toggleSidebar}
                    className="p-1 rounded-md hover:bg-gray-700 focus:outline-none"
                >
                    {isMobile ? 
                    (sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />) : 
                    (sidebarExpanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />)
                    }
                </button>
            </div>
            
            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto py-4">
            <ul>
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.link;
                  return (
                    <li key={index}>
                        <Link 
                        to={item.link}
                        className={`flex items-center px-4 py-3 hover:bg-gray-700 ${((sidebarExpanded && !isMobile) || isMobile) ? '' : 'justify-center'} ${isActive ? 'bg-blue-800' : ''}`}
                        >
                        <span className={`${((sidebarExpanded && !isMobile) || isMobile) ? 'mr-3' : ''}`}>{item.icon}</span>
                        {((sidebarExpanded && !isMobile) || isMobile) && (
                            <span>{item.name}</span>
                        )}
                        </Link>
                    </li>
                  );
                })}
            </ul>
            </nav>
            
            <div 
                className="p-4 border-t border-gray-600 cursor-pointer hover:bg-gray-600"
                onClick={handleMenuOpen}
                aria-controls={open ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <div className={`flex ${((sidebarExpanded && !isMobile) || isMobile) ? "items-center" : "justify-center"}`}>
                    <div className={`w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center ${((sidebarExpanded && !isMobile) || isMobile) && 'mr-3'}`}>
                        <span>A</span>
                    </div>
                    {
                        ((sidebarExpanded && !isMobile) || isMobile) && (
                        <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-400">admin@example.com</p>
                        </div>
                        )
                    }
                </div>
            </div>
            
            {/* MUI Menu */}
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'user-button',
                }}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleMenuClose}>
                    {t('admin.sidebar.myAccount')}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} className="flex items-center">
                    <LogOut size={16} className="mr-2" />
                    {t('admin.sidebar.logout')}
                </MenuItem>
            </Menu>
            
            {/* Resizer */}
            {!isMobile && sidebarExpanded && (
            <div
                ref={resizeRef}
                className="absolute top-0 right-0 w-1 h-full cursor-ew-resize bg-gray-600 hover:bg-blue-500"
                onMouseDown={startResizing}
            />
            )}
        </div>
        </>
    );
}

export default AdminSidebar;