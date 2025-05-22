import { useState, createContext, useEffect } from "react";
import { getUser } from "../utlis/auth";
import { useMediaQuery, useTheme } from "@mui/material";

export const PatientLayoutContext = createContext();

export const PateintLayoutProvider = ({ children }) => {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);
  const [user, setUser] = useState(getUser());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!isMobile) {
      const content = document.getElementById("content");
      if (content) {
        content.style.marginLeft = sidebarCollapse ? "220px" : "100px";
        content.style.width = sidebarCollapse
          ? "calc(100% - 220px)"
          : "calc(100% - 100px)";
      }
    }
  }, [sidebarCollapse, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarCollapse(false);
      } else {
        setSidebarCollapse(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PatientLayoutContext.Provider
      value={{ sidebarCollapse, setSidebarCollapse, user, setUser }}
    >
      {children}
    </PatientLayoutContext.Provider>
  );
};
