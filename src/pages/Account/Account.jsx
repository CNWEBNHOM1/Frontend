import { Route, Routes } from 'react-router-dom'
import ListAccount from '../../components/Account/ListAccount'

const Account = () => {
  return (
    <>
        <Routes>
            <Route path='/' element = {<ListAccount/>} />
        </Routes>    
    </>
  )
}

export default Account