
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import BedIcon from '@mui/icons-material/Bed';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReportIcon from '@mui/icons-material/Report';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
export const SidebarManagerData =[
    {
        title: "Trang chủ",
        icon: <HomeIcon />,
        link: "/manager/dashboard"

    },
    {
        title: "Khu ký túc",
        icon: <DomainIcon />,
        link : "/manager/department"
    },
    {
        title: "Phòng",
        icon: <BedIcon />,
        link : "/manager/room"   
    },
    {
        title: "Thành viên",
        icon: <PeopleIcon />,
        link : "/manager/people"   
    },
    {
        title: "Hoá đơn",
        icon: <ReceiptLongIcon />,
        link : "/manager/bill"   
    },
    {
        title: "Báo cáo",
        icon: <ReportIcon />,
        link : "/manager/report"   
    },
    {
        title: "Yêu cầu",
        icon: <RequestPageIcon />,
        link : "/manager/request"   
    },
    {
        title: "Tài khoản",
        icon: <SwitchAccountIcon />,
        link : "/manager/account"   
    },
    {
        title: "Đổi mật khẩu",
        icon: < ManageAccountsIcon/>,
        link : "/manager/change-password"   
    }
]
