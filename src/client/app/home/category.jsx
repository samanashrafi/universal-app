import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import SelectFieldGroup from "client/app/common/SelectFieldGroup";
import MultiSelectFieldGroup from "client/app/common/MultiSelectFieldGroup";
import TextFieldGroup from "client/app/common/TextFieldGroup";
import { getCategory } from "src/redux/actions/category-actions";
import { getCites } from "src/redux/actions/cites-actions";

class ArtMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      categores: [],
      categoryHeader: "دسته بندی",
      categoryList: [],
      categoryListFetch: [
        // {
        //   id: "5c8771571de6f61ce87b319e",
        //   title: "برنامه نویسی "
        // },
        // {
        //   id: "5c8771ff1de6f61ce87b31a2",
        //   title: "گراقیست"
        // },
        // {
        //   id: "5c87726a1de6f61ce87b31a3",
        //   title: "آموزش"
        // },
        // {
        //   id: "5c8772871de6f61ce87b31a4",
        //   title: "مدیر محصول"
        // }
      ],
      city: "",
      cityHeader: "شهر",
      cityList: [],
      cityFetch: "",
      errors: [],
      input: 0
    };
    this.toggleSelected = this.toggleSelected.bind(this);
    this.toggleMultiSelected = this.toggleMultiSelected.bind(this);
    this.onChange = this.onChange.bind(this);
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
  }
  componentDidMount() {
    this.props.getCategory();
    this.props.getCites();
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
  }

  toggleSelected(title, name) {
    console.log(title, name);
    this.setState({
      [name]: title
    });
  }
  toggleMultiSelected(list, name) {
    console.log("categoresListHolder : ", list);
    this.setState({
      [name]: list,
      listFetch: list
    });
  }
  render() {
    const {
      text,
      categores,
      categoryHeader,
      categoryList,
      categoryListFetch,
      city,
      cityHeader,
      cityList,
      cityFetch,
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
          <MultiSelectFieldGroup
            title={categores}
            name="categores"
            headerDefault={categoryHeader}
            list={categoryList}
            listFetch={categoryListFetch}
            setList={this.toggleMultiSelected}
            icon={"k-bars"}
            multi={true}
            // field={"_id"}
            error={errors.artMusicCategory}
            isLoaded={category.isLoaded}
          />
        </div>
        <div className="form-select">
          <MultiSelectFieldGroup
            title={city}
            name={"city"}
            headerDefault={cityHeader}
            list={cityList}
            listFetch={cityFetch}
            setList={this.toggleSelected}
            icon={"k-map-marker-alt"}
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

export default connect(
  mapStateToProps,
  { getCategory, getCites }
)(withRouter(ArtMusic));
