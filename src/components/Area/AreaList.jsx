
import { withAuthorization } from "../../hoc"
const AreaList = () => {
  return (
    <div>
        AreaList
    </div>
  )
}

export default withAuthorization(AreaList, ["MANAGER"])
