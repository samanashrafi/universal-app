import React, { Component } from "react";
import { Helmet } from "react-helmet";
import TextFieldGroup from "client/app/common/TextFieldGroup.js";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      repPassword: "",
      errors: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: [e.target.value] });
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
            <form className="form">
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
              <TextFieldGroup
                type="password"
                name="repPassword"
                label="تکرار کلمه عبور"
                icon={"k-undo-alt"}
                value={repPassword}
                onChange={this.onChange}
                error={errors.repPassword}
                autoComplete={"true"}
              />
              <div className="reg-btn">
                <button className="btn">
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

export default Register;
