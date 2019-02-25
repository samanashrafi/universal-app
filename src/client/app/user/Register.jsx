import React, { Component } from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { isEmpty } from "client/app/common/helpers.js";
import { registerUser } from "src/redux/actions/user-actions.js";
import TextFieldGroup from "client/app/common/TextFieldGroup.js";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      repPassword: "",
      errors: {}
    };
    this.errors = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  isEquals(str, str2, field, msg) {
    let v = Validator.equals(str, str2);
    if (!v) {
      this.errors[field] = msg;
    }
  }
  isEmail(state, field, msg) {
    let v = Validator.isEmail(state);
    if (v == false) {
      this.errors[field] = msg;
    }
  }
  isEmpty(state, field, msg) {
    let v = Validator.isEmpty(state);
    if (v) {
      this.errors[field] = msg;
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const { name, email, password, repPassword } = this.state;

    this.isEmpty(
      name,
      "name",
      "لطفا نام و نام خانوادگی خود را وارد فرمایید..."
    );
    this.isEmpty(email, "email", "لطفا ایمیل خود را وارد فرمایید...");
    this.isEmpty(password, "password", "لطفا کلمه عبور خود را وارد فرمایید...");
    this.isEmpty(
      repPassword,
      "repPassword",
      "لطفا کلمه عبور خود را مجدد وارد فرمایید..."
    );
    if (!isEmpty(email)) {
      this.isEmail(email, "email", "لطفا ایمیل را با فرمت صحیح وارد کنید...");
    }
    if (!isEmpty(password) && !isEmpty(repPassword)) {
      this.isEquals(
        password,
        repPassword,
        "password",
        "کاربر گرامی کلمه عبور یکسان نیست..."
      );
    }
    this.setState({
      errors: this.errors
    });
    if (Object.values(this.errors).length == 0) {
      this.isValid = true;
    }

    this.errors = {};

    if (this.isValid) {
      const newUser = {
        name: name,
        email: email,
        password: password,
        napasswordme2: repPassword
      };
      this.props.registerUser(newUser, this.props.history);
    }
  }
  render() {
    const { name, email, password, repPassword, errors } = this.state;
    return (
      <div className="user ">
        <Helmet>
          <title>جاباینجا | عضویت</title>
        </Helmet>
        <div className="container-center">
          <div className="boxes">
            <form className="form" onSubmit={this.onSubmit}>
              <h2> عضویت</h2>
              <div className="welcom">
                به <span className="color-primary bold">جاباینجا</span> خوش
                آمدید.
              </div>
              <TextFieldGroup
                type="text"
                name="name"
                label="نام و نام خانوادگی"
                icon={"k-user"}
                value={name}
                onChange={this.onChange}
                error={errors.name}
              />

              <TextFieldGroup
                type="text"
                name="email"
                label="ایمیل"
                icon={"k-mail"}
                value={email}
                className="ltr"
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                type="password"
                name="password"
                label="کلمه عبور"
                icon={"k-lock-1"}
                value={password}
                className="ltr"
                onChange={this.onChange}
                error={errors.password}
              />
              <TextFieldGroup
                type="password"
                name="repPassword"
                label="تکرار کلمه عبور"
                icon={"k-undo-alt"}
                value={repPassword}
                className="ltr"
                onChange={this.onChange}
                error={errors.repPassword}
                autoComplete={"true"}
              />
              <div className="reg-btn">
                <button id="btn-register" className="btn">
                  <div className="text">ثبت نام</div>
                  <div className="spinners" />
                </button>
              </div>
            </form>
            <div className="cover" />
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
