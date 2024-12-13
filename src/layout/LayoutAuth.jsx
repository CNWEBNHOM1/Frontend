import SidebarAuth from "../components/Sidebar/SidebarAuth";
import { Route, Routes } from "react-router-dom";
import DashboardAuth from "../pages/Dashboard/DashboardAuth";
import DormRequestFlow from "../components/Auth/DormRequestFlow";
import CheckRequest from "../components/Auth/CheckRequest";
import Area from "../pages/Area/Area";
import ChangePassword from "../pages/Password/ChangePassword"
import PaymentReturn from "../components/Auth/PaymentReturnAuth.jsx";
import "./Layout.css";

const LayoutAuth = () => {
    return (

        <div className="layout">
            <SidebarAuth /> {/* Đảm bảo Sidebar hiển thị */}
            <div className="layout-children">
                <Routes>
                    <Route path="/dashboard" element={<DashboardAuth />} />
                    <Route path="/area" element={<Area />} />
                    <Route path="/DormRequestFlow/*" element={< DormRequestFlow />} />
                    <Route path="/CheckRequest/*" element={<  CheckRequest />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/payment-return" element={<PaymentReturn />} />
                </Routes>
            </div>
        </div>
    );
};

export default LayoutAuth;
