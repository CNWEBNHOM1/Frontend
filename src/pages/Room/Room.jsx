import { Route, Routes } from 'react-router-dom'
import ListRooms from "../../components/Rooms/ListRooms.jsx";
import CreateRoom from '../../components/Rooms/CreateRoom.jsx';
import DetailRoom from '../../components/Rooms/DetailRoom.jsx';
const Room = () =>{
    return(
        <>
            <Routes>
                <Route path='/' element = {<ListRooms/>} />
                <Route path='/create' element = {<CreateRoom/>} />
                <Route path='/detail/:id' element = {<DetailRoom/>} />
            </Routes>
        </>
    )
}
export default Room;