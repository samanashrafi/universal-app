import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { getAcademyList } from "src/redux/actions/academyList-action.js";
import QS from "query-string";

import AsideFilter from "client/app/academylist/AsideFilter.jsx";

const WithSearch = WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        q: "",
        input: 0,
        searchTerm: "",
        academyList: [],
        dropDownList: [
          {
            id: 1,
            title: "دسته بندی",
            icon: "alo-pencil-2",
            subItem: [
              {
                id: "11",
                title: "مدارس"
              },
              {
                id: "12",
                title: "آموزشکده ها"
              },
              {
                id: "13",
                title: "موسسات"
              },
              {
                id: "14",
                title: "سالن های ورزشی"
              }
            ]
          },
          {
            id: 2,
            title: "جنیست",
            icon: "alo-user-male",
            subItem: [
              {
                id: "52",
                title: "مذکر"
              },
              {
                id: "53",
                title: "مونث"
              },
              {
                id: "54",
                title: "مختط"
              }
            ]
          },

          {
            id: 3,
            title: "مکان",
            icon: "alo-location-pin-4",
            subItem: [
              {
                id: "56",
                title: "شهران"
              },
              {
                id: "57",
                title: "صادقیه"
              },
              {
                id: "58",
                title: "نیاوران"
              }
            ]
          }
        ]
      };
      this.onSubmit = this.onSubmit.bind(this);
      this.searchFilter = this.searchFilter.bind(this);
    }

    filterText(filter) {
      return filter.replace(/ی/g, "ي").replace(/ک/g, "ك");
    }
    // componentWillReceiveProps(nextProps) {
    //   this.setState({ academyList: nextProps.academyList });
    // }
    searchFilter(e) {
      this.setState({ q: e.target.value });
    }
    onSubmit(e) {
      e.preventDefault();
      if (this.refs.searchFilter.value.length == 0) {
        this.refs.searchFilter.focus();
      } else {
        if (this.refs.searchFilter.value.length > 2) {
          this.props.history.push(`/search?q=${this.refs.searchFilter.value}`);
          this.props.getAcademyList(
            this.filterText(this.refs.searchFilter.value)
          );
        } else {
          this.refs.searchFilter.focus();
        }
      }
    }
    componentWillMount() {
      const qs = QS.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      }).q;
      this.setState({ q: this.filterText(qs) });
      this.props.getAcademyList(this.filterText(qs));
    }
    componentDidMount() {
      this.setState({ academyList: this.props.academyList });
    }
    render() {
      return (
        <div className="academy-list">
          {/* <HeaderSearch textFilter={this.state.q} /> */}
          <div className="home-search">
            <div className="container-center">
              <form className="filter" onSubmit={this.onSubmit}>
                <div className="form-select">
                  <input
                    type="search"
                    ref="searchFilter"
                    value={this.state.q}
                    onChange={this.searchFilter}
                    placeholder="لطفا مطلب خود را جستجو کنید..."
                  />
                </div>
                <div className="form-select">
                  <select>
                    <option>مدارس</option>
                    <option>آموزشکده</option>
                    <option>موسسات</option>
                    <option>سالن های ورزشی و تفریحی</option>
                  </select>
                </div>
                <div className="form-select">
                  <select>
                    <option>صادقیه</option>
                    <option>پونک</option>ٍ<option>استاد معین</option>
                    <option>نیاوران</option>
                  </select>
                </div>
                <button className="btn">
                  <span>جستجو</span>
                  <div className="spinner">
                    <div className="double-bounce1" />
                    <div className="double-bounce2" />
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="container-center">
            <div className="body">
              <AsideFilter dropDownList={this.state.dropDownList} />
              <div className="grid-list">
                <WrappedComponent academyList={this.props.academyList} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
};
const mapStateToProps = state => ({
  academyList: state.academyList.data
});

const FinalSearch = compose(
  connect(
    mapStateToProps,
    {}
  ),
  WithSearch
);

export default FinalSearch;
