import { Button } from 'reactstrap'
import errorImage from '../../assets/error-image.svg'
import { useNavigate } from 'react-router'
import "./UnauthorizedPage.css"
const UnauthorizedPage = () =>{
    const navigate = useNavigate();
    return(
        <div className="container-UnauthorizedPage">
            <div className="wrapper-UnauthorizedPage">
                <div className="errorImage">
                    <img  src={errorImage} alt="" />
                </div>
                <h6 className="errorInfo">Bạn không có quyền để vào trang này</h6>
                <p className="errorHelp">Bạn chưa được cấp quyền nên không thể vào được trang này. Vui lòng quay lại trang chủ và liên hệ với admin để được cấp quyền nếu cần thiết.</p>
                <div className="boxBtn">
                    <Button
                        onClick={() => navigate("/login")}
                        className='errorBtn'
                        type="submit"
                        color="secondary-red"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UnauthorizedPage;