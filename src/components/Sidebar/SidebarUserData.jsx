
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReportIcon from '@mui/icons-material/Report';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { TbLockPassword } from "react-icons/tb";

export const SidebarUserData = [
    {
        title: "Trang chủ",
        icon: <HomeIcon />,
        link: "/user/dashboard"
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
        title: "Đổi mật khẩu",
        icon: < TbLockPassword />,
        link: "/user/change-password"
    }

]