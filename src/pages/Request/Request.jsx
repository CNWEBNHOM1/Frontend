import { Route, Routes } from 'react-router-dom'
import ListRequest from "../../components/Request/ListRequest.jsx"
import DetailRequest from '../../components/Request/DetailRequest.jsx';
const Request = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListRequest/>} />
                <Route path='/detail/:id' element = {<DetailRequest/>} />
            </Routes>
        </>
    )
}
export default Request;