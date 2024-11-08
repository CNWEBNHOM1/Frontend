import SidebarManager from "../components/Sidebar/SidebarManager"
import { Route, Routes } from "react-router-dom";
import DashboardManager from "../pages/Dashboard/DashboardManager";
import Area from "../pages/Area/Area";
import "./Layout.css"
import Room from "../pages/Room/Room.jsx";
import Bill from "../pages/Bill/Bill.jsx";
const LayoutManager = () =>{
    return (
        <div className="layout">
            <SidebarManager/>
            <div className="layout-children">
                <Routes>
                    <Route path="/dashboard/*" element={<DashboardManager />} />
                    <Route path="/area/*"  element={<Area />}/>
                    <Route path="/room"  element={<Room />}/>
                    <Route path="/bill"  element={<Bill />}/>
                </Routes>
            </div>
        </div>
    )
}

export default LayoutManager