import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from "../../actions/auth";
import { useEffect } from 'react';
const Login = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.role);

    const doLogin = () => {
        dispatch(login());
    }

    useEffect(()=>{
        if(isAuthenticated){
            if(role === "MANAGER"){
                navigate("/manager")
            } else if(role === "USER"){
                navigate("/user")
            }
        }
    },[isAuthenticated, navigate,role])
    return(
        <div>
            <button onClick={ () => doLogin()}>LOGIN</button>
        </div>
    )
}

export default Login