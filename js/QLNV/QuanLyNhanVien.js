function QuanLyNhanVien() {
  this.dsnv = JSON.parse(localStorage.getItem("dsnv")) || [];
}

// khởi tạo
QuanLyNhanVien.prototype.khoiTao = function () {
  if (this.dsnv.length === 0) {
    return;
  }
  this.dsnv = this.dsnv.map(function (nv) {
    return new NhanVien(
      nv.tkNV,
      nv.tenNV,
      nv.emailNV,
      nv.passwordNV,
      nv.ngayLamNV,
      nv.luongCBNV,
      nv.chucvuNV,
      nv.gioLamNV
    );
  });
};

// save local storage
QuanLyNhanVien.prototype.saveLocalStorage = function () {
  localStorage.setItem("dsnv", JSON.stringify(this.dsnv));
};

// thêm nhân viên
QuanLyNhanVien.prototype.themNhanVien = function (nhanVien) {
  this.dsnv.push(nhanVien);
  this.saveLocalStorage();
};

// cập nhật nhân viên
QuanLyNhanVien.prototype.capNhatNV = function (nhanVien) {
  this.dsnv = this.dsnv.map(function (nv) {
    if (nv.tkNV === nhanVien.tkNV) {
      return nhanVien;
    }
    return nv;
  });
  this.saveLocalStorage();
};

// Xoá nhân viên
QuanLyNhanVien.prototype.xoaNhanVien = function (matkNV) {
  this.dsnv = this.dsnv.filter(function (nv) {
    return nv.tkNV !== matkNV;
  });
  this.saveLocalStorage();
};

// chọn nhân viên để cập nhật
QuanLyNhanVien.prototype.chonNhanVien = function (matkNV) {
  return this.dsnv.find(function (nv) {
    return nv.tkNV === matkNV;
  });
};

// check xem thêm nhân viên bị trùng
QuanLyNhanVien.prototype.checkMaNV = function (tkNV) {
  var isTrue = this.dsnv.find(function (nv) {
    return nv.tkNV === tkNV;
  });
  if (isTrue) {
    return false;
  }
};
// tìm kiếm nhân viên
QuanLyNhanVien.prototype.timNhanVien = function (search) {
  return this.dsnv.filter(function (nv) {
    var searchValue = search.trim().toLowerCase();
    var rankValue = nv.xepLoaiNV().trim().toLowerCase();
    return rankValue.indexOf(searchValue) !== -1;
  });
};
