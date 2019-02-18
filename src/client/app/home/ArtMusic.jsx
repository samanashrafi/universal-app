import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SelectFieldGroup from "client/app/common/SelectFieldGroup";
import TextFieldGroup from "client/app/common/TextFieldGroup";

class ArtMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      art: "",
      artHeader: "هنر و موسیقی",
      artList: [
        {
          id: "1",
          title: "هنر",
          selected: false,
          key: "artList"
        },
        {
          id: 2,
          title: "موسیقی",
          selected: false,
          key: "artList"
        }
      ],

      categoryArt: "",
      categoryArtHeader: "زمینه هنری",
      categoryArtList: [
        {
          id: "1",
          title: "مبانی ترکیب بندی در عکاسی",
          selected: false,
          key: "categoryArtList"
        },
        {
          id: 2,
          title: "سفال و سرامیک",
          selected: false,
          key: "categoryArtList"
        }
      ],
      city: "",
      cityHeader: "شهر",
      cityList: [],
      district: "",
      districtHeader: "منطقه و محله",
      districtList: [],
      errors: [],
      input: 0
    };
    this.toggleSelected = this.toggleSelected.bind(this);
    this.onChange = this.onChange.bind(this);

    //  this.onChangeQ = this.onChangeQ.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
 
  componentWillReceiveProps(nextProps) {
    if (nextProps.cites.isLoaded) {
      this.setState({
        cityList: nextProps.cites.list
      });
    }
    if (nextProps.districts.isLoaded) {
      this.setState({
        districtList: nextProps.districts.list
      });
    }
  }

  // onChangeQ(e){
  //   e.preventDefault();
  //   this.setState({input:this.refs.searchFilter.value.length})
  //   if(this.refs.searchFilter.value.length > 2){
  //     this.props.searchFetch(this.filterText(this.refs.searchFilter.value));
  //   }else{
  //     this.refs.searchFilter.focus();
  //   }
  // }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    if (this.refs.searchFilter.value.length == 0) {
      this.refs.searchFilter.focus();
    } else {
      if (this.refs.searchFilter.value.length > 2) {
        this.props.history.push(`/search?q=${this.refs.searchFilter.value}`);
      } else {
        this.refs.searchFilter.focus();
      }
    }
  }
  filterText(filter) {
    return filter.replace(/ی/g, "ي").replace(/ک/g, "ك");
  }
  toggleSelected(id, key, state) {
    debugger
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
      // [key]: temp,
      [state]: temp[id].title
    });
  }
  render() {
    const {
      text,
      art,
      artList,
      artHeader,
      categoryArt,
      categoryArtHeader,
      categoryArtList,
      city,
      cityHeader,
      cityList,
      district,
      districtHeader,
      districtList,
      errors
    } = this.state;
    const { cites, districts } = this.props;
    return (
      <form className="filter art" onSubmit={this.onSubmit}>
        <div className="form-select">
          <SelectFieldGroup
            title={art}
            headerDefalt={artHeader}
            state={"art"}
            list={artList}
            toggleItem={this.toggleSelected}
            icon={""}
            error={errors.art}
            isLoaded={true}
          />
        </div>
        <div className="form-select">
          <SelectFieldGroup
            title={categoryArt}
            headerDefalt={categoryArtHeader}
            state="categoryArt"
            list={categoryArtList}
            toggleItem={this.toggleSelected}
            icon={""}
            error={errors.categoryArt}
            isLoaded={true}
          />
        </div>
        <div className="form-select">
          <SelectFieldGroup
            title={city}
            headerDefalt={cityHeader}
            state="city"
            list={cityList}
            toggleItem={this.toggleSelected}
            icon={""}
            error={errors.city}
            isLoaded={cites.isLoaded}
          />
        </div>
        <div className="form-select">
          <SelectFieldGroup
            title={district}
            headerDefalt={districtHeader}
            state="district"
            list={districtList}
            toggleItem={this.toggleSelected}
            icon={""}
            error={errors.district}
            isLoaded={districts.isLoaded}
          />
        </div>
        <div className="form-select">
          <TextFieldGroup
            type="text"
            name="text"
            label="آموزشگده یا دوره مورد نظر..."
            value={text}
            onChange={this.onChange}
            error={errors.text}
            icon={"k-edit"}
          />
        </div>
        <button className="btn">
          <div className="text">جستجو</div>
          <div className="spinners" />
        </button>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  cites: state.cites,
  districts: state.district
});
export default 
  connect(
    mapStateToProps,
    {}
  )(withRouter(ArtMusic))
;
