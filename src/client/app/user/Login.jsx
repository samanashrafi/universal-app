import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { loginUser } from "src/redux/actions/user-actions.js";
import { isEmpty } from "client/app/common/helpers.js";
import Validator from "validator";
import TextFieldGroup from "client/app/common/TextFieldGroup.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.errors = {};
    this.isValid = false;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
    let { email, password } = this.state;
    this.isEmpty(email, "email", "لطفا ایمیل خود را وارد فرمایید...");
    this.isEmpty(password, "password", "لطفا کلمه عبور خود را وارد فرمایید...");
    if (!isEmpty(email)) {
      this.isEmail(email, "email", "لطفا ایمیل را با فرمت صحیح وارد کنید...");
    }
    this.setState({
      errors: this.errors
    });
    if (Object.values(this.errors).length == 0) {
      this.isValid = true;
    }

    this.errors = {};

    if (this.isValid) {
      const data = {
        email: email,
        password: password
      };
      this.props.loginUser(data);
    }
  }
  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="user">
        <Helmet>
          <title>جاباینجا | ورود کاربران</title>
        </Helmet>
        <div className="container-center">
          <div className="boxes">
            <form className="form" onSubmit={this.onSubmit}>
              <h2> ورود کاربران </h2>
              <div className="welcom">
                به <span className="color-primary bold">جاباینجا</span> خوش
                آمدید.
              </div>
              <TextFieldGroup
                type="text"
                name="email"
                label="ایمیل"
                icon={"k-mail"}
                className="ltr"
                value={email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                type="password"
                name="password"
                label="کلمه عبور"
                icon={"k-lock-1"}
                className="ltr"
                value={password}
                onChange={this.onChange}
                error={errors.password}
              />

              <button id="btn-login" className="btn">
                <div className="text">ورود </div>
                <div className="spinners" />
              </button>
              <Link to="/resetpassword" className="resetpassword">
                بازیابی کلمه عبور
              </Link>
              {/* <div className="reg-btn">
                <Link to="/register" className="btn border">
                  من عضو نیستم!
                </Link>
              </div> */}
            </form>
            <div className="cover" />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
