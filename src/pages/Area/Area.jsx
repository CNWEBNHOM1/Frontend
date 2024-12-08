import { Route, Routes } from 'react-router-dom'
import AreaList from '../../components/Area/AreaList'
import DetailDepartment from '../../components/Area/DetailDepartment'

const Area = () => {
  return (
    <>
        <Routes>
            <Route path='/' element = {<AreaList/>} />
            <Route path='/detail/:id' element = {<DetailDepartment/>} />
        </Routes>    
    </>
  )
}

export default Area
