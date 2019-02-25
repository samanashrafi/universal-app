import React, { Component } from "react";
import RedirectWithStatus from "client/app/redirect-w-status.jsx";
import routeOptions from "client/routes/routes";
import jwt_decode from "jwt-decode";
import { Switch, Link, Route } from "react-router-dom";

import { setAuthToken } from "client/app/common/setAuthToken";
import { setCurrentUser, logoutUser } from "src/redux/actions/user-actions";
import Header from "client/app/layout/Header.jsx";
import Footer from "client/app/layout/Footer.jsx";
import store from "src/redux/store";

// import { citesFetch } from "src/redux/actions/cites-actions";
// import { districtFetch } from "src/redux/actions/district-actions";

import "src/assets/sass/mian.scss";
const isBrowser = typeof localStorage !== "undefined";

if (isBrowser) {
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/login";
    }
  }
}

class App extends Component {
  // static fetchData({ store }) {
  //   return store.dispatch(citesFetch());
  // }
  componentDidMount() {
    // this.props.citesFetch();
    // store.dispatch(citesFetch());
    // this.props.districtFetch();
    this.getHeightWindow();
  }
  getHeightWindow() {
    let layout =
      document.getElementsByTagName("header")[0].offsetHeight -
      document.getElementsByTagName("footer")[0].offsetHeight;
    document.getElementById("container-main").style.minHeight =
      window.innerHeight + layout + "px";
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

// App.propTypes = {
//   citesFetch: PropTypes.func.isRequired,
//   districtFetch: PropTypes.func.isRequired
// };
// export default connect(
//   null,
//   { citesFetch, districtFetch }
// )(App);
export default App;
