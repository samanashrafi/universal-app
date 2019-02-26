import React, { Component } from "react";
import PropTypes from "prop-types";
import Logo from "src/assets/img/logo.png";
import { logoutUser } from "src/redux/actions/user-actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbar: false,
      auth: false
    };
    this.menu = 0;
    this.sideMenu = this.sideMenu.bind(this);
    this.onActiveUserNavbar = this.onActiveUserNavbar.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }
  componentWillMount() {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      this.setState({ auth: true });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.setState({ auth: true });
    }
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

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.setState({ auth: false });
    this.props.history.push("/login");
  }
  onActiveUserNavbar(e) {
    e.preventDefault();
    let el = document.getElementsByClassName("user-navbar")[0];

    if (this.state.navbar) {
      el.classList.remove("active");
      this.setState({ navbar: false });
    } else {
      el.classList.add("active");
      this.setState({ navbar: true });
    }
  }
  render() {
    const { user } = this.props.auth;
    const { auth } = this.state;
    const authLinks = (
      <div className="user-navbar" onClick={this.onActiveUserNavbar}>
        {/* <div className="header"> */}
        <i className="k-user" />
        {user.name}
        {/* </div> */}
        <div className="list">
          <Link to="/dashboard">
            <span> پروفایل </span>
          </Link>

          <Link to="/" onClick={this.onLogoutClick}>
            <span> خروج </span>
          </Link>
        </div>
      </div>
    );

    const guestLinks = (
      <div className="user-login">
        <Link to="/register">
          <i className="k-user" />
          <span>ثبت نام</span>
        </Link>
        {/* <a /> */}
        <Link to="/login">
          <i className="k-lock-1" />
          <span> ورود</span>
        </Link>
      </div>
    );

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
          {auth ? authLinks : guestLinks}

          {/* <Modal context={"sasasdasd"} /> */}
          <div className="select-city">تهران</div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header));
