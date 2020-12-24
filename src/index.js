import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { connect, Provider } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import store from "./store";
// core components
import Admin from "./layouts";
// assets
import "assets/css/material-dashboard-react.css?v=1.6.0";
// hoc
import CaptureError from "./hoc/ErrorComponent";
import { toServerError } from "modules/App";

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

const AppComponent = (props) =>
  <SnackbarProvider
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

const mapDispatchFromProps = {
  toServerError
};


const Component = connect(null, mapDispatchFromProps)(CaptureError(AppComponent));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/" exac component={Component}/>
        <Redirect from='/' to="/dashboard"/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);


