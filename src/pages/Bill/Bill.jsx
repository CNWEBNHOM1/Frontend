import { Route, Routes } from 'react-router-dom'
import ListBill from '../../components/Bill/ListBill'
import DetailBill from '../../components/Bill/DetailBill'
const Bill = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListBill/>} />
                <Route path='/detail/:_id' element = {<DetailBill/>} />
            </Routes>   
        </>
    )
}
export default Bill