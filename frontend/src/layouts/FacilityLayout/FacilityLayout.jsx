import AgentHeader from "../../components/facility/AgentHeader";
import FacilitySidebar from "../../components/facility/FacilitySidebar";
import "./facilityLayout.css"
import { Outlet } from "react-router-dom";

const FacilityLayout = () => {
    return (
        <div className="facility-layout">
            <FacilitySidebar />
            <div style={{ flex: 1, marginLeft: "250px" }}>
                <AgentHeader />
                <div className="facility-content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default FacilityLayout;
