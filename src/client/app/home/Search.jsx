import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { searchFetch} from 'src/redux/actions/searchAction.js'
import {
  withRouter
} from 'react-router-dom'
class Search extends Component {
  constructor(props){
    super(props);
    this.state ={
      locale:"",
      category:"",
      input:0
    }
   this.onChangeCategory = this.onChangeCategory.bind(this);
   this.onChangeLocale = this.onChangeLocale.bind(this);
   this.onChangeQ = this.onChangeQ.bind(this);
   this.onSubmit = this.onSubmit.bind(this);

  }
  onChangeCategory(e){
    this.setState({category:e.target.value})
  }
  onChangeLocale(e){
    this.setState({locale:e.target.value})
  }
  filterText(filter){
     return filter.replace(/ی/g,'ي').replace(/ک/g,'ك');
  }
  onChangeQ(e){
    e.preventDefault();

     this.setState({input:this.refs.searchFilter.value.length})
     
    if(this.refs.searchFilter.value.length > 2){

      this.props.searchFetch(this.filterText(this.refs.searchFilter.value));
    }else{
      this.refs.searchFilter.focus();
    }
  }

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
  
  render() {
    const {data,isLoaded} = this.props;
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
          <form className="filter" onSubmit={this.onSubmit}>
            <div className="form-select">
              <input type="search"  ref="searchFilter" onChange={this.onChangeQ} placeholder="لطفا مطلب خود را جستجو کنید..." />
              { this.state.input > 2 && searchList?
              <ul className="search-list">
                {searchList.length == 0 ? 
                  <li className="not-found">موردی یافت نشد!!!</li>
              :searchList }
              </ul>
              :""}
              
            </div>
            <div className="form-select">
              <select value={this.state.category} onChange={this.onChangeCategory}>
                <option>مدارس</option>
                <option>آموزشکده</option>
                <option>موسسات</option>
                <option>سالن های ورزشی و تفریحی</option>
              </select>
            </div>
            <div className="form-select">
            <select value={this.state.locale} onChange={this.onChangeLocale}>
                <option>صادقیه</option>
                <option>پونک</option>ٍ
                <option>استاد معین</option>
                <option>نیاوران</option>
              </select>
            </div>
            <button className="btn"><span>جستجو</span>
              <div className="spinner">
                <div className="double-bounce1" />
                <div className="double-bounce2" />
              </div></button>
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

