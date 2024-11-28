import { Route, Routes } from 'react-router-dom'
import ListStudent from '../../components/Student/ListStudent';
import DetailStudent from '../../components/Student/DetailStudent';
const Student = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListStudent/>} />
                <Route path='/detail/:id' element = {<DetailStudent/>} />
            </Routes>
        </>
    )
}
export default Student;