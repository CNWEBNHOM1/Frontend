import Header from "../../components/Header/Header"
import { withAuthorization } from '../../hoc';
import "./DashboardManager.css"
const DashboardManager = () => {
  return (
    <div className="dashboard-manager">
        <Header title={"Trang chủ"}/>
        DashboardManager
    </div>
  )
}

export default withAuthorization(DashboardManager, ["Quản lý"])
