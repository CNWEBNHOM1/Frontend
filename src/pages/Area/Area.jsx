import { Route, Routes } from 'react-router-dom'
import AreaList from '../../components/Area/AreaList'

const Area = () => {
  return (
    <>
        <Routes>
            <Route path='/' element = {<AreaList/>} />
        </Routes>    
    </>
  )
}

export default Area
