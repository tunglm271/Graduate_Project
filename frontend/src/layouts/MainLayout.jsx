import { Outlet } from "react-router-dom";
import { Header, Sidebar } from '../components';
import { UserProvider } from "../context/userContext";
import "./MainLayout.css";
const MainLayout = () => {
    return (
        <UserProvider>
            <div id="main-layout">
                <Sidebar />
                <div id="content">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </UserProvider>
    );
}

export default MainLayout;
