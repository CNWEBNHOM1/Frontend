
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import BedIcon from '@mui/icons-material/Bed';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReportIcon from '@mui/icons-material/Report';
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
        link : "/manager/area"
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
        title: "Tài khoản",
        icon: <ManageAccountsIcon />,
        link : "/manager/account"   
    },
]
