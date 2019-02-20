import React, { Component } from "react";
import { Link } from "react-router-dom";

import Enamad from "src/assets/img/enamad.png";
import Samandehi from "src/assets/img/samandehi.png";

class Footer extends Component {
  render() {
    return (
      <footer>
        {/* <div className="newsletters">
          <p>با الو کلاس به روز باشید</p>
          <p>
            با عضویت در خبرنامه از آخرین تخفیفات و دوره های جدید با خبر شوید
          </p>
          <form className="form">
            <input type="text" placeholder="شماره همراه خود را وارد کنید" />
            <div className="btn-newsletters">
              <button className="btn">ارسال</button>
            </div>
          </form>
        </div> */}
        <div className="body container-center">
          <div className="rw">
            <div className="cl-d-3">
              <h5>جاباینجا</h5>
              <ul>
                <li>
                  <Link to="/">درباره جاباینجا</Link>
                </li>
                <li>
                  <Link to="/">شرایط و قوانین</Link>
                </li>
                <li>
                  <Link to="/">حریم خصوصی</Link>
                </li>
              </ul>
            </div>
            <div className="cl-d-3">
              <h5>دسته بندی ها </h5>
              <ul>
                <li>
                  <Link to="/">وب،‌ برنامه‌نویسی و نرم‌افزار</Link>
                </li>
                <li>
                  <Link to="/">طراح گرافیک</Link>
                </li>
                <li>
                  <Link to="/">فروش و بازاریابی</Link>
                </li>
                <li>
                  <Link to="/">حسابداری</Link>
                </li>
              </ul>
            </div>
            <div className="cl-d-3">
              <h5>نماد های الکترونیکی </h5>
              <div className="namad">
                <img
                  src={Enamad}
                  title="نماد الکترونیکی الو کلاس"
                  alt="نماد الکترونیکی الو کلاس"
                />
                <img
                  src={Samandehi}
                  title="ستاد سازماندهی "
                  alt="ستاد سازماندهی "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="copy-write ">
          <div className="container-center">
            <span>کلیه حقوق این وب سایت متعلق به شرکت جاباینجا می باشد.</span>
            <nav className="social">
              <a target="_blank" href="https://www.instagram.com/jobinja/">
                <i className="alo-instagram" />
              </a>
              <a target="_blank" href="https://www.facebook.com/jobinja">
                <i className="alo-facebook" />
              </a>
              <a target="_blank" href="https://twitter.com/jobinja">
                <i className="alo-twitter" />
              </a>
              <a target="_blank" href="http://www.linkedin.com/jobinja">
                <i className="alo-linkedin" />
              </a>
            </nav>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
