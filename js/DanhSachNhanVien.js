function DanhSachNhanVien() {
    this.mangNV = [];

    this.themNV = function(nv){
        this.mangNV.push(nv);
    }

    this.timViTri = function(id){
        var viTri = -1;

        this.mangNV.map(function(nv, index){
            if (nv.id === id) {
                viTri = index;
            }
        })       
        return viTri; 
    }

    this.xoaNV = function(id){
        var viTri = this.timViTri(id);

        if (viTri > -1) {
            this.mangNV.splice(viTri,1);
        }
    }

    this.capNhatNV = function(nv) {
        var viTri = this.timViTri(nv.id);

        if (viTri > -1) {
            dsnv.mangNV[viTri] = nv;
        }
    }
    
}

DanhSachNhanVien.prototype.timKiem = function(tuKhoa){
    var mangTK = [];
    var tuKhoaThuong = tuKhoa.toLowerCase();
    
    this.mangNV.map(function(nv){
        var viTriTK = nv.xepLoai.toLowerCase().indexOf(tuKhoa.toLowerCase());

        if (viTriTK > -1) {
            mangTK.push(nv);
        }
        
    })
    return mangTK;
   
}
