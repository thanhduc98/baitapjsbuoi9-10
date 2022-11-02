function NhanVien(id,name,email,pass,ngayCong,luongCB,chucVu,time){
    this.id = id;
    this.name = name;
    this.email = email;
    this.pass = pass;
    this.ngayCong = ngayCong;
    this.luongCB = luongCB;
    this.chucVu = chucVu;
    this.time = time;
    this.tongLuong = 0;
    this.xepLoai = "";
    
    this.tongLuong = function(){
        if (chucVu === "Sếp") {
            this.tongLuong = this.luongCB * 3;
        } else if (chucVu === "Trưởng phòng") {
            this.tongLuong = this.luongCB * 2;
        } else if (chucVu === "Nhân viên") {
            this.tongLuong = this.luongCB;
        } 
    }

    this.xepLoai = function(){
        if (time >= 192 ) {
            this.xepLoai = "Xuất sắc";
        } else if (176 <= time && time <= 192) {
            this.xepLoai = "Giỏi";
        } else if (160 <= time && time <= 176) {
            this.xepLoai = "Khá";
        } else {
            this.xepLoai = "TB";
        }
    }
}