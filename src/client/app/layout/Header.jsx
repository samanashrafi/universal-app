import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "src/assets/img/logo.png";
import Modal from "src/client/app/common/Modal.js";

class Header extends Component {
  constructor(props) {
    super(props);
    this.menu = 0;
    this.sideMenu = this.sideMenu.bind(this);
  }

  sideMenu() {
    var side = document.getElementById("side-menu");
    var hamburger = document.getElementById("hamburger-menu");
    if (this.menu == 0) {
      side.classList.add("active");
      hamburger.classList.add("is-active");
      this.menu = 1;
    } else {
      side.classList.remove("active");
      hamburger.classList.remove("is-active");
      this.menu = 0;
    }
  }

  render() {
    return (
      <header>
        <div className="container-center">
          <Link to="/" className="logo">
            <img src={Logo} alt="الو کلاس" title="الو کلاس" />
            {/* <span>الوکلاس اولین سایت معرفی آموزشگاه‌های ایران</span> */}
          </Link>
          <div
            id="hamburger-menu"
            className="hamburger hamburger--arrow-r"
            onClick={this.sideMenu}
          >
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </div>
          <div id="side-menu" className="menu">
            <ul className="overley">
              <li>
                <Link to="/">صفحه اصلی</Link>
              </li>
              {/* <li>
                <span>
                  دسته بندی
                  <i className="alo-angle-down" />
                </span>
                <ul className="menu-dropdown">
                  <li>
                    <Link to="/">مدارس</Link>
                  </li>
                  <li>
                    <Link to="/">آموزشکده</Link>
                  </li>
                  <li>
                    <Link to="/">موسسات</Link>
                  </li>
                  <li>
                    <Link to="/">سالن های ورزشی و تفریحی</Link>
                  </li>
                </ul>
              </li> */}
              <li>
                <Link to="/partner2">درخواست همکاری</Link>
              </li>
              <li>
                <Link to="/aboutme"> درباره جابینجا</Link>
              </li>
              <li>
                <Link to="/contactus">تماس با ما</Link>
              </li>
            </ul>
          </div>

          <Link to="/user" className="user-login">
            <i className="k-user" />
            ورود یا ثبت نام
          </Link>
          {/* <Modal context={"sasasdasd"} /> */}
          <div className="select-city">تهران</div>
        </div>
      </header>
    );
  }
}
export default Header;
