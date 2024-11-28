export function formatCurrencyVND(amount) {
    if (amount == null || amount === "") return "";
    // Đảm bảo amount là số
    const number = parseFloat(amount);
    if (isNaN(number)) return "";

    // Format thành tiền VND
    return number.toLocaleString("vi-VN") + " VND";
}