import React, { Component } from "react";
import Login from "client/app/user/Login.jsx";
import Register from "client/app/user/Register.jsx";

class LoginRegister extends Component {
  render() {
    return (
      <div className="user ">
        <div className="container-center">
          <div className="boxes">
            <form className="form">
              <h2>ورود یا عضویت</h2>
              <Login />
              <Register />
            </form>
            <div className="cover" />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginRegister;
