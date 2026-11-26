const STORAGE_KEY = "EMPLOYEES_DATA";

// Lấy danh sách nhân viên hiện có từ localStorage
function getEmployees() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// 1. Nhấn button "Lưu thông tin"
document.getElementById("addEmployeeForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("newEmpId").value.trim();
    const name = document.getElementById("newEmpName").value.trim();
    const phone = document.getElementById("newEmpPhone").value.trim();
    const account = document.getElementById("newEmpAccount").value.trim();
    const email = document.getElementById("newEmpEmail").value.trim();
    const year = document.getElementById("newEmpYear").value.trim();

    // Điều kiện 1: Bắt buộc nhập tất cả thông tin
    if (!id || !name || !phone || !account || !email || !year) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    // Điều kiện 2: Kiểm tra số điện thoại có độ dài lớn hơn hoặc bằng 10
    if (phone.length < 10 || !/^\d+$/.test(phone)) {
        alert("Số điện thoại phải có độ dài lớn hơn hoặc bằng 10 chữ số");
        return;
    }

    // Điều kiện 3: Email đúng định dạng
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email không đúng định dạng");
        return;
    }

    // Điều kiện 4: Mã nhân viên không được trùng nhau
    const employees = getEmployees();
    const isDuplicate = employees.some(emp => emp.id.toLowerCase() === id.toLowerCase());
    if (isDuplicate) {
        alert("Mã nhân viên đã tồn tại, vui lòng nhập mã khác!");
        return;
    }

    // Lưu nhân viên mới vào localStorage
    const newEmployee = { id, name, phone, account, email, year };
    employees.push(newEmployee);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));

    alert("Thêm mới nhân viên thành công!");

    // Xóa các giá trị vừa nhập, trả về rỗng như ban đầu
    document.getElementById("addEmployeeForm").reset();
});

// 2. Nhấn button "Huỷ" -> Chuyển về trang Danh sách nhân viên
document.getElementById("btnCancel").addEventListener("click", () => {
    window.location.href = "index.html";
});