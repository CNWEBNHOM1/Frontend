import { Route, Routes } from 'react-router-dom'
import ListReport from '../../components/Report/ListReport';
const Report = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListReport/>} />
            </Routes>
        </>
    )
}
export default Report;