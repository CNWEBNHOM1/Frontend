import { Route, Routes } from 'react-router-dom'
import ListRooms from "../../components/Rooms/ListRooms.jsx";
const Room = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListRooms/>} />
            </Routes>
        </>
    )
}
export default Room;