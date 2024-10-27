const rooms = {
    toaA: ["Phòng A1", "Phòng A2", "Phòng A3"],
    toaB: ["Phòng B1", "Phòng B2", "Phòng B3"],
    toaC: ["Phòng C1", "Phòng C2", "Phòng C3"]
};

function updateRoomList() {
    const building = document.getElementById("building").value;
    const roomSelect = document.getElementById("room");
    roomSelect.innerHTML = ""; // Xóa các tùy chọn cũ

    if (building) {
        rooms[building].forEach(room => {
            const option = document.createElement("option");
            option.value = room;
            option.textContent = room;
            roomSelect.appendChild(option);
        });
    } else {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "Chọn phòng";
        roomSelect.appendChild(option);
    }
}

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn form submit để xử lý trước khi gửi

    const fullname = document.getElementById('fullname').value.trim();
    const mssv = document.getElementById('mssv').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (fullname === '' || mssv === '' || email === '' || phone === '' || address === '') {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert('Số điện thoại không hợp lệ! Phải có 10 chữ số.');
        return;
    }

    // Sau khi validate thành công
    alert('Đăng ký thành công!');
    // Ở đây, bạn có thể gửi dữ liệu form đến server hoặc database khi kết nối với backend sau này
    // this.submit();  // Mở dòng này nếu muốn submit sau khi validate
});
