import SidebarManager from "../components/Sidebar/SidebarManager"
import { Route, Routes } from "react-router-dom";
import DashboardManager from "../pages/Dashboard/DashboardManager";
import Area from "../pages/Area/Area";
import "./Layout.css"
import Room from "../pages/Room/Room.jsx";
import Bill from "../pages/Bill/Bill.jsx";
import Report from "../pages/Report/Report.jsx";
import Account from "../pages/Account/Account.jsx";
import Request from "../pages/Request/Request.jsx";
import withAuthorization from "../hoc/withAuthorization.jsx";
import Student from "../pages/Student/Student.jsx";
const LayoutManager = () =>{
    return (
        <div className="layout">
            <SidebarManager/>
            <div className="layout-children">
                <Routes>
                    <Route path="/dashboard/*" element={<DashboardManager />} />
                    <Route path="/area/*"  element={<Area />}/>
                    <Route path="/room/*"  element={<Room />}/>
                    <Route path="/bill/*"  element={<Bill />}/>
                    <Route path="/report/*"  element={<Report />}/>
                    <Route path="/account/*"  element={<Account />}/>
                    <Route path="/request/*"  element={<Request />}/>
                    <Route path="/people/*"  element={<Student />}/>
                </Routes>
            </div>
        </div>
    )
}

export default withAuthorization(LayoutManager, ["Quản lý"])