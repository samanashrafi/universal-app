const validator = require("validator");
const isEmpty = require("server/validation/is-empty");

module.exports = function validateRegister(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "نام و نام خانوادگی باید بین حداقل 2 حداکثر 30 حروف باشد.";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "نام و نام خانوادگی الزامی می باشد.";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "ایمیل الزامی می باشد.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "ایمیل وارد شده صحیح نمی باشد.";
  }

  if (!validator.isEmpty(data.mobile)) {
    errors.password = "تلفن همراه الزامی می باشد.";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "کلمه عبور الزامی می باشد.";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "کلمه عبور باید بین حداقل 6 حداکثر 30 حروف باشد.";
  }

  if (validator.equals(data.password, data.password2)) {
    errors.password2 = "کلمه عبور وارد شده یکسان نیست";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
