function Validator() {
  this.error = {};
}
// khổng để field trống
Validator.prototype.isRequired = function (name, value) {
  if (!value) {
    this.error[name] = "Vui lòng không để trống";
    return false;
  }
  if (value) {
    this.error[name] = "";
    return true;
  }
};

// check tài khoản
Validator.prototype.isAcountOk = function (name, value) {
  if (!/^[a-zA-Z0-9]{4,6}$/.test(value)) {
    this.error[name] = "Tài khoản tối đa 4 - 6 ký số";
    return false;
  }
  return true;
};

// check tên nhân viên
Validator.prototype.isNameOk = function (name, value) {
  if (!/^[a-zA-Z ]+$/.test(value)) {
    this.error[name] = "Tên nhân viên phải là chữ";
    return false;
  }
  return true;
};

// check email
Validator.prototype.isEmailRequired = function (name, value) {
  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
    this.error[name] = "Email không đúng định dạng";
    return false;
  }
  return true;
};

// check passwork
Validator.prototype.isPasswordOk = function (name, value) {
  if (!/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]).{6,9}$/.test(value)) {
    this.error[name] =
      "Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    return false;
  }
  return true;
};

// check date
Validator.prototype.isDateOk = function (name, value) {
  if (
    !/^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/.test(value)
  ) {
    this.error[name] = "Vui lòng nhập định dạng mm/dd/yyyy";
    return false;
  }
  return true;
};

// check lương cơ bản
Validator.prototype.isSalaryOk = function (name, value) {
  if (!(1000000 <= value && value <= 20000000)) {
    this.error[name] = "Lương cơ bản 1 000 000 - 20 000 000";
    return false;
  }
  return true;
};

// check giờ làm
Validator.prototype.isGioLamOk = function (name, value) {
  if (!(80 <= value && value <= 200)) {
    this.error[name] = "Số giờ làm trong tháng 80 - 200 giờ";
    return false;
  }
  return true;
};
