/* eslint-disable no-unused-vars */
export const formatDate = (dateTimeString) => {
    if (!dateTimeString) {
        return ; // Xử lý lỗi nếu chuỗi thời gian không hợp lệ
    }
    // Loại bỏ phần mili giây nếu có và đảm bảo định dạng hợp lệ
    const cleanString = dateTimeString.split('.')[0]; // Loại bỏ phần mili giây (sau dấu '.')

    // Tạo đối tượng Date từ chuỗi đầu vào
    const dateObj = new Date(cleanString);

    // Kiểm tra xem đối tượng Date có hợp lệ không
    if (isNaN(dateObj.getTime())) {
        return "Invalid date"; // Xử lý lỗi nếu chuỗi thời gian không hợp lệ
    }

    // Lấy ngày, tháng, năm
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // getMonth() trả về tháng từ 0-11
    const year = dateObj.getFullYear();

    // Lấy giờ và phút
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    // Kết hợp các phần để ra định dạng mong muốn
    return `${day}/${month}/${year}`;
}

export const formatDateWithHour = (dateTimeString) => {
    if (!dateTimeString) {
        return; // Xử lý lỗi nếu chuỗi thời gian không hợp lệ
    }
    // Loại bỏ phần mili giây nếu có và đảm bảo định dạng hợp lệ
    const cleanString = dateTimeString.split('.')[0]; // Loại bỏ phần mili giây (sau dấu '.')

    // Tạo đối tượng Date từ chuỗi đầu vào
    const dateObj = new Date(cleanString);

    // Kiểm tra xem đối tượng Date có hợp lệ không
    if (isNaN(dateObj.getTime())) {
        return "Invalid date"; // Xử lý lỗi nếu chuỗi thời gian không hợp lệ
    }

    // Lấy ngày, tháng, năm
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // getMonth() trả về tháng từ 0-11
    const year = dateObj.getFullYear();

    // Lấy giờ và phút
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

    // Kết hợp các phần để ra định dạng mong muốn
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};
