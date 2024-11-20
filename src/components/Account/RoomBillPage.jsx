import React from 'react';
import BillList from './BillList.jsx';
import Header from "../Header/Header";
function RoomBillPage() {
    const roomId = "101"; // ID của phòng
    const month = 11; // Tháng cần xem
    const year = 2024; // Năm cần xem

    return (
        <>   <Header title={"Trang chủ"} />
            <div>
                <BillList roomId={roomId} month={month} year={year} />
            </div>
        </>
    );
}

export default RoomBillPage;
