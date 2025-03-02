import { useState, createContext, useEffect } from 'react';

export const PatientLayoutContext = createContext();

export const PateintLayoutProvider = ({ children }) => {
    const [sidebarCollapse, setSidebarCollapse] = useState(true);
    const [toggleChatbox, setToggleChatbox] = useState(true);
    useEffect(() => {
        const content = document.getElementById("content")
        content.style.marginLeft = sidebarCollapse ? "220px" : "120px";
        content.style.width = sidebarCollapse ? "calc(100% - 220px)" : "calc(100% - 120px)";
    }, [sidebarCollapse]);


    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 768) {
            setSidebarCollapse(false); 
          } else {
            setSidebarCollapse(true);
          }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <PatientLayoutContext.Provider value={{ sidebarCollapse, setSidebarCollapse, toggleChatbox, setToggleChatbox }}>
            {children}
        </PatientLayoutContext.Provider>
    );
}
