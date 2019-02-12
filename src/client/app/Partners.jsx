import React, { Component } from "react";
import Validator from "validator";
import Helmet from "react-helmet"
// import $ from "jquery";
import SweetAlert from "sweetalert";
import Req from "axios";
import TextFieldGroup from "client/app/common/TextFieldGroup";
import NumberFieldGroup from "client/app/common/NumberFieldGroup";
import SelectFieldGroup from "client/app/common/SelectFieldGroup";
import UpLoadFile from "client/app/common/UpLoadFile";
import { isEmpty } from "client/app/common/helpers";
import { apiUrl } from "client/routes/apiUrl";
import MapFieldGroup from "client/app/common/MapFieldGroup";

const isBrowser = typeof window !== "undefined";


class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      schoolName: "",
      onwer: "",
      manager: "",
      phoneNumber: "",
      state: "",
      city: "",
      neighbourhood: "",
      map: {},
      cellPhone: "",
      email: "",
      file: {},
      fileName: "",
      errors: {},
      isEmpty: true,
      categoryLoaded: false,
      categoryList: [],
      categoryHeader: "انتخاب دسته بندی",
      stateLoaded: false,
      stateList: [],
      stateHeader: "انتخاب استان",
      cityLoaded: false,
      cityList: [],
      cityHeader: "انتخاب دسته بندی",
      neighbourhoodLoaded: false,
      neighbourhoodList: [],
      neighbourhoodHeader: "انتخاب محله",
      isBrowser: false
    };

    this.errors = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleSelected = this.toggleSelected.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.selectLatLng = this.selectLatLng.bind(this);
  }

  componentDidMount() {
    this.getCategory();
    this.getState();
  }

  isEmpty(state, field, msg) {
    let v = Validator.isEmpty(state);
    if (v) {
      this.errors[field] = msg;
    }
  }

  isObjectEmpty(state, field, msg) {
    if (isEmpty(state)) {
      this.errors[field] = msg;
    }
  }

  isEmail(state, field, msg) {
    let v = Validator.isEmail(state);
    if (v == false) {
      this.errors[field] = msg;
    }
  }

  isMobile(state, field, msg) {
    let v = Validator.matches(state.replace(/\s/g, ""), /(\+98|0)?9\d{9}/);
    if (v == false) {
      this.errors[field] = msg;
    }
  }

  fileTypeChecker(value, type) {
    return new RegExp("(.*?)." + type + "$").test(value);
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      category,
      schoolName,
      onwer,
      manager,
      phoneNumber,
      state,
      city,
      neighbourhood,
      cellPhone,
      email,
      file,
      map,
      isEmpty
    } = this.state;
    if (isEmpty) {
      this.isEmpty(category, "category", "لطفا دسته بندی را وارد کنید...");
      this.isEmpty(
        schoolName,
        "schoolName",
        "لطفا نام آموزشگاه را وارد کنید..."
      );
      this.isEmpty(onwer, "onwer", "لطفا نام صاحب امتیاز را وارد کنید...");
      this.isEmpty(manager, "manager", "لطفا نام مدیر را وارد کنید...");
      this.isEmpty(phoneNumber, "phoneNumber", "لطفا تلفن را وارد کنید...");
      this.isEmpty(manager, "manager", "لطفا نام مدیر را وارد کنید...");
      this.isEmpty(state, "state", "لطفا نام استان را وارد کنید...");
      this.isEmpty(city, "city", "لطفا نام شهر را وارد کنید...");
      this.isEmpty(
        neighbourhood,
        "neighbourhood",
        "لطفا نام محله را وارد کنید..."
      );
      this.isEmpty(cellPhone, "cellPhone", "لطفا شماره موبایل را وارد کنید...");
      this.isEmpty(email, "email", "لطفا ایمیل را وارد کنید...");
      this.isObjectEmpty(file, "file", "لطفا عکس مجوز خود را انتخاب کنید...");
      this.isObjectEmpty(map, "map", "لطفا مکان را انتخاب کنید...");

      if (Object.values(this.errors).length == 0) {
        this.setState({
          errors: this.errors,
          isEmpty: false
        });
      } else {
        this.setState({
          errors: this.errors,
          isEmpty: true
        });
      }
      setTimeout(() => {
        let errorClass = $(".form-group")
          .find(".error:first-child")
          .parent(".form-group")
          .addClass("shake");
        var offset = $(errorClass).offset();
        $("body").animate({
          scrollTop: offset.top - 10
        });
      }, 100);
    } else {
      this.isEmail(email, "email", "لطفا ایمیل را با فرمت صحیح وارد کنید...");
      this.isMobile(
        cellPhone,
        "cellPhone",
        "لطفا شماره موبایل را با فرمت صحیح وارد کنید..."
      );
      this.setState({
        errors: this.errors
      });
      setTimeout(() => {
        let errorClass = $(".form-group")
          .find(".error:first-child")
          .parent(".form-group")
          .addClass("shake");
        var offset = $(errorClass).offset();
        $("body").animate({
          scrollTop: offset.top - 10
        });
      }, 100);
    }

    if (Object.values(this.errors).length == 0) {
      const data = {
        category: category,
        schoolName: schoolName,
        onwer: onwer,
        manager: manager,
        phoneNumber: phoneNumber,
        state: state,
        city: city,
        neighbourhood: neighbourhood,
        map: map,
        cellPhone: cellPhone,
        email: email
      };

      // Req.get(apiUrl + "partners").then(() => {
      this.setState({
        category: "",
        schoolName: "",
        onwer: "",
        manager: "",
        phoneNumber: "",
        state: "",
        city: "",
        neighbourhood: "",
        lat: "lat",
        lng: "",
        cellPhone: "",
        email: "",

        cityList: [],
        cityLoaded: false,
        neighbourhoodList: [],
        neighbourhoodLoaded: false,
        neighbourhood: "",
        city: "",
        cityHeader: "انتخاب دسته بندی",
        neighbourhoodHeader: "انتخاب محله",
        stateHeader: "انتخاب استان"
      });
      swal({
        text: "درخواست شما با موفقیت ثبت شد.",
        icon: "success",
        button: "متوجه شدم"
      });
      // });
    }
    setTimeout(() => {
      $(".form-group").removeClass("shake");
    }, 1000);
    this.errors = {};
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getCategory() {
    Req.get(apiUrl + "category").then(res => {
      this.setState({
        categoryList: res.data,
        categoryLoaded: true
      });
    });
  }

  getState() {
    Req.get(apiUrl + "state").then(res => {
      this.setState({
        stateList: res.data,
        stateLoaded: true
      });
    });
  }

  postState(state) {
    const data = {
      [state]: [state]
    };
    this.setState({
      cityList: [],
      cityLoaded: false,
      neighbourhoodList: [],
      neighbourhoodLoaded: false,
      neighbourhood: "",
      city: "",
      cityHeader: "انتخاب دسته بندی",
      neighbourhoodHeader: "انتخاب محله"
    });
    Req.get(apiUrl + "city").then(res => {
      this.setState({
        cityList: res.data,
        cityLoaded: true
      });
    });
  }

  postCity(city) {
    const data = {
      [city]: [city]
    };
    this.setState({
      neighbourhoodList: [],
      neighbourhoodLoaded: false,
      neighbourhoodHeader: "انتخاب محله",
      neighbourhood: ""
    });
    Req.get(apiUrl + "neighbourhood").then(res => {
      this.setState({
        neighbourhoodList: res.data,
        neighbourhoodLoaded: true
      });
    });
  }

  toggleSelected(id, key, state) {
    var temp = this.state[key].map(obj => {
      var rObj = {};
      rObj["id"] = obj.id;
      rObj["title"] = obj.title;
      rObj["selected"] = false;
      rObj["key"] = obj.key;
      return rObj;
    });
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp,
      [state]: temp[id].title
    });

    if (state == "state") {
      this.postState(temp[id].title);
    } else if (state == "city") {
      this.postCity(temp[id].title);
    }
  }

  selectFile(file) {
    this.setState({
      file: [file]
    });
  }

  selectLatLng(lat, lng) {
    // console.log(lat,lng)
    this.setState({
      map: {
        lat: lat,
        lng: lng
      }
    });
  }

  render() {
    const {
      schoolName,
      manager,
      onwer,
      file,
      categoryList,
      phoneNumber,
      stateList,
      cityList,
      neighbourhood,
      neighbourhoodList,
      cellPhone,
      email,
      errors,
      categoryLoaded,
      stateLoaded,
      cityLoaded,
      cityHeader,
      stateHeader,
      categoryHeader,
      neighbourhoodLoaded,
      neighbourhoodHeader
    } = this.state;
    const { isLoaded, data } = this.props;

    if (isLoaded) {
      console.log(data);
    }

    return (
      <div className="partners">
      <Helmet>
          <title>درخواست همکاری</title>
      </Helmet>
        <form className="container-center " onSubmit={this.onSubmit}>
          <div className="boxes">
            <h2 className="t-c">درخواست همکاری با ما</h2>
            <div className="position-relative-margin ">
              <div className="boxes-half">
                <TextFieldGroup
                  type="text"
                  name="schoolName"
                  label="نام آموزشگاه"
                  value={schoolName}
                  onChange={this.onChange}
                  error={errors.schoolName}
                  icon={"k-edit"}
                />
                <TextFieldGroup
                  type="text"
                  name="manager"
                  label="نام مدیریت"
                  value={manager}
                  onChange={this.onChange}
                  error={errors.manager}
                  icon={"k-user"}
                />

                <TextFieldGroup
                  type="text"
                  name="onwer"
                  label="نام صاحب امتیاز"
                  value={onwer}
                  onChange={this.onChange}
                  error={errors.onwer}
                  icon={"k-edit"}
                />
                <SelectFieldGroup
                  title={this.state.category}
                  state={"category"}
                  headerDefalt={categoryHeader}
                  list={categoryList}
                  toggleItem={this.toggleSelected}
                  icon={"k-bars"}
                  error={errors.category}
                  isLoaded={categoryLoaded}
                />
                <UpLoadFile
                  label={"بارگزاری عکس مجوز"}
                  icon={"k-camera-1"}
                  file={file}
                  error={errors.file}
                  selectFile={this.selectFile}
                />
                <NumberFieldGroup
                  type="text"
                  name="phoneNumber"
                  label="شماره تلفن"
                  value={phoneNumber}
                  onChange={this.onChange}
                  error={errors.phoneNumber}
                  className={"ltr"}
                  format={"##############"}
                  icon={"k-headphones-alt"}
                />
              </div>
              <div className="boxes-half">
                <SelectFieldGroup
                  title={this.state.state}
                  headerDefalt={stateHeader}
                  state={"state"}
                  list={stateList}
                  toggleItem={this.toggleSelected}
                  icon={"k-map-marker-alt"}
                  error={errors.state}
                  isLoaded={true}
                />

                <SelectFieldGroup
                  title={this.state.city}
                  headerDefalt={cityHeader}
                  state={"city"}
                  list={cityList}
                  toggleItem={this.toggleSelected}
                  icon={"k-map-marker-alt"}
                  error={errors.city}
                  isLoaded={cityLoaded}
                />

                <SelectFieldGroup
                  title={neighbourhood}
                  headerDefalt={neighbourhoodHeader}
                  state={"neighbourhood"}
                  list={neighbourhoodList}
                  toggleItem={this.toggleSelected}
                  icon={"k-map-marker-alt"}
                  error={errors.neighbourhood}
                  isLoaded={neighbourhoodLoaded}
                />
                {isBrowser ? (
                  <MapFieldGroup
                    label={"انتخاب موقعیت "}
                    icon={"alo-telephone-1"}
                    selectLatLng={this.selectLatLng}
                    error={errors.map}
                  />
                ) : (
                  ""
                )}

                <NumberFieldGroup
                  type="text"
                  name="cellPhone"
                  label="موبایل"
                  value={cellPhone}
                  onChange={this.onChange}
                  error={errors.cellPhone}
                  className={"ltr"}
                  format={"#### ### ####"}
                  icon={"k-mobile"}
                />

                <TextFieldGroup
                  type="text"
                  name="email"
                  label="ایمیل"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                  className={"ltr"}
                  icon={"k-mail"}
                />
              </div>
            </div>
            <button className="btn">ثبت درخواست</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Partners;
