import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FeedbackIcon from "@material-ui/icons/Feedback";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import UnsubscribeIcon from "@material-ui/icons/Unsubscribe";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "../../components/CustomButtons/Button";
import Loader from "../../components/Loader/Loader";
import CheckboxListSecondary from "../../components/CheckboxListSecondary/CheckboxListSecondary";
// chart data mock
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";
// assets
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };

  componentDidMount(): void {
    this.props.startDashboard();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, isLoadDashboard } = this.props;
    console.log(isLoadDashboard);
    if (!isLoadDashboard) {
      return (
        <Loader/>
      );
    }
    return (
      <>
        <GridContainer>
          <GridItem xs={12} sm={6} xl={3} md={6}>
            <NavLink to="/revenue">
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon><AttachMoneyIcon/></Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Выручка</p>
                  <h3 className={classes.cardTitle}>
                    100000 <small>₽</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                  </div>
                </CardFooter>
              </Card>
            </NavLink>
          </GridItem>
          <GridItem xs={12} sm={6} xl={3} md={6}>
            <NavLink to="/order">
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <AddShoppingCartIcon/>
                  </CardIcon>
                  <p className={classes.cardCategory}>Заказов</p>
                  <h3 className={classes.cardTitle}>+10</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                  </div>
                </CardFooter>
              </Card>
            </NavLink>
          </GridItem>
          <GridItem xs={12} sm={6} xl={3} md={6}>
            <NavLink to="/reviews">
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <Icon><FeedbackIcon/></Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Отзывы</p>
                  <h3 className={classes.cardTitle}>+85</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                  </div>
                </CardFooter>
              </Card>
            </NavLink>
          </GridItem>
          <GridItem xs={12} sm={6} xl={3} md={6}>
            <NavLink to="/customers">
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <PersonAddIcon/>
                  </CardIcon>
                  <p className={classes.cardCategory}>Клиенты</p>
                  <h3 className={classes.cardTitle}>+58</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                  </div>
                </CardFooter>
              </Card>
            </NavLink>
          </GridItem>
          <GridItem xs={12}>
            <NavLink to="/mailing">
              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <ContactMailIcon/>
                  </CardIcon>
                  <CardIcon color="rose">
                    <UnsubscribeIcon/>
                  </CardIcon>
                  <p className={classes.cardCategory}>Подписки/Отписки</p>
                  <h3 className={classes.cardTitle}>+49/-10</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                  </div>
                </CardFooter>
              </Card>
            </NavLink>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Необработанные заказы</h4>
                <p className={classes.cardCategoryWhite}>
                  Новые заказы
                </p>
              </CardHeader>
              <CardBody>
                <CheckboxListSecondary/>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12}>
            <Card chart>
              <CardHeader color="success">
                <Button color={"info"} size={"sm"} round>День</Button>
                <Button color={"info"} size={"sm"} round>Неделя</Button>
                <Button color={"info"} size={"sm"} round>Месяц</Button>
                <Button color={"info"} size={"sm"} round>Год</Button>
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory}/> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
                <Button color={"info"} size={"sm"} round>День</Button>
                <Button color={"info"} size={"sm"} round>Неделя</Button>
                <Button color={"info"} size={"sm"} round>Месяц</Button>
                <Button color={"info"} size={"sm"} round>Год</Button>
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email подписчики</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory}/> 85%
                  </span>{" "}
                  по сравнению с прошлым месяцем
                </p>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory}/> 58%
                  </span>{" "}
                  по сравнению со средним показателем
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime/> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="danger">
                <Button color={"info"} size={"sm"} round>День</Button>
                <Button color={"info"} size={"sm"} round>Неделя</Button>
                <Button color={"info"} size={"sm"} round>Месяц</Button>
                <Button color={"info"} size={"sm"} round>Год</Button>
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Заказы</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory}/> 85%
                  </span>{" "}
                  по сравнению с прошлым месяцем
                </p>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory}/> 58%
                  </span>{" "}
                  по сравнению со средним показателем
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime/> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  startDashboard: PropTypes.func.isRequired,
  isLoadDashboard: PropTypes.bool
};

export default withStyles(dashboardStyle)(Dashboard);
