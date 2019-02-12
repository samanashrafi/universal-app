import express from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import helmet from "react-helmet";
import App from "client/app/app.jsx";

import {
  Provider
} from "react-redux";

import {
  StaticRouter as Router,
  matchPath
} from "react-router";
import Store from "src/redux/store";
import routeBank from "client/routes/routes";

const app = express();
app.use("/dist", express.static("./dist"));

app.get("*", async (req, res) => {
  try {
    //create new redux store on each request
    let foundPath = null;
    // match request url to our React Router paths and grab component
    let {
      path,
      component
    } =
    routeBank.routes.find(({
      path,
      exact
    }) => {
      foundPath = matchPath(req.url, {
        path,
        exact,
        strict: false
      });
      return foundPath;
    }) || {};

    // console.log("path : ",path);
    // console.log("component :" ,component);
    // safety check for valid component, if no component we initialize an empty shell.
    if (!component)

      component = {};


    // safety check for fetchData function, if no function we give it an empty promise
    if (!component.fetchData)
      component.fetchData = () => new Promise(resolve => resolve());
    // meat and bones of our isomorphic application: grabbing async data
    await component.fetchData({
      Store,
      params: foundPath ? foundPath.params : {}
    });


    //get store state (js object of entire store)
    // let preloadedState = store.getState();
    //context is used by react router, empty by default
    let context = {};
    //render helmet data aka meta data in <head></head>y
    const helmetData = helmet.renderStatic();
    const content = renderFullPage(req, Store, context, helmetData);

    //check context for url, if url exists then react router has ran into a redirect
    if (context.url) {
      //process redirect through express by redirecting
      res.redirect(context.status, "http://" + req.headers.host + context.url);
    } else if (foundPath && foundPath.path == "/404") {
      //if 404 then send our custom 404 page with initial state and meta data, this is needed for status code 404
      res.status(404).send(content.htmlcode);
    } else {
      //else send down page with initial state and meta data
      console.log("send down page with initial state and meta data")
      res.send(content.htmlcode)
    }


  } catch (error) {
    res.status(400).send(renderFullPage("An error occured.", {}, {}));
  }
});

const port = process.env.PORT || 9000;
app.listen(port, function () {
  console.log("app running on localhost:" + port);
});



function renderFullPage(req,store,context, helmet) {
  const content = ReactDOM.renderToString(
    <Provider store={store}>
      <Router context={context} location={req.path}>
        <App />
      </Router>
    </Provider>
  );
  return{
    htmlcode :`
    <!doctype html>
    <html>
      <head>
        <link rel="icon" href="/dist/favicon.ico" type="image/ico" />
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
		    ${helmet.link.toString()}
		<link rel="stylesheet" type="text/css" href="/dist/app.css"/>
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(
            /</g,
            "\\u003c"
          )}
        </script>
        <script src="/dist/client.js"></script>
      </body>
    </html>
    `,
    routestatus: context.statusCode

  } 
}