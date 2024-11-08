import { Route, Routes } from 'react-router-dom'
import ListBill from '../../components/Bill/ListBill'
const Bill = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListBill/>} />
            </Routes>   
        </>
    )
}
export default Bill