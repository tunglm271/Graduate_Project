import AgentHeader from "../../components/facility/AgentHeader";
import AgentSidebar from "../../components/agent/AgentSidebar";
import FacilityNavLink from "../../components/facility/FacilityNavLink";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PeopleIcon from '@mui/icons-material/People';
import ListIcon from '@mui/icons-material/List';
import { Outlet } from "react-router-dom";
const DoctorLayout = () => {
    return (
        <div>
            <AgentSidebar>
                <FacilityNavLink to="/doctor" icon={<CalendarTodayIcon />} text="Working Schedule" />
                <FacilityNavLink to="/doctor/reservations" icon={<ListIcon />} text="Quản lý đơn khám" />
                <FacilityNavLink to="/doctor/service-assignment" icon={<MedicalServicesIcon />} text="Chỉ định dịch vụ" />
                <FacilityNavLink to="/doctor/patients" icon={<PeopleIcon />} text="Danh sách bệnh nhân" />
            </AgentSidebar>
            <div style={{ flex: 1, marginLeft: "250px" }}>
                <AgentHeader />
                <Outlet />
            </div>
        </div>
    );
}

export default DoctorLayout;
