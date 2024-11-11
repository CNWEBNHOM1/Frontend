/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Login from './pages/Login/Login'
import SignUp from './pages/Sign_Up/SignUp'
import UnauthorizedPage from './pages/UnauthorizedPage/UnauthorizedPage'
import LayoutManager from './layout/LayoutManager'
import PrivateManagerRoute from './components/PrivateRoute/PrivateMangerRoute'
import PrivateUserRoute from './components/PrivateRoute/PrivateUserRoute'
import LayoutUser from './layout/LayoutUser'
import './styles/App.css'


const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path='/unauthorized' element={<UnauthorizedPage />} />
          <Route path='/manager' element={<Navigate to='/manager/dashboard' />} />
          <Route element={<PrivateManagerRoute isAuthenticated={isAuthenticated} dispatch={dispatch} role={role} />}>
            <Route path='/manager/*' element={<LayoutManager />} />
          </Route>
          <Route path='/manager/*' element={<LayoutManager />} />
          <Route path='/user' element={<Navigate to='/user/dashboard'/>} />
          <Route element={<PrivateUserRoute isAuthenticated={isAuthenticated} dispatch={dispatch} role={role} />}>
            <Route path='/user/*' element={<LayoutUser/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
