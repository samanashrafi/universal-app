import React, { Component } from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import $ from "jquery"
import { searchFetch} from 'src/redux/actions/search-action.js'

import ArtMusic from 'client/app/home/ArtMusic.jsx';
import Language from 'client/app/home/Language.jsx';

import {
  withRouter
} from 'react-router-dom'
import swal from "sweetalert";
class Search extends Component {
  constructor(props){
    super(props);
    this.state ={
     artMusicLoaded:false,
     languageLoaded:false
    }
   this.selectCategory = this.selectCategory.bind(this);

  }
  selectCategory(e){
    let title = e.currentTarget.innerText
    switch(title.trim()){
      case "هنر و موسیقی":
      return this.setState({
        artMusicLoaded:true,
        languageLoaded:false
      })
      case "آموزشگاه زبان":
      return this.setState({
        artMusicLoaded:false,
        languageLoaded:true
      })
      default:
      ""
    }
  }
  render() {
    const { artMusicLoaded,languageLoaded } = this.state
    return (
      <div className="home-search">
        <div className="container-center">
        <div className="position-relative-margin" >
            <div className="category" >
                <li onClick={this.selectCategory} >
                  <div className="icon"></div>
                  <span>هنر و موسیقی</span>
                </li>
                <li onClick={this.selectCategory} >
                  <div className="icon"></div>
                  <span>آموزشگاه زبان</span>
                </li>
                <li onClick={this.selectCategory}>
                  <div className="icon"></div>
                  <span>مدارس غیر انتفاعی</span>
                </li>
                <li onClick={this.selectCategory}>
                  <div className="icon"></div>
                  <span>آموزشگاه های علمی</span>
                </li>
               
                <li onClick={this.selectCategory}>
                  <div className="icon"></div>
                  <span>فنی و حرفه ای</span>
                </li>
                
                <li onClick={this.selectCategory}>
                  <div className="icon"></div>
                  <span>طبیعت و گردشگری</span>
                </li>
            </div>
        </div>
        {artMusicLoaded ? <ArtMusic/> : null }
        {languageLoaded ? <Language/> : null }
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

