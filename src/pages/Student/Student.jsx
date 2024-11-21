import { Route, Routes } from 'react-router-dom'
import ListStudent from '../../components/Student/ListStudent';
const Student = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListStudent/>} />
            </Routes>
        </>
    )
}
export default Student;