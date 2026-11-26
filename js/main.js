const STORAGE_KEY = "EMPLOYEES_DATA";

// Dữ liệu mẫu khởi tạo ban đầu nếu localStorage chưa có dữ liệu (giống ảnh đề bài)
const defaultEmployees = [
    {
        id: "NV123",
        name: "Nguyện Văn Thạo",
        phone: "0945234125",
        account: "thaonv",
        email: "thaonv@gmail.com",
        year: "1994"
    },
    {
        id: "NV345",
        name: "Trần Trọng Phúc",
        phone: "0965345123",
        account: "phuctt",
        email: "phuctt@gmail.com",
        year: "1995"
    },
    {
        id: "NV456",
        name: "Nguyễn Chí Tài",
        phone: "986543789",
        account: "tainc",
        email: "tainc@gmail.com",
        year: "1996"
    }
];

let selectedEmployeeId = null; // Lưu mã nhân viên đang được chọn trên bảng

// Lấy danh sách nhân viên từ localStorage
function getEmployees() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEmployees));
        return defaultEmployees;
    }
    return JSON.parse(data);
}

// Lưu danh sách nhân viên vào localStorage
function saveEmployees(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// 1. Load màn hình: Hiển thị danh sách nhân viên lên bảng
function renderTable(employees) {
    const tbody = document.getElementById("employeeTableBody");
    tbody.innerHTML = "";

    if (employees.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8">Không có dữ liệu nhân viên</td></tr>`;
        return;
    }

    employees.forEach((emp, index) => {
        const tr = document.createElement("tr");
        if (emp.id === selectedEmployeeId) {
            tr.classList.add("selected-row");
        }

        // Tạo màu badge năm sinh
        const badgeClass = parseInt(emp.year) >= 1996 ? "badge-orange" : "badge-green";

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.phone}</td>
            <td>${emp.account}</td>
            <td>${emp.email}</td>
            <td><span class="badge-year ${badgeClass}">${emp.year}</span></td>
            <td>
                <button type="button" class="btn-delete" title="Xóa nhân viên" data-id="${emp.id}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </td>
        `;

        // 5. Chọn một dòng trên table -> Đổ dữ liệu lên các textbox
        tr.addEventListener("click", (e) => {
            // Nếu click trực tiếp vào nút xóa thì xử lý ở sự kiện nút xóa
            if (e.target.closest(".btn-delete")) return;

            selectedEmployeeId = emp.id;
            fillForm(emp);
            renderTable(employees); // Cập nhật highlight dòng đang chọn
        });

        // 4. Nhấn vào hình ảnh xóa nhân viên
        const deleteBtn = tr.querySelector(".btn-delete");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Ngăn sự kiện click lan ra thẻ tr

            // Kiểm tra điều kiện theo đúng yêu cầu đề bài
            if (!selectedEmployeeId || selectedEmployeeId !== emp.id) {
                alert("Bạn vui lòng chọn nhân viên cần xoá");
                return;
            }

            // Thực hiện xóa nhân viên khỏi localStorage và load lại danh sách mới
            let currentList = getEmployees();
            currentList = currentList.filter(item => item.id !== emp.id);
            saveEmployees(currentList);

            selectedEmployeeId = null;
            clearForm();
            renderTable(currentList);
        });

        tbody.appendChild(tr);
    });
}

// Đổ dữ liệu nhân viên lên form phía trên
function fillForm(emp) {
    document.getElementById("empId").value = emp.id;
    document.getElementById("empName").value = emp.name;
    document.getElementById("empPhone").value = emp.phone;
    document.getElementById("empAccount").value = emp.account;
    document.getElementById("empEmail").value = emp.email;
    document.getElementById("empYear").value = emp.year;
}

// Làm trống form phía trên
function clearForm() {
    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("empPhone").value = "";
    document.getElementById("empAccount").value = "";
    document.getElementById("empEmail").value = "";
    document.getElementById("empYear").value = "";
}

// 2. Nhấn button "Tìm kiếm"
document.getElementById("btnSearch").addEventListener("click", () => {
    const keyword = document.getElementById("searchId").value.trim();

    if (!keyword) {
        alert("Bạn cần nhập mã nhân viên");
        renderTable(getEmployees());
        return;
    }

    const allEmployees = getEmployees();
    const filtered = allEmployees.filter(emp => 
        emp.id.toLowerCase().includes(keyword.toLowerCase())
    );
    renderTable(filtered);
});

// 3. Nhấn button "Thêm mới nhân viên" -> Chuyển sang trang add.html
document.getElementById("btnGoToAdd").addEventListener("click", () => {
    window.location.href = "add.html";
});

// 6. Nhấn button "Sửa thông tin"
document.getElementById("btnUpdate").addEventListener("click", () => {
    const id = document.getElementById("empId").value.trim();
    if (!id) {
        alert("Vui lòng chọn một nhân viên trên bảng để sửa thông tin!");
        return;
    }

    const name = document.getElementById("empName").value.trim();
    const phone = document.getElementById("empPhone").value.trim();
    const account = document.getElementById("empAccount").value.trim();
    const email = document.getElementById("empEmail").value.trim();
    const year = document.getElementById("empYear").value.trim();

    // Kiểm tra hợp lệ cơ bản khi cập nhật
    if (!name || !phone || !account || !email || !year) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    if (phone.length < 10 || isNaN(phone)) {
        alert("Số điện thoại phải là số và có độ dài lớn hơn hoặc bằng 10");
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email không đúng định dạng");
        return;
    }

    // Cập nhật dữ liệu vào localStorage
    const employees = getEmployees();
    const index = employees.findIndex(emp => emp.id === id);

    if (index !== -1) {
        employees[index] = { id, name, phone, account, email, year };
        saveEmployees(employees);
        alert("Cập nhật thông tin nhân viên thành công!");
        selectedEmployeeId = null;
        clearForm();
        renderTable(employees);
    }
});

// Khởi chạy khi tải xong trang
window.addEventListener("DOMContentLoaded", () => {
    renderTable(getEmployees());
});