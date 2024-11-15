import { Route, Routes } from 'react-router-dom'
import ListRooms from "../../components/Rooms/ListRooms.jsx";
import CreateRoom from '../../components/Rooms/CreateRoom.jsx';
const Room = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListRooms/>} />
                <Route path='/create' element = {<CreateRoom/>} />
            </Routes>
        </>
    )
}
export default Room;