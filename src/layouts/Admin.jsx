/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
// assets
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo.png";
// views
import OrderForm from "../views/Order/OrderForm";
import CurrentProduct from "../views/Product/CurrentProduct";
import CurrentCategory from "../views/Product/CurrentCategory";
import Revenue from "../views/Revenue/Revenue";
//
import routes from "routes.js";
import Loader from "../components/Loader/Loader";

const SwitchRoutes = (props) => {
  return (
    <Switch>
      <Route
        path={`/order/:id`}
        exac
        render={(prop) => <OrderForm {...prop} handleClickNotification={props.handleClickNotification}/>}
      />
      <Route
        path={`/category/:id`}
        exac
        render={(prop) => <CurrentCategory {...prop} handleClickNotification={props.handleClickNotification}/>}
      />
      <Route
        path={`/customers/:id`}
        exac
        render={(props) => <h1>Customer</h1>}
      />
      <Route
        path={`/product/:id`}
        exac
        render={(prop) => <CurrentProduct {...prop} handleClickNotification={props.handleClickNotification}/>}
      />
      {routes.map((prop, key) => {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      })}
      <Route
        path="/revenue"
        render={(prop) => <Revenue {...prop} handleClickNotification={props.handleClickNotification}/>}
      />
      <Route
        path="/mailing"
        render={() => <h1>Подписчики</h1>}
      />
      <Redirect to='/dashboard'/>
    </Switch>
  );
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown",
      mobileOpen: false
    };
    this.mainPanel = React.createRef();
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  componentDidMount() {
    this.props.loadApp();
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.mainPanel.current);
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, isLoad, serverError, ...rest } = this.props;
    if (serverError) {
      throw new Error("serverError");
    }
    if (!isLoad) {
      return (
        <Loader isStart/>
      );
    }
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}><SwitchRoutes {...this.props}/></div>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoad: PropTypes.bool,
  loadApp: PropTypes.func.isRequired,
  serverError: PropTypes.bool
};

export default withStyles(dashboardStyle)(Dashboard);
