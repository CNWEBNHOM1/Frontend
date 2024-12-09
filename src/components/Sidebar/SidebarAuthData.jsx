
import HomeIcon from '@mui/icons-material/Home';
import { MdAppRegistration } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
;
export const SidebarUserData = [
    {
        title: "Trang chủ",
        icon: <HomeIcon />,
        link: "/auth/dashboard"
    },
    {

        title: "Đăng ký phòng",
        icon: <MdAppRegistration />,
        link: "/auth/DormRequestFlow"
    },
    {

        title: "Xem yêu cầu",
        icon: <MdAppRegistration />,
        link: "/auth/CheckRequest"
    },
    {
        title: "Đổi mật khẩu",
        icon: < TbLockPassword />,
        link: "/auth/change-password"
    }


]