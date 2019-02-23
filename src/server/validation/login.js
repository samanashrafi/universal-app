const Validator = require("validator");
const isEmpty = require("server/validation/is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "ایمیل وارد شده صحیح نمی باشد.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "ایمیل الزامی می باشد.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "تلفن همراه الزامی می باشد.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
