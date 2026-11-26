"use strict";

let STORAGE_KEY1 = "EMPLOYEES DATA";

function validateEmployeeInput(maNV, soDienThoai) {
    let isValid = true;
    debugger;
    // Kiểm tra số điện thoại nhập vào
    if (soDienThoai.length < 10) {
        const message = "Số điện thoại không hợp lệ! Vui lòng thử lại!";
        console.log(message);
        isValid = false;
    }
    //console.log(message);
    console.log(`[${STORAGE_KEY}] Kiểm tra mã ${maNV} : ${isValid}`);

    return isValid;
}

validateEmployeeInput("002", "0919516189");