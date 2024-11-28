/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header"
import { withAuthorization } from '../../hoc';
import "./DashboardManager.css"
import { faBuilding, faFile } from "@fortawesome/free-regular-svg-icons";
import { faBook, faFileInvoice, faHouse, faPerson } from "@fortawesome/free-solid-svg-icons";
import Detail from "./Detail";
import { getListDepartment } from "../../service/ManagerAPI/DepartmentAPI";
import { useEffect, useState } from "react";
import { getListRoom } from "../../service/ManagerAPI/RoomAPI";
import { getListStudent } from "../../service/ManagerAPI/StudentAPI";
import { getListBill } from "../../service/ManagerAPI/BillAPI";
import { getListReport } from "../../service/ManagerAPI/ReportAPI";
import { getListRequest } from "../../service/ManagerAPI/RequestAPI";
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

  const [totalDepartment, setTotalDepartment] = useState(null);
  const [totalRoom, setTotalRoom] = useState(null)
  const [totalStudent,setTotalStudent] = useState(null)
  const [totalBill, setTotalBill] = useState(null)
  const [totalReprt,setTotalReprt] = useState(null)
  const [totalRequest,setTotalRequest] = useState(null)
  const {title, setTitle} = useState("Thông tin khu ký túc")

  const fetchAreaList = async () =>{
    const areas = await getListDepartment({page: 1, limit: 1000, name: null});
    setTotalDepartment(areas.data.total);
  };

  const fetchRoomList =  async () =>{
    const rooms = await getListRoom({
        page: 1,
        limit: 1000,
        department: null
    })
    setTotalRoom(rooms.data.total)
  }

  const fetchListStudent = async () =>{
    const students = await getListStudent({page: 1, limit: 1000, name: null, room: null, trangthai: null});
    setTotalStudent(students.totalStudents)
  }

  const fetchListBill = async () =>{
    const bills = await getListBill(filterBody);
    setTotalBill(bills.data.total);
  }
  const fetchListReport = async () =>{
    const reports = await getListReport(filterBody);
    setTotalReprt(reports.data.total);
  }

  const fetchListRequest = async () =>{
    const request = await getListRequest({page: 1, limit: 1000, status: null,room: null, name: null })
    setTotalRequest(request.totalRequests)
  }



  useEffect(()=>{
    fetchListRequest();
  }, [])

  useEffect(()=>{
      fetchListReport();
  }, [])

  useEffect(() =>{
    fetchAreaList();
  }, [])
  useEffect(() =>{
    fetchRoomList();
  }, [])
  useEffect(() =>{
    fetchListStudent();
  }, [])
  useEffect(() =>{
    fetchListBill();
  }, [])



  

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
              <div className="menu-room">
                <div className="menu-icon-room">
                  <FontAwesomeIcon icon={faHouse} style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-room1">Phòng</div>
                  <div className="title-room2">{totalRoom}</div>
                </div>
              </div>
              <div className="menu-people">
                <div className="menu-icon-people">
                  <FontAwesomeIcon icon={faPerson} style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-people1">Thành viên</div>
                  <div className="title-people2">{totalStudent}</div>
                </div>
              </div>
              <div className="menu-invoice">
                <div className="menu-icon-invoice">
                  <FontAwesomeIcon icon={faFileInvoice} style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-invoice1">Hoá đơn</div>
                  <div className="title-invoice2">{totalBill}</div>
                </div>
              </div>
              <div className="menu-report">
                <div className="menu-icon-report">
                  <FontAwesomeIcon icon={faBook} style={{color: "#FFFFFF", width: "25px", height: "25px"}}/>
                </div>
                <div className="menu-title">
                  <div className="title-report1">Báo cáo</div>
                  <div className="title-report2">{totalReprt}</div>
                </div>
              </div>
              <div className="menu-request">
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
          <Detail title={"Thông tin kho"} />
        </div>
    </div>
  )
}

export default withAuthorization(DashboardManager, ["Quản lý"])
