// import Loadable  from 'react-loadable'

import Home from "client/app/home.jsx";
import User from "client/app/user.jsx";
import PageNotFound from "client/app/404.jsx";

import AcademyList from "client/app/academylist/AcademyList.jsx";
import Partners from "client/app/Partners.jsx";
import LoginRegister from "client/app/user/Login-Register.jsx";

export default {
  routes: [
    {
      path: "/",
      component: Home,
      exact: true
    },
    {
      path: "/user",
      component: User,
      exact: true
    },
    {
      path: "/partner",
      component: Partners,
      exact: true
    },
    {
      path: "/login-register",
      component: LoginRegister,
      exact: true
    },
    {
      path: "/search",
      component: AcademyList
    },
    {
      component: PageNotFound
    }
  ],
  redirects: [
    {
      from: "/people",
      to: "/user",
      status: 301
    }
  ]
};
