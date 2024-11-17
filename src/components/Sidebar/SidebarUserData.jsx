
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import BedIcon from '@mui/icons-material/Bed';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReportIcon from '@mui/icons-material/Report';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { FaHouseChimney } from "react-icons/fa6";
export const SidebarUserData = [
    {
        title: "Trang chủ",
        icon: <HomeIcon />,
        link: "/user/dashboard"
    },
    {
        title: "Khu ký túc",
        icon: <DomainIcon />,
        link: "/user/area"
    },
    {
        title: "Phòng",
        icon: <BedIcon />,
        link: "/user/room"
    },
    {
        title: "Thành viên",
        icon: <PeopleIcon />,
        link: "/user/people"
    },
    {
        title: "Hoá đơn",
        icon: <ReceiptLongIcon />,
        link: "/user/invoice"
    },
    {
        title: "Báo cáo",
        icon: <ReportIcon />,
        link: "/user/report"
    },
    {
        title: "Tài khoản",
        icon: <ManageAccountsIcon />,
        link: "/user/account"
    },
    {
        title: "Form Đăng Ký Phòng",
        icon: <FaHouseChimney />,
        link: "/user/registration"
    },
    {
        title: "Up Load Hóa Đơn",
        icon: <FaHouseChimney />,
        link: "/user/anhhhoadon"
    }
]
