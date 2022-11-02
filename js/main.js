
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

function getELE(id){
    return document.getElementById(id);
}

function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV") != undefined) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
    }
    hienThiDS(dsnv.mangNV);
}
getLocalStorage();

function resetForm() {
    getELE("formNV").reset();

    getELE("tknv").disabled = false;
}

// Thêm nhân viên
function themNhanVien() {
    var id = getELE("tknv").value;
    var name = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var ngayCong = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var time = getELE("gioLam").value;

    var isValid = true;
    // TKNV(id) => (kiểm tra rỗng, ko được trùng và từ 4 - 6 ký số)
    isValid &= validation.checkEmpty(id, "tbTKNV", "Tài khoản nhân viên không được để trống") && validation.checkNumber(id, "tbTKNV", "TKNV phải là số") && validation.checkIDLength(id, "tbTKNV", "Tài khoản ít nhất từ 4 - 6 ký số") && validation.checkID(id, "tbTKNV", "Tài khoản nhân viên không được trùng", dsnv.mangNV);

    // Tên NV (kiểm tra rỗng, kiểm tra ký tự chữ)
    isValid &= validation.checkEmpty(name, "tbTen", "Tên nhân viên không được để trống") && validation.checkName(name, "tbTen", "Tên nhân viên không hợp lệ");

    // Email (kiểm tra rỗng, kiểm tra định dạng format)
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống") && validation.checkEmail(email, "tbEmail", "Email chưa đúng định dạng");

    // Password (kiểm tra rỗng, có 6 - 10 ký tự,có 1 ký số, có 1 ký tự in hoa, 1 ký tự đặc biệt)
    isValid &= validation.checkEmpty(pass, "tbMatKhau", "Mật khẩu không được để trống") && validation.checkPass(pass, "tbMatKhau", "Mật khẩu từ 6 - 10 ký tự có ít nhất 1 kí tự in hoa, 1 ký số, 1 ký tự đặc biệt");

    // Date (kiểm tra rỗng, kiểm tra format)
    isValid &= validation.checkEmpty(ngayCong, "tbNgay", "Ngày làm không được để trống") && validation.checkDate(ngayCong, "tbNgay", "Ngày làm phải đúng định dạng mm/dd/yyyy");

    // Salary(kiểm tra rỗng, từ 1e+6 - 20e+6)
    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương không được để trống") && validation.checkNumber(luongCB, "tbLuongCB", "Lương nhân viên phải là số") && validation.checkSalary(luongCB, "tbLuongCB", "Lương NV từ 1.000.000 - 20.000.000");

    // Chức vụ (người dùng có lựa chọn nào khác cái đầu tiên ko)
    isValid &= validation.checkDropDown("chucvu", "tbChucVu", "Chức vụ chưa được chọn");

    // Giờ làm(kiểm tra rỗng, từ 80 - 200)
    isValid &= validation.checkEmpty(time, "tbGiolam", "Lương không được để trống") && validation.checkNumber(time, "tbGiolam", "Giờ làm nhân viên phải là số") && validation.checkTime(time, "tbGiolam", "Giờ làm NV từ 80 - 200");

    if (isValid) {
        var nv = new NhanVien(id,name,email,pass,ngayCong,luongCB,chucVu,time);
        nv.tongLuong();
        nv.xepLoai();

        console.log(nv);

        // Thêm nhân viên vào mangNV
        dsnv.themNV(nv);

        // Update localStorage
        setLocalStorage(); 

        // Gọi hàm hiển thị
        hienThiDS(dsnv.mangNV);

        // Reset form
        resetForm();
    }
}

// Hiển thị danh sách nhân viên
function hienThiDS(mangNV) {
    var content = "";

    mangNV.map(function(nv, index){
        content += `
            <tr>
                <td>${nv.id}</td>
                <td>${nv.name}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayCong}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                <td>
                    <button id="xemNV" class="btn btn-info my-2" onclick="xemChiTiet('${nv.id}')" data-toggle="modal"
                    data-target="#myModal">Xem</button>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${nv.id}')">Xóa</button>
                </td>
            </tr>
        `
    });
    getELE("tableDanhSach").innerHTML = content;
}

// Xóa nhân viên
function xoaNhanVien(id) {
    dsnv.xoaNV(id);

    hienThiDS(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}

// Hiển thị và cập nhật nhân viên
function xemChiTiet(id) {
    var viTri = dsnv.timViTri(id);

    if (viTri > -1) {
        var nvTim = dsnv.mangNV[viTri];

        getELE("tknv").value = nvTim.id;
        getELE("tknv").disabled = true;
        getELE("name").value = nvTim.name;
        getELE("email").value = nvTim.email;
        getELE("password").value = nvTim.pass;
        getELE("datepicker").value = nvTim.ngayCong;
        getELE("luongCB").value = nvTim.luongCB;
        getELE("chucvu").value = nvTim.chucVu;
        getELE("gioLam").value = nvTim.time;
    }
}

function capNhatNhanVien() {
    var id = getELE("tknv").value;
    var name = getELE("name").value;
    var email = getELE("email").value;
    var pass = getELE("password").value;
    var ngayCong = getELE("datepicker").value;
    var luongCB = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var time = getELE("gioLam").value;

    var isValid = true;
    // TKNV(id) => (kiểm tra rỗng, ko được trùng và từ 4 - 6 ký số)
    isValid &= validation.checkEmpty(id, "tbTKNV", "Tài khoản nhân viên không được để trống") && validation.checkNumber(id, "tbTKNV", "TKNV phải là số") && validation.checkIDLength(id, "tbTKNV", "Tài khoản ít nhất từ 4 - 6 ký số") && validation.checkID(id, "tbTKNV", "Tài khoản nhân viên không được trùng", dsnv.mangNV);

    // Tên NV (kiểm tra rỗng, kiểm tra ký tự chữ)
    isValid &= validation.checkEmpty(name, "tbTen", "Tên nhân viên không được để trống") && validation.checkName(name, "tbTen", "Tên nhân viên không hợp lệ");

    // Email (kiểm tra rỗng, kiểm tra định dạng format)
    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được để trống") && validation.checkEmail(email, "tbEmail", "Email chưa đúng định dạng");

    // Password (kiểm tra rỗng, có 6 - 10 ký tự,có 1 ký số, có 1 ký tự in hoa, 1 ký tự đặc biệt)
    isValid &= validation.checkEmpty(pass, "tbMatKhau", "Mật khẩu không được để trống") && validation.checkPass(pass, "tbMatKhau", "Mật khẩu từ 6 - 10 ký tự có ít nhất 1 kí tự in hoa, 1 ký số, 1 ký tự đặc biệt");

    // Date (kiểm tra rỗng, kiểm tra format)
    isValid &= validation.checkEmpty(ngayCong, "tbNgay", "Ngày làm không được để trống") && validation.checkDate(ngayCong, "tbNgay", "Ngày làm phải đúng định dạng mm/dd/yyyy");

    // Salary(kiểm tra rỗng, từ 1e+6 - 20e+6)
    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "Lương không được để trống") && validation.checkNumber(luongCB, "tbLuongCB", "Lương nhân viên phải là số") && validation.checkSalary(luongCB, "tbLuongCB", "Lương NV từ 1.000.000 - 20.000.000");

    // Chức vụ (người dùng có lựa chọn nào khác cái đầu tiên ko)
    isValid &= validation.checkDropDown("chucvu", "tbChucVu", "Chức vụ chưa được chọn");

    // Giờ làm(kiểm tra rỗng, từ 80 - 200)
    isValid &= validation.checkEmpty(time, "tbGiolam", "Lương không được để trống") && validation.checkNumber(time, "tbGiolam", "Giờ làm nhân viên phải là số") && validation.checkTime(time, "tbGiolam", "Giờ làm NV từ 80 - 200");
    if (isValid) {
        var nv = new NhanVien(id,name,email,pass,ngayCong,luongCB,chucVu,time);

        nv.tongLuong();
        nv.xepLoai();

        dsnv.capNhatNV(nv);
        hienThiDS(dsnv.mangNV);
        setLocalStorage();
        resetForm();
    }
    
}

function timKiemTheoLoai(){
    var tuKhoa = getELE("searchName").value;

    var mangTK = dsnv.timKiem(tuKhoa.trim());
    
    hienThiDS(mangTK);
}
getELE("searchName").onkeyup = timKiemTheoLoai;
getELE("btnTimNV").onclick = timKiemTheoLoai;