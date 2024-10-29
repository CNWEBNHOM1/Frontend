/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { logout } from '../../actions/auth';

const PrivateManagerRoute = ({ isAuthenticated, role, dispatch }) => {

    useEffect(() => {
      if (!isAuthenticated) {
        dispatch(logout())
      }
    }, [isAuthenticated, dispatch]);

    if(!isAuthenticated){
      return <Navigate to='/login'/>  // Điều hướng về trang đăng nhập
    }
    else if(role === "Quản lý"){
      return <Outlet />
    }
    else{
      return <Navigate to="/unauthorized" />; // Điều hướng đến trang không có quyền
    }
};

export default PrivateManagerRoute
  