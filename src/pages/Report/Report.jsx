import { Route, Routes } from 'react-router-dom'
import ListReport from '../../components/Report/ListReport';
import DetailReport from '../../components/Report/DetailReport';
const Report = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListReport/>} />
                <Route path='/detailReport/:_id' element = {<DetailReport/>} />
            </Routes>
        </>
    )
}
export default Report;