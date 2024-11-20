import SidebarAuth from "../components/Sidebar/SidebarAuth";
import { Route, Routes } from "react-router-dom";
import DashboardAuth from "../pages/Dashboard/DashboardAuth";
import CreateRequest from "../components/Auth/CreateRequest"
import Area from "../pages/Area/Area";
import "./Layout.css";

const  LayoutAuth = () => {
    return (

        <div className="layout">
            <SidebarAuth /> {/* Đảm bảo Sidebar hiển thị */}
            <div className="layout-children">
                <Routes>
                    <Route path="/dashboard" element={<DashboardAuth />} />
                    <Route path="/area" element={<Area />} />
                    <Route path="/createRequest/*" element={<CreateRequest />} />
                </Routes>
            </div>
        </div>
    );
};

export default LayoutAuth;
