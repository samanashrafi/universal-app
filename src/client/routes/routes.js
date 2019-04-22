// import Loadable  from 'react-loadable'

import Home from "client/app/home.jsx";
import User from "client/app/user.jsx";
import PageNotFound from "client/app/404.jsx";

import AcademyList from "client/app/academylist/AcademyList.jsx";
import Partners from "client/app/Partners.jsx";
import Login from "client/app/user/Login.jsx";
import Register from "client/app/user/Register.jsx";
import Dashboard from "client/app/user/Dashboard.jsx";
import Task from "client/app/Task/Task.jsx";
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
      path: "/login",
      component: Login,
      exact: true
    },
    {
      path: "/register",
      component: Register,
      exact: true
    },
    {
      path: "/dashboard",
      component: Dashboard,
      exact: true
    },
    {
      path: "/Task",
      component: Task,
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
