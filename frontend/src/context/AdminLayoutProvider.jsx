import { useState, useEffect, useRef, createContext, useContext } from 'react';

const AdminLayoutContext = createContext();

const AdminLayoutProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState(240);
    const [isResizing, setIsResizing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        const checkIfMobile = () => {
          const isMobileView = window.innerWidth < 768;
          setIsMobile(isMobileView);
          
          if (isMobileView) {
            setSidebarOpen(false);
          } else {
            setSidebarOpen(true);
          }
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
          window.removeEventListener('resize', checkIfMobile);
        };
    }, []);
      
    const toggleSidebar = () => {
        if (isMobile) {
          // On mobile: toggle visibility (open/close)
          setSidebarOpen(!sidebarOpen);
        } else {
          // On desktop: toggle expanded/collapsed
          setSidebarExpanded(!sidebarExpanded);
        }
    };
      

    return (
        <AdminLayoutContext.Provider 
        value={{ 
          sidebarOpen, 
          setSidebarOpen,
          sidebarExpanded,
          setSidebarExpanded,
          sidebarWidth, 
          setSidebarWidth,
          isResizing,
          setIsResizing,
          isMobile,
          toggleSidebar,
          title,
          setTitle
        }}
      >
        {children}
      </AdminLayoutContext.Provider>
    );
}

function useAdminLayout() {
    const context = useContext(AdminLayoutContext);
    if (!context) {
      throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}

export { useAdminLayout, AdminLayoutProvider };


