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
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo.png";
import OrderForm from "../views/Order/OrderForm";
import CurrentProduct from "../views/Product/CurrentProduct";

const SwitchRoutes = (props) => {
  return (
    <Switch>
      <Route path={`/order/:id`} exac render={(prop) => <OrderForm {...prop} handleClickNotification={props.handleClickNotification}/>}/>
      <Route path={`/customers/:id`} exac render={(props) => <h1>Customer</h1>}/>
      <Route path={`/product/:id`} exac render={(prop) => <CurrentProduct {...prop} handleClickNotification={props.handleClickNotification}/>}/>
      {routes.map((prop, key) => {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      })}
      <Route path="/revenue" render={() => <h1>Revenue</h1>}/>
      <Route path="/new-order" render={() => <h1>New Order</h1>}/>
      <Route path="/mailing" render={() => <h1>Подписчики</h1>}/>
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
  }

  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
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
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}><SwitchRoutes {...this.props}/></div>
            </div>
          ) : (
            <div className={classes.map}><SwitchRoutes {...this.props}/></div>
          )}
          {this.getRoute() ? <Footer/> : null}
          {/*<FixedPlugin*/}
          {/*  handleImageClick={this.handleImageClick}*/}
          {/*  handleColorClick={this.handleColorClick}*/}
          {/*  bgColor={this.state["color"]}*/}
          {/*  bgImage={this.state["image"]}*/}
          {/*  handleFixedClick={this.handleFixedClick}*/}
          {/*  fixedClasses={this.state.fixedClasses}*/}
          {/*/>*/}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
