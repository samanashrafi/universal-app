import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import RedirectWithStatus from "client/app/redirect-w-status.jsx";
import routeOptions from "client/routes/routes";
import {connect} from "react-redux"
import PropTypes from 'prop-types'

import Header from "client/app/layout/Header.jsx";
import Footer from "client/app/layout/Footer.jsx";
import { citesFetch } from 'src/redux/actions/cites-actions';
import { districFetch } from 'src/redux/actions/distric-actions'

import "src/assets/sass/mian.scss";

class App extends Component {
  componentDidMount() {
    this.props.citesFetch();
    this.props.districFetch();
    this.getHeightWindow();
  }
  getHeightWindow() {
    let layout =
      document.getElementsByTagName("header")[0].offsetHeight -
      document.getElementsByTagName("footer")[0].offsetHeight;
    document.getElementById("container-main").style.minHeight = (window.innerHeight + layout) + "px";
  }
  render() {
    let routes = routeOptions.routes.map(({ path, component, exact }, i) => (
      <Route
        key={Math.random() + "ROUTE_"}
        exact={exact}
        path={path}
        component={component}
      />
    ));
    let redirects = routeOptions.redirects.map(({ from, to, status }, i) => (
      <RedirectWithStatus
        key={Math.random() + "REDIRECT_"}
        from={from}
        to={to}
        status={status}
      />
    ));
    return (
      <div>
        <Header />
        <div id="container-main">
          <Switch>
            {routes}
            {redirects}
          </Switch>
        </div>

        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  citesFetch : PropTypes.func.isRequired,
  districFetch : PropTypes.func.isRequired,
}
export default connect(null,{citesFetch,districFetch})(App);
