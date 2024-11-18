import { Route, Routes } from "react-router"
import SidebarUser from "../components/Sidebar/SidebarUser"
import DashboardUser from "../pages/Dashboard/DashboardUser"
import FormRegistrationForm from '../components/Form_DK/FormRegistrationForm'
import "./Layout.css"
import UserProfile from '../components/Account/UserProfile'
import MemberList from "../components/Account/MemberList"
import RoomBillPage from "../components/Account/RoomBillPage"
import UserReport from "../components/Account/UserReport"
import Upanhhoadon from "../components/Account/Upanhhoadon"
const LayoutUser = () => {
  return (
    <div className="layout">
      <SidebarUser />
      <div className="layout-children">
        <Routes>
          <Route path="/dashboard/*" element={<DashboardUser />} />
          <Route path='/registration/*' element={<FormRegistrationForm />} />
          <Route path='/account/*' element={<UserProfile />} />
          <Route path='/people/*' element={<MemberList />} />
          <Route path='/invoice/*' element={<RoomBillPage />} />
          <Route path='/report/*' element={<UserReport />} />
          <Route path='/anhhhoadon/*' element={<Upanhhoadon />} />
        </Routes>
      </div>
    </div>

  )
}

export default LayoutUser
