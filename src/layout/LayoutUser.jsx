import { Route, Routes } from "react-router"
import SidebarUser from "../components/Sidebar/SidebarUser"
import DashboardUser from "../pages/Dashboard/DashboardUser"


const LayoutUser = () => {
  return (
    <div>
        <SidebarUser />
        <div>
            <Routes>
                <Route path="/dashboard/*" element={<DashboardUser />} />
            </Routes>
        </div>
    </div>
  )
}

export default LayoutUser
