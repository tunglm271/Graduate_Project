import FacilityHeader from "../../components/facility/FacilityHeader";
import FacilitySidebar from "../../components/facility/FacilitySidebar";
import "./facilityLayout.css"
import { Outlet } from "react-router-dom";

const FacilityLayout = () => {
    return (
        <div className="facility-layout">
            <FacilitySidebar />
            <div style={{ flex: 1, marginLeft: "250px" }}>
                <FacilityHeader />
                <div className="facility-content">
                    <Outlet />

                </div>
            </div>
        </div>
    )
}

export default FacilityLayout;
