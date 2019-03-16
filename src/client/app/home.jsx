import React, { Component } from "react";
import { Helmet } from "react-helmet";
import Search from "src/client/app/home/Search.jsx";
import IntegrationDownshift from "src/client/app/home/IntegrationDownshift.jsx";
class Home extends Component {
  static fetchData({ store }) {
    return new Promise(resolve => resolve()); //default
  }
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
        <Search />
        <IntegrationDownshift />
      </div>
    );
  }
}
export default Home;
