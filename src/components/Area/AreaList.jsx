/* eslint-disable no-unused-vars */

import { withAuthorization } from "../../hoc"
import Header from "../Header/Header"
import "./AreaList.css"
const AreaList = () => {
  return (
    <div className="area-list">
        <Header title={"Khu ký túc xá"}/>
        AreaList
    </div>
  )
}

//export default withAuthorization(AreaList, ["MANAGER"])
export default AreaList
