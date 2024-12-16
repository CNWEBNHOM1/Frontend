/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header"
import { withAuthorization } from '../../hoc';
import "./DashboardManager1.css"
import { faBuilding, faFile } from "@fortawesome/free-regular-svg-icons";
import { faBook, faFileInvoice, faHouse, faPerson } from "@fortawesome/free-solid-svg-icons";
import Detail from "./Detail";
import { getListDepartment } from "../../service/ManagerAPI/DepartmentAPI";
import { useEffect, useState } from "react";
import { getListRoom, getStatisticRooms } from "../../service/ManagerAPI/RoomAPI";
import { getListStudent, getstatisticStudents } from "../../service/ManagerAPI/StudentAPI";
import { getListBill, getStatisticBills } from "../../service/ManagerAPI/BillAPI";
import { getListReport, getStatisticReports } from "../../service/ManagerAPI/ReportAPI";
import { getListRequest, getStatisticRequests } from "../../service/ManagerAPI/RequestAPI";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
const filterBody = {
  page: 1,
  limit: 1000,
  trangthai: null,
  room: null,
  department:null,
  overdue: false,
  fromDate: null,
  toDate: null,
  sortOrder: -1
}

const DashboardManager = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [totalDepartment, setTotalDepartment] = useState(null);
  const [totalRoom, setTotalRoom] = useState(null)
  const [totalStudent,setTotalStudent] = useState(null)
  const [totalBill, setTotalBill] = useState(null)
  const [totalReprt,setTotalReprt] = useState(null)
  const [totalRequest,setTotalRequest] = useState(null)
  const [title, setTitle] = useState("Thông tin tất cả phòng")
  const [listObject, setListObject] = useState([]);
  const [urlLink, setUrlLink] = useState("/room");

  const fetchAllData = async () => {
    try {
      const [areas, rooms, students, bills, reports, requests] = await Promise.all([
        getListDepartment({ page: 1, limit: 1000, name: null }),
        getListRoom({ page: 1, limit: 1000, department: null }),
        getListStudent({ page: 1, limit: 1000, name: null, room: null, trangthai: null }),
        getListBill(filterBody),
        getListReport(filterBody),
        getListRequest({ page: 1, limit: 1000, status: null, room: null, name: null }),
      ]);

      setTotalDepartment(areas.data.total);
      setTotalRoom(rooms.data.total);
      setTotalStudent(students.totalStudents);
      setTotalBill(bills.data.total);
      setTotalReprt(reports.data.total);
      setTotalRequest(requests.totalRequests);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Giữ hiệu ứng tải ít nhất 0.5 giây
      setTimeout(() => setIsLoading(false), 200);
    }
  };

  const fetchDataToDisplayDetail = async () =>{
    if(title === "Thông tin tất cả phòng"){
      setUrlLink("room")
      const res = await getStatisticRooms();
      setListObject([
        {label: "Số phòng bình thường", number: res.data.count_male_available + res.data.count_female_available},
        {label: "Số phòng bị hỏng", number: res.data.count_male_unavailable + res.data.count_female_unavailable},
        {label: "Số phòng cho nam", number: res.data.count_male_available + res.data.count_male_unavailable},
        {label: "Số phòng cho nữ", number: res.data.count_female_available + res.data.count_female_unavailable}
      ])
    }
    else if(title === "Thông tin tất cả thành viên"){
      setUrlLink("people")
      const res = await getstatisticStudents();
      setListObject([
        {label: "Đang ở", number: res.data.count_male_living + res.data.count_female_living},
        {label: "Dừng ở", number: res.data.count_male_stop_living + res.data.count_female_stop_living},
        {label: "Thành viên nam", number: res.data.count_male_living + res.data.count_male_stop_living},
        {label: "Thành viên nữ", number: res.data.count_female_living + res.data.count_female_stop_living}
      ])
    }
    else if(title === "Thông tin tất cả hoá đơn"){
      setUrlLink("bill")
      const res = await getStatisticBills();
      setListObject([
        {label: "Đã đóng", number: res.data.count_paid},
        {label: "Chưa đóng", number: res.data.count_notYetPaid},
      ])
    }
    else if(title === "Thông tin tất cả báo cáo"){
      setUrlLink("report")
      const res = await getStatisticReports();
      setListObject([
        {label: "Đã xử lý", number: res.data.count_done},
        {label: "Chưa xử lý", number: res.data.count_pending},
      ])
    }
    else if(title === "Thông tin tất cả yêu cầu"){
      setUrlLink("request")
      const res = await getStatisticRequests();
      setListObject([
        {label: "Đã thanh toán", number: res.data.count_pending},
        {label: "Đã chấp nhận", number: res.data.count_approved},
        {label: "Đã từ chối", number: res.data.count_declined},
        {label: "Chưa thanh toán", number: res.data.count_unpaid},
      ])
    }
  }

  



  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() =>{
    fetchDataToDisplayDetail()
  }, [title])


  if (isLoading) {
    return (
      <Flex align="center" gap="middle" className="loading-dashboard-manager">
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 60,
              }}
              spin
            />
          }
        />
      </Flex>
    );
  }
  return (
    <div className="dashboard-manager">
        <Header title={"Trang chủ"}/>
        <div className="dashboard-content">
          <div className="dashboard-toolbar">
            <div className="dashboard-toolbar-header">
              THỐNG KÊ SỐ LIỆU
            </div>
            <div className="dashboard-toolbar-menu">
              <div className="menu-department">
                <div className="menu-icon-department">
                  <FontAwesomeIcon icon={faBuilding} style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-department1">Khu ký túc</div>
                  <div className="title-department2">{totalDepartment}</div>
                </div>
              </div>
              <div className="menu-room" onClick={() => setTitle("Thông tin tất cả phòng")}>
                <div className="menu-icon-room">
                  <FontAwesomeIcon icon={faHouse} style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-room1">Phòng</div>
                  <div className="title-room2">{totalRoom}</div>
                </div>
              </div>
              <div className="menu-people" onClick={() => setTitle("Thông tin tất cả thành viên")}>
                <div className="menu-icon-people">
                  <FontAwesomeIcon icon={faPerson} style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-people1">Thành viên</div>
                  <div className="title-people2">{totalStudent}</div>
                </div>
              </div>
              <div className="menu-invoice" onClick={() => setTitle("Thông tin tất cả hoá đơn")}>
                <div className="menu-icon-invoice">
                  <FontAwesomeIcon icon={faFileInvoice} style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-invoice1">Hoá đơn</div>
                  <div className="title-invoice2">{totalBill}</div>
                </div>
              </div>
              <div className="menu-report" onClick={() => setTitle("Thông tin tất cả báo cáo")}>
                <div className="menu-icon-report">
                  <FontAwesomeIcon icon={faBook} style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-report1">Báo cáo</div>
                  <div className="title-report2">{totalReprt}</div>
                </div>
              </div>
              <div className="menu-request" onClick={() => setTitle("Thông tin tất cả yêu cầu")}>
                <div className="menu-icon-request">
                  <FontAwesomeIcon icon={faFile}  style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-request1">Yêu cầu</div>
                  <div className="title-request2">{totalRequest}</div>
                </div>
              </div>
            </div>
          </div>
          <Detail title={title}  listObject={listObject} urlLink = {urlLink}/>
        </div>
    </div>
  )
}

export default withAuthorization(DashboardManager, ["Quản lý"])
