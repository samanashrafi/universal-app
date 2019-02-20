import React, { Component } from "react";
import Category from "client/app/home/category.jsx";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artMusicLoaded: false,
      languageLoaded: false
    };
    this.selectCategory = this.selectCategory.bind(this);
  }
  selectCategory(e) {
    let title = e.currentTarget.innerText;
    switch (title.trim()) {
      case "هنر و موسیقی":
        return this.setState({
          artMusicLoaded: true,
          languageLoaded: false
        });
      case "آموزشگاه زبان":
        return this.setState({
          artMusicLoaded: false,
          languageLoaded: true
        });
      default:
        "";
    }
  }
  render() {
    const { artMusicLoaded, languageLoaded } = this.state;
    return (
      <div className="home-search">
        {/* <div className="con">
          <div className="container-center">
            <div className="cat-list position-relative-margin">
              <ul className="category">
                <li onClick={this.selectCategory}>
                  <div className="icon" />
                  <span>هنر و موسیقی</span>
                </li>
                <li onClick={this.selectCategory}>
                  <div className="icon" />
                  <span>آموزشگاه زبان</span>
                </li>
                <li onClick={this.selectCategory}>
                  <div className="icon" />
                  <span>مدارس غیر انتفاعی</span>
                </li>
                <li onClick={this.selectCategory}>
                  <div className="icon" />
                  <span>آموزشگاه های علمی</span>
                </li>
                <li onClick={this.selectCategory}>
                  <div className="icon" />
                  <span>فنی و حرفه ای</span>
                </li>
                <li onClick={this.selectCategory}>
                  <div className="icon" />
                  <span>طبیعت و گردشگری</span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
        <div className="container-center">
          <Category />
        </div>
      </div>
    );
  }
}

export default Search;
