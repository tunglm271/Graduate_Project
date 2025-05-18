import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Outlet } from "react-router-dom";
import { AdminLayoutProvider, useAdminLayout } from "../../context/AdminLayoutProvider";
const AdminLayoutContent = () => {
    const { isMobile, sidebarExpanded, sidebarWidth } = useAdminLayout();  

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <AdminSidebar />
            <div
                className="flex-1 flex flex-col overflow-x-hidden w-full"
                style={{
                    marginLeft: !isMobile ? (sidebarExpanded ? `${sidebarWidth}px` : '4rem') : '0',
                    transition: 'margin-left 0.3s ease-in-out',
                }}
            >
                <AdminHeader />
                <Outlet />
            </div>
        </div>
    );
};

const AdminLayout = () => (
    <AdminLayoutProvider>
        <AdminLayoutContent />
    </AdminLayoutProvider>
);

export default AdminLayout;