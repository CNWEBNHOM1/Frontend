import { Route, Routes } from "react-router"
import SidebarUser from "../components/Sidebar/SidebarUser"
import DashboardUser from "../pages/Dashboard/DashboardUser"
import FormRegistrationForm from '../components/Form_DK/FormRegistrationForm';
import "./Layout.css"

const LayoutUser = () => {
  return (
    <div className="layout">
        <SidebarUser />
        <div className="layout-children">
            <Routes>
                <Route path="/dashboard/*" element={<DashboardUser />} />
                <Route path='/registration/*' element={<FormRegistrationForm />} />
            </Routes>
        </div>
    </div>

  )
}

export default LayoutUser
