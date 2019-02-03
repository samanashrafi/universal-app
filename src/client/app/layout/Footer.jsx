import React, { Component } from "react";
import { Link } from "react-router-dom";

import Enamad from "src/assets/img/enamad.png";
import Samandehi from "src/assets/img/samandehi.png";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="newsletters">
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
        </div>
        <div className="body container-center">
          <div className="rw">
            <div className="cl-d-3">
              <h5>الوکلاس</h5>
              <ul>
                <li>
                  <Link to="/">درباره الوکلاس</Link>
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
          <span>کلیه حقوق این وب سایت متعلق به شرکت الو کلاس می باشد.</span>
          <nav className="social">
            <a target="_blank" href="https://www.instagram.com/alokelas/">
              <i className="alo-instagram" />
            </a>
            <a target="_blank" href="https://www.facebook.com/alokelas">
              <i className="alo-facebook" />
            </a>
            <a target="_blank" href="https://twitter.com/alokelas">
              <i className="alo-twitter" />
            </a>
            <a target="_blank" href="http://www.linkedin.com/alokelas">
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
