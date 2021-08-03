// dom + gắn event
document.getElementById("btnThemNV").addEventListener("click", themNhanVien);
document
  .getElementById("tableDanhSach")
  .addEventListener("click", delegationTable);
document.getElementById("btnCapNhat").addEventListener("click", capNhatNV);
document.getElementById("btnTimNV").addEventListener("click", timNhanVien);
document.getElementById("btnThem").addEventListener("click", resetForm());
// tạo danh sách nhân viên
var qlnv = new QuanLyNhanVien();
qlnv.khoiTao();
hienThi(qlnv.dsnv);
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
  // validator
  var isValid = xacThucDuLieu(nhanVien);
  if (!isValid) {
    return;
  }

  //check nếu nhân viên bị trùng mã số
  if (!qlnv.checkMaNV(tkNV)) {
    alert("không được nhập trùng mã");
    return;
  }

  // thêm sinh viên
  qlnv.themNhanVien(nhanVien);
  hienThi(qlnv.dsnv);
  resetForm();
}

// tạo bảng danh sách nhân viên
function hienThi(dsnv) {
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

  // validator
  var isValid = xacThucDuLieu(nhanVien);
  if (!isValid) {
    return;
  }

  qlnv.capNhatNV(nhanVien);
  hienThi(qlnv.dsnv);
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
}
function xoaNhanVien(matkNV) {
  qlnv.xoaNhanVien(matkNV);
  hienThi(qlnv.dsnv);
}
function chonNhanVien(matkNV) {
  var nhanVien = qlnv.chonNhanVien(matkNV);
  // hiện bảng
  // var myModal = document.getElementById("myModal");
  // myModal.style.display = "block";
  // myModal.classList.toggle("show");
  $("#myModal").modal("show");
  // disable input tai khoan nhan vien
  document.getElementById("tknv").disabled = true;

  updateForm(nhanVien);
}

// tìm kiếm nhân viên
function timNhanVien() {
  var search = document.getElementById("searchName").value;
  var newDsnv = qlnv.timNhanVien(search);

  hienThi(newDsnv);
}

// xác thực dữ liệu
function xacThucDuLieu(nhanVien) {
  var validator = new Validator();
  var isAccountValid =
    validator.isRequired("tbTKNV", nhanVien.tkNV) &&
    validator.isAcountOk("tbTKNV", nhanVien.tkNV);
  var isNameValid =
    validator.isRequired("tbTen", nhanVien.tenNV) &&
    validator.isNameOk("tbTen", nhanVien.tenNV);
  var isEmailValid =
    validator.isRequired("tbEmail", nhanVien.emailNV) &&
    validator.isEmailRequired("tbEmail", nhanVien.emailNV);
  var isPasswordOk =
    validator.isRequired("tbMatKhau", nhanVien.passwordNV) &&
    validator.isPasswordOk("tbMatKhau", nhanVien.passwordNV);
  var isDateOk =
    validator.isRequired("tbNgay", nhanVien.ngayLamNV) &&
    validator.isDateOk("tbNgay", nhanVien.ngayLamNV);
  var isSalaryOk =
    validator.isRequired("tbLuongCB", nhanVien.luongCBNV) &&
    validator.isSalaryOk("tbLuongCB", nhanVien.luongCBNV);
  var isChucVuOk = validator.isRequired("tbChucVu", nhanVien.chucvuNV);
  var isGioLamOk =
    validator.isRequired("tbGiolam", nhanVien.gioLamNV) &&
    validator.isGioLamOk("tbGiolam", nhanVien.gioLamNV);

  var isValid =
    isAccountValid &&
    isNameValid &&
    isEmailValid &&
    isPasswordOk &&
    isDateOk &&
    isSalaryOk &&
    isChucVuOk &&
    isGioLamOk;
  // thuật toán
  // check từng trường dữ liệu
  function isError(value) {
    if (!value) {
      for (var key in validator.error) {
        if (validator.error[key]) {
          document.getElementById(key).innerHTML = validator.error[key];
          document.getElementById(key).style.display = "block";
        }
      }
    }
  }
  // reset từng trường nếu có dữ liệu
  function resetField(value) {
    if (value) {
      for (var key in validator.error) {
        if (!validator.error[key]) {
          document.getElementById(key).innerHTML = validator.error[key];
          document.getElementById(key).style.display = "none";
        }
      }
    }
  }

  //// validator
  // check account
  isError(isAccountValid);
  resetField(isAccountValid);

  // check Name
  isError(isNameValid);
  resetField(isNameValid);

  // check email
  isError(isEmailValid);
  resetField(isEmailValid);

  // check password
  isError(isPasswordOk);
  resetField(isPasswordOk);

  // check date
  isError(isDateOk);
  resetField(isDateOk);

  // check Salary
  isError(isSalaryOk);
  resetField(isSalaryOk);

  // check giờ làm
  isError(isGioLamOk);
  resetField(isGioLamOk);

  //last check
  if (!isValid) {
    return false;
  }
  return true;
}
