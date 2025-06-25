import "./patientmainLayout.css";
import { Outlet } from "react-router-dom";
import PatientHeader from "../../components/PatientHeader";
import PatientSidebar from "../../components/PatientSidebar";
import PatientFooter from "../../components/PatientFooter";
import { PateintLayoutProvider } from "../../context/PateintLayoutProvider";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

const PatientMainLayout = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <PateintLayoutProvider>
      <div>
        <div style={{ display: "flex" }}>
          {!isMobile && <PatientSidebar />}
          <main
            id="content"
            style={{
              marginLeft: isMobile ? "0" : undefined,
              width: isMobile ? "100%" : undefined,
            }}
          >
            <PatientHeader />
            <div className="min-h-[65vh]">
              <Outlet />
            </div>
            <PatientFooter />
          </main>
          {isMobile && <PatientSidebar />}
        </div>
      </div>
    </PateintLayoutProvider>
  );
};

export default PatientMainLayout;
