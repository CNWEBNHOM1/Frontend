import { Route, Routes } from 'react-router-dom'
import ListRequest from "../../components/Request/ListRequest.jsx"
const Request = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListRequest/>} />
            </Routes>
        </>
    )
}
export default Request;