import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../Header/Header"
import "./ListAccount.css"
import {faCaretDown, faChevronLeft, faChevronRight, faLock, faMagnifyingGlass, faPrint, faUnlock } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import { getAllAccount, handleUser } from "../../service/ManagerAPI/AccountAPI"
import LimitSelectPopup from "../LimitSelectPopup/LimitSelectPopup"
import {Modal} from 'antd';
import { notification} from 'antd';
const ListAccount = () =>{

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

    const limitBtnRef = useRef(null)
    const [isOpenLimitPopup,setIsOpenLimitPopup] = useState(false)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [email, setEmail] = useState(null);
    const [listAccount, setListAccount] = useState([]);
    const [accountQuantity, setAccountQuantity] = useState(null);
    const [pageQuantity, setPageQuantity] = useState(null);
    const [render, setRender] = useState(false)

    const handlePrevPage = () => {
		if (page > 1) {
			setPage((prev) => prev - 1);
		}
	};

    const handleNextPage = () => {
		if (page < pageQuantity) {
			setPage((prev) => prev + 1);
		}
	};

    const fetchListAccount = async () =>{
        const res = await getAllAccount({page: page, limit: limit, email: email})
        console.log(res);
        setListAccount(res.data);
        setAccountQuantity(res.totalUsers)
        setPageQuantity(res.totalPages);
    }

    const handleLockAccount = async (id) =>{
        try {
            const action = "blocked"
            const res = await handleUser(id, action);
            if (res.status === "success") {
                openNotificationWithIcon('success', "Khoá tài khoản thành công");
            } else {
                openNotificationWithIcon('error', "Khoá tài khoản thất bại");
            }
            setRender(!render);
        } catch (error) {
            console.log(error);
            openNotificationWithIcon('error', "Lỗi khi khoá");
        }
    }

    const OnLock = (id) =>{
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn chắc muốn khoá tài khoản này?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: async () => {
                await handleLockAccount(id);
            },
            onCancel: () => {},
        });
    }

    const handleUnLockAccount = async (id) =>{
        try {
            const action = "available"
            const res = await handleUser(id, action);
            if (res.status === "success") {
                openNotificationWithIcon('success', "Mở khoá tài khoản thành công");
            } else {
                openNotificationWithIcon('error', "Mở khoá tài khoản thất bại");
            }
            setRender(!render);
        } catch (error) {
            console.log(error);
            openNotificationWithIcon('error', "Lỗi khi mở khoá");
        }
    }

    const OnUnLock = (id) =>{
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn chắc muốn mở khoá tài khoản này?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: async () => {
                await handleUnLockAccount(id);
            },
            onCancel: () => {},
        });
    }

    
    useEffect(()=>{
        fetchListAccount();
    }, [limit, page, email, render])
    return(
        <>
            {contextHolder}
            <div className="list-account">
                <Header title={"Danh sách tài khoản"}/>
                <div className="right__listPage">
                    <div className="toolbar">
                        <button className="btn-base" style={{visibility: "hidden"}}>
                            <span className="btn-icon">
                                <FontAwesomeIcon icon={faPrint} style={{height: '15px'}}/>
                            </span>
                            <span className="btn-title">
                                Xuất file
                            </span>
                        </button>
                    </div>
                    <div className="main_table">
                        <div className="main_table-scroller">
                            <div className="box-scroller">
                                <div  className="group-scroller-btns">
                                    <button className="btn-scroller active">Tất cả tài khoản</button>
                                </div>
                            </div>
                        </div>
                        <div className="main_table-search-filter">
                            <div className="box-search-filter-btns">
                                <div className="box-search">
                                    <div className="box-input">
                                        <div className="search-icon">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                                        </div>
                                        <input 
                                            placeholder="Tìm kiếm theo tên email" 
                                            type="text"
                                            name="search"
                                            id=""
                                            autoComplete="on"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <fieldset className="input-field" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main_table-headers">
                            <table className="box-table-headers">
                                <colgroup>
                                    <col style={{width: "100px", alignItems: "center"}}/>
                                    <col style={{width: "300px", alignItems: "center"}}/>
                                    <col style={{width: "200px", alignItems: "center"}}/>
                                    <col style={{width: "200px", alignItems: "center"}}/>
                                    <col style={{width: "150px", alignItems: "center"}}/>
                                </colgroup>
                                <thead>
                                    <tr className="group-table-headers">
                                        <th
                                            colSpan={1}
                                            rowSpan={1}
                                            className="table-header-item"
                                        >
                                            Số thứ tự
                                        </th>
                                        <th
                                            colSpan={1}
                                            rowSpan={1}
                                            className="table-header-item"
                                        >
                                            Email
                                        </th>
                                        <th
                                            colSpan={1}
                                            rowSpan={1}
                                            className="table-header-item"
                                        >
                                            Vai trò
                                        </th>
                                        <th
                                            colSpan={1}
                                            rowSpan={1}
                                            className="table-header-item"
                                        >
                                            Trạng thái
                                        </th>
                                        <th
                                            colSpan={1}
                                            rowSpan={1}
                                            className="table-header-item"
                                        >
                                            Tác vụ
                                        </th>
                                    </tr>    
                                </thead>
                            </table>
                        </div>
                        <div className="table-data__container">
                            <table className="box-table-data">
                                <colgroup>
                                    <col style={{width: "100px", alignItems: "center"}}/>
                                    <col style={{width: "300px", alignItems: "center"}}/>
                                    <col style={{width: "200px", alignItems: "center"}}/>
                                    <col style={{width: "200px", alignItems: "center"}}/>
                                    <col style={{width: "150px", alignItems: "center"}}/>
                                </colgroup>
                                <tbody>
                                    {listAccount.map((account, index) =>{
                                        return(
                                            <tr key={account?.id} className="table-data-row">
                                                <td
                                                    colSpan={1}
                                                    rowSpan={1}
                                                    className="table-data-item"
                                                >
                                                    <p className="box-text">
                                                        {index + 1}
                                                    </p>
                                                </td>
                                                <td
                                                    colSpan={1}
                                                    rowSpan={1}
                                                    className="table-data-item"
                                                >
                                                    <p className="box-text">
                                                        {account?.email}
                                                    </p>
                                                </td>
                                                <td
                                                    colSpan={1}
                                                    rowSpan={1}
                                                    className="table-data-item"
                                                >
                                                    <p className="box-text">
                                                        {account?.role}
                                                    </p>
                                                </td>
                                                { account?.status === "available" ?
                                                    (
                                                        <td
                                                            colSpan={1}
                                                            rowSpan={1}
                                                            className="table-data-item"
                                                        >
                                                            <p className="box-green">
                                                                Đang dùng
                                                            </p>
                                                        </td>
                                                    ) :
                                                    ( account?.status === "blocked" ?
                                                        <td
                                                            colSpan={1}
                                                            rowSpan={1}
                                                            className="table-data-item"
                                                        >
                                                            <p className="box-red">
                                                                Đã khoá
                                                            </p>
                                                        </td>
                                                        :
                                                        <td
                                                            colSpan={1}
                                                            rowSpan={1}
                                                            className="table-data-item"
                                                        >
                                                            <p className="box-red">
                                                                {account?.status}
                                                            </p>
                                                        </td>
                                                    )
                                                }
                                                {account?.role !== "Quản lý" ?
                                                    (
                                                        <td
                                                            colSpan={1}
                                                            rowSpan={1}
                                                            className="table-data-item"
                                                        >
                                                            <div className="tool-account">
                                                                { account?.status === "available" ?
                                                                    (<FontAwesomeIcon icon={faLock} className="icon-lock" onClick={() => OnLock(account._id)}/>) :
                                                                    (<FontAwesomeIcon icon={faUnlock} className="icon-unlock" onClick={() => OnUnLock(account._id)}/>)

                                                                
                                                                }
                                                            </div>
                                                        </td>
                                                    ): 
                                                    (
                                                        <td
                                                            colSpan={1}
                                                            rowSpan={1}
                                                            className="table-data-item"
                                                        >
                                                            <p className="box-text">
                                                            </p>
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="right__table-pagination">
                        <div className="display-title" style={{color: "#0F1824"}}>
                            Hiển thị
                        </div>
                        <div className="box-page-limit">
                            <button
                                ref={limitBtnRef}
                                onClick={() => setIsOpenLimitPopup(!isOpenLimitPopup)}
                                className={`btn-page-limit ${isOpenLimitPopup ? 'selected' : ''}`}
                            >
                                {limit}
                                <span>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </span>
                            </button>
                            {isOpenLimitPopup && (
                                <LimitSelectPopup
                                    btnRef={limitBtnRef}
                                    closePopup={() => setIsOpenLimitPopup(false)}
                                    limit={limit}
                                    handleChangeLimit={(limit) => {
                                        setLimit(limit);
                                        setPage(1)
                                    }}
                                />
                            )}
                        </div>
                        <div className="title-1" style={{display: "flex", flexDirection: "row", gap: '5px'}}>
                            <div>Kết quả.</div>
                            <div className="item-quantity">
                                Từ {(page - 1) * limit + 1} đến{" "}
                                {page * limit > accountQuantity ? accountQuantity : page * limit} trên tổng{" "}
                                {accountQuantity}
                            </div>
                        </div>
                        <div className="prev">
                            <button
                                className={`btn_prev ${page === 1 ? 'inactive' : ''}`}
                                onClick={handlePrevPage}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                        </div>
                        <div className="page">
                            {page}
                        </div>
                        <div className="next">
                            <button
                                className={`btn_next ${page === accountQuantity ? 'inactive' : ''}`}
                                onClick={handleNextPage}
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListAccount