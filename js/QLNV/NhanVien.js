function NhanVien(
  tkNV,
  tenNV,
  emailNV,
  passwordNV,
  ngayLamNV,
  luongCBNV,
  chucvuNV,
  gioLamNV
) {
  this.tkNV = tkNV;
  this.tenNV = tenNV;
  this.emailNV = emailNV;
  this.passwordNV = passwordNV;
  this.ngayLamNV = ngayLamNV;
  this.luongCBNV = luongCBNV;
  this.chucvuNV = chucvuNV;
  this.gioLamNV = gioLamNV;
}
NhanVien.prototype.tinhTongLuong = function () {
  if (this.chucvuNV === "Sếp") {
    return this.luongCBNV * 3;
  }

  if (this.chucvuNV === "Trưởng phòng") {
    return this.luongCBNV * 2;
  }
  if (this.chucvuNV === "Nhân viên") {
    return this.luongCBNV;
  }
};
NhanVien.prototype.xepLoaiNV = function () {
  var gioLam = this.gioLamNV;
  if (gioLam >= 192) {
    return "nhân viên xuất sắc";
  }
  if (gioLam >= 176) {
    return "nhân viên giỏi";
  }
  if (gioLam >= 160) {
    return "nhân viên khá";
  }
  return "nhân viên trung bình";
};
