import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SelectFieldGroup from "client/app/common/SelectFieldGroup";
import TextFieldGroup from "client/app/common/TextFieldGroup";
import { getCategory } from "src/redux/actions/category-actions";
import { getCites } from "src/redux/actions/cites-actions";

class ArtMusic extends Component {
  // static fetchData({ store }) {
  //   return store.dispatch(getCategory());
  // }
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      categores: "",
      categoryHeader: "دسته بندی",
      categoryList: [],
      city: "",
      cityHeader: "شهر",
      cityList: [],
      errors: [],
      input: 0
    };
    this.toggleSelected = this.toggleSelected.bind(this);
    this.onChange = this.onChange.bind(this);

    //  this.onChangeQ = this.onChangeQ.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { cites, category } = nextProps;
    if (cites.isLoaded) {
      this.setState({
        cityList: cites.list
      });
    }

    if (category.isLoaded) {
      this.setState({
        categoryList: category.list
      });
    }
    console.log(nextProps);
  }
  componentDidMount() {
    this.props.getCategory();
    this.props.getCites();
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
  }
  render() {
    const {
      text,
      categores,
      categoryHeader,
      categoryList,
      city,
      cityHeader,
      cityList,
      errors
    } = this.state;
    const { cites, category } = this.props;
    return (
      <form className="filter art" onSubmit={this.onSubmit}>
        <div className="form-select">
          <TextFieldGroup
            type="text"
            name="text"
            label="عنوان شغلی، مهارت یا..."
            value={text}
            onChange={this.onChange}
            error={errors.text}
            icon={"k-edit"}
          />
        </div>

        <div className="form-select">
          <SelectFieldGroup
            title={categores}
            headerDefalt={categoryHeader}
            state="categores"
            list={categoryList}
            toggleItem={this.toggleSelected}
            icon={""}
            error={errors.artMusicCategory}
            isLoaded={category.isLoaded}
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
  category: state.category
});
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actions, dispatch);
// }
export default connect(
  mapStateToProps,
  // mapDispatchToProps,
  { getCategory, getCites }
)(withRouter(ArtMusic));
