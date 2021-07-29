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

// dom + gắn event
document.getElementById("btnThemNV").addEventListener("click", themNhanVien);
document
  .getElementById("tableDanhSach")
  .addEventListener("click", delegationTable);
document.getElementById("btnCapNhat").addEventListener("click", capNhatNV);
// tạo danh sách nhân viên
var dsnv = [];
function themNhanVien() {
  var tkNV = document.getElementById("tknv").value;
  var tenNV = document.getElementById("name").value;
  var emailNV = document.getElementById("email").value;
  var passwordNV = document.getElementById("password").value;
  var ngayLamNV = document.getElementById("datepicker").value;
  var luongCBNV = +document.getElementById("luongCB").value;
  var chucvuNV = document.getElementById("chucvu").value;
  var gioLamNV = +document.getElementById("gioLam").value;

  var nhanVien = new NhanVien(
    tkNV,
    tenNV,
    emailNV,
    passwordNV,
    ngayLamNV,
    luongCBNV,
    chucvuNV,
    gioLamNV
  );

  dsnv.push(nhanVien);

  hienThi();
  resetForm();
}

// tạo bảng danh sách nhân viên
function hienThi() {
  var tbody = document.getElementById("tableDanhSach");
  var html = "";
  for (var i = 0; i < dsnv.length; i += 1) {
    var nv = dsnv[i];
    html += `
        <tr>
            <td>${nv.tkNV}</td>
            <td>${nv.tenNV}</td>
            <td>${nv.emailNV}</td>
            <td>${nv.ngayLamNV}</td>
            <td>${nv.chucvuNV}</td>
            <td>${nv.tinhTongLuong()}</td>
            <td class="xeploaiNV">${nv.xepLoaiNV()}</td>
            <td>
                <button class="btn btn-primary button__select" data-action="select" data-matkNV="${
                  nv.tkNV
                }">Cập nhật</button>
                <button class="btn btn-danger button__delelete" data-action="delete" data-matkNV="${
                  nv.tkNV
                }">Xoá</button>
            </td>
        </tr>`;
  }

  tbody.innerHTML = html;
}
function capNhatNV() {
  var tkNV = document.getElementById("tknv").value;
  var tenNV = document.getElementById("name").value;
  var emailNV = document.getElementById("email").value;
  var passwordNV = document.getElementById("password").value;
  var ngayLamNV = document.getElementById("datepicker").value;
  var luongCBNV = +document.getElementById("luongCB").value;
  var chucvuNV = document.getElementById("chucvu").value;
  var gioLamNV = +document.getElementById("gioLam").value;

  var nhanVien = new NhanVien(
    tkNV,
    tenNV,
    emailNV,
    passwordNV,
    ngayLamNV,
    luongCBNV,
    chucvuNV,
    gioLamNV
  );

  dsnv = dsnv.map(function (nv) {
    if (nv.tkNV === tkNV) {
      return nhanVien;
    }
    return nv;
  });

  hienThi();
  resetForm();
}

// reset form
function resetForm() {
  updateForm({});
  document.getElementById("tknv").disabled = false;
}

// update form
function updateForm(nhanVien) {
  document.getElementById("tknv").value = nhanVien.tkNV || "";
  document.getElementById("name").value = nhanVien.tenNV || "";
  document.getElementById("email").value = nhanVien.emailNV || "";
  document.getElementById("password").value = nhanVien.passwordNV || "";
  document.getElementById("datepicker").value = nhanVien.ngayLamNV || "";
  document.getElementById("luongCB").value = nhanVien.luongCBNV || "";
  document.getElementById("chucvu").value = nhanVien.chucvuNV || "";
  document.getElementById("gioLam").value = nhanVien.gioLamNV || "";
}

// cập nhật + xoá nhân viên
function delegationTable(event) {
  var matkNV = event.target.getAttribute("data-matkNV");
  var action = event.target.getAttribute("data-action");
  if (action === "select") {
    chonNhanVien(matkNV);
  }
  if (action === "delete") {
    xoaNhanVien(matkNV);
  }
  function xoaNhanVien(matkNV) {
    dsnv = dsnv.filter(function (nv) {
      return nv.tkNV !== matkNV;
    });
    hienThi();
  }
  function chonNhanVien(matkNV) {
    var nhanVien = dsnv.find(function (nv) {
      return nv.tkNV === matkNV;
    });
    // hiện bảng
    var myModal = document.getElementById("myModal");
    myModal.style.display = "block";
    myModal.classList.toggle("show");
    // đóng bảng
    document.getElementById("btnDong").addEventListener("click", closeTable);
    function closeTable() {
      myModal.style.display = "none";
      myModal.classList.toggle("show");
    }
    // disable input tai khoan nhan vien
    document.getElementById("tknv").disabled = true;

    updateForm(nhanVien);
  }
}
