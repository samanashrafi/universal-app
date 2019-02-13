import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { searchFetch} from 'src/redux/actions/search-action.js'
import SelectFieldGroup from "client/app/common/SelectFieldGroup"
import TextFieldGroup from "client/app/common/TextFieldGroup"
import {
  withRouter
} from 'react-router-dom'
class Search extends Component {
  constructor(props){
    super(props);
    this.state ={
      text:"",
      art:"",
      artHeader:"هنر و موسیقی",
      artList:[
        {
          id: "1",
          title: "هنر",
          selected:false,
          key:"artList"

        },
        {
          id: 2,
          title: "موسیقی",
          selected:false,
          key:"artList"
        }
      ],

      categoryArt:"",
      categoryArtHeader:"زمینه هنری",
      categoryArtList:[
        {
          id: "1",
          title: "مبانی ترکیب بندی در عکاسی",
          selected:false,
          key:"categoryArtList"

        },
        {
          id: 2,
          title: "سفال و سرامیک",
          selected:false,
          key:"categoryArtList"
        }
      ],
      city:"",
      cityHeader:"شهر",
      cityList:[
        {
          id: "1",
          title: "تهران",
          selected:false,
          key:"cityList"

        },
        {
          id: 2,
          title: "کرج",
          selected:false,
          key:"cityList"
        },
        {
          id: 3,
          title: "اصفهان",
          selected:false,
          key:"cityList"
        },
        {
          id: 4,
          title: "بندرعباس",
          selected:false,
          key:"cityList"
        }
      ],

      neighbourhood:"",
      neighbourhoodHeader:"منطقه و محله",
      neighbourhoodList:[
        {
          id: "1",
          title: "منطقه 1 - آجودانیه",
          selected:false,
          key:"neighbourhoodList"

        },
        {
          id: 2,
          title: "منطقه 1 - آصف",
          selected:false,
          key:"neighbourhoodList"
        }
       
      ],
      errors:[],
      input:0
    }
   this.toggleSelected = this.toggleSelected.bind(this);
   this.onChange = this.onChange.bind(this);

  //  this.onChangeQ = this.onChangeQ.bind(this);
   this.onSubmit = this.onSubmit.bind(this);

  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // filterText(filter){
  //    return filter.replace(/ی/g,'ي').replace(/ک/g,'ك');
  // }
  // onChangeQ(e){
  //   e.preventDefault();
  //   this.setState({input:this.refs.searchFilter.value.length})
  //   if(this.refs.searchFilter.value.length > 2){
  //     this.props.searchFetch(this.filterText(this.refs.searchFilter.value));
  //   }else{
  //     this.refs.searchFilter.focus();
  //   }
  // }

  onSubmit(e){
    e.preventDefault();
    if(this.refs.searchFilter.value.length == 0){
      this.refs.searchFilter.focus();
    }else{
      if(this.refs.searchFilter.value.length > 2){
          this.props.history.push(`/search?q=${this.refs.searchFilter.value}`)
      }else{
        this.refs.searchFilter.focus();
      }
    }
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
    const {data,isLoaded} = this.props;
    const { text,art,artList,artHeader,categoryArt,categoryArtHeader,categoryArtList,city,cityHeader,cityList,neighbourhood,neighbourhoodHeader,neighbourhoodList,errors } = this.state
    let searchList;
    if(isLoaded){
       searchList = data.map( d =>{
         return(
          <li key={d.id}>
          <Link to="/">{d.title_Fa}</Link>
        </li>
         )
      })
    }
  
    return (
      <div className="home-search">
        <div className="container-center">
        <div className="position-relative-margin">
            <div className="category">
                <li>
                  <div className="icon"></div>
                  <span>هنر و موسیقی</span>
                </li>
                <li>
                  <div className="icon"></div>
                  <span>آموزشگاه زبان</span>
                </li>
                <li>
                  <div className="icon"></div>
                  <span>مدارس غیر انتفاعی</span>
                </li>
                <li>
                  <div className="icon"></div>
                  <span>آموزشگاه های علمی</span>
                </li>
               
                <li>
                  <div className="icon"></div>
                  <span>فنی و حرفه ای</span>
                </li>
                
                <li>
                  <div className="icon"></div>
                  <span>طبیعت و گردشگری</span>
                </li>
            </div>
        </div>
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
                  isLoaded={true}
                />
            </div>
            <div className="form-select">
              <SelectFieldGroup
                  title={neighbourhood}
                  headerDefalt={neighbourhoodHeader}
                  state="neighbourhood"
                  list={neighbourhoodList}
                  toggleItem={this.toggleSelected}
                  icon={""}
                  error={errors.neighbourhood}
                  isLoaded={true}
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
              <span>جستجو</span>
              <div className="spinner">
                <div className="double-bounce1" />
                <div className="double-bounce2" />
              </div>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
// Search.propTypes = {
//   searchFetch: PropTypes.func.isRequired,
//   //  q: PropTypes.array.isRequired,
//   // isLoaded: PropTypes.bool.isRequired
// };

const mapStateToProps = state =>( {
  data : state.search.data,
  isLoaded: state.search.isLoaded
});


 export default connect(mapStateToProps,{searchFetch})(withRouter(Search));

