import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";


// core components
import Admin from "./layouts/Admin";

import "assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

const App = (props) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickNotification = ({ variant, message }) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  return (
    <Admin handleClickNotification={handleClickNotification} {...props}/>
  );
};

const MyApp = (props) => <SnackbarProvider
  maxSnack={1}
  anchorOrigin={{
    vertical: "top",
    horizontal: "center"
  }}
  dense
  autoHideDuration={2000}
>
  <App {...props}/>
</SnackbarProvider>;

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" exac component={MyApp}/>
      <Redirect from='/' to="/dashboard"/>
    </Switch>
  </Router>,
  document.getElementById("root")
);
