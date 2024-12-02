
import HomeIcon from '@mui/icons-material/Home';
import { MdAppRegistration } from "react-icons/md";
;
export const SidebarUserData = [
    {
        title: "Trang chủ",
        icon: <HomeIcon />,
        link: "/auth/dashboard"
    },
    {

        title: "Tạo request",
        icon: <MdAppRegistration />,
        link: "/auth/DormRequestFlow"
    },
    {

        title: "Xem yêu cầu",
        icon: <MdAppRegistration />,
        link: "/auth/CheckRequest"
    },


]