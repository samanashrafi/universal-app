import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { loginUser } from "src/redux/actions/user-actions.js";
import TextFieldGroup from "client/app/common/TextFieldGroup.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: [e.target.value] });
  }
  onSubmit(e) {
    e.preventDefualt();
    const { email, password } = this.state;
    const data = {
      email: email,
      password: password
    };
    this.props.loginUser(data);
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
                value={email}
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                type="text"
                name="password"
                label="کلمه عبور"
                icon={"k-lock-1"}
                value={password}
                onChange={this.onChange}
                error={errors.password}
              />

              <button className="btn">
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
  errors: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
