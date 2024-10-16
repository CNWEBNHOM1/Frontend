import { Navigate } from "react-router-dom";

// HOC kiểm tra quyền
const withAuthorization = (WrappedComponent, allowedRoles) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const role = localStorage.getItem("role"); // Lấy user từ localStorage

    if (role && allowedRoles.includes(role)) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/unauthorized" />; // Điều hướng đến trang không có quyền
    }
  };
};

export default withAuthorization;