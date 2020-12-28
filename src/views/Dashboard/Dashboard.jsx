import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FeedbackIcon from "@material-ui/icons/Feedback";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ContactMailIcon from "@material-ui/icons/ContactMail";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button";
import Loader from "components/Loader/Loader";
import CheckboxListSecondary from "../../components/CheckboxListSecondary/CheckboxListSecondary";
// assets
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Compare from "components/Compare/Compare";


const btns = [
  {
    name: "День",
    color: "info",
    size: "sm",
    round: true,
    type: "days"
  },
  {
    name: "Неделя",
    color: "info",
    size: "sm",
    round: true,
    type: "week"
  },
  {
    name: "Месяц",
    color: "info",
    size: "sm",
    round: true,
    type: "month"
  }
];

class Dashboard extends React.Component {
  state = {
    value: 0,
    btnChartRevenue: "День",
    btnChartEmail: "День",
    btnChartOrder: "День"
  };

  componentDidMount(): void {
    this.props.startDashboard();
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  changeBtnState = evt => {
    const chart = evt.currentTarget.dataset.chart;
    this.setState({
      [`btnChart${chart}`]: evt.currentTarget.textContent
    });
  };

  handleClickChartButton = evt => {
    this.props.startChart(evt.currentTarget.dataset.type);
    return this.changeBtnState(evt);
  };

  handleClickCharOrderButton = evt => {
    this.props.startChartOrder(evt.currentTarget.dataset.type);
    return this.changeBtnState(evt);
  };


  render() {

    const { classes, isLoadDashboard } = this.props;
    if (!isLoadDashboard) {
      return (
        <Loader/>
      );
    }
    const {
      dashboard: {
        countsOrder,
        revenue,
        newCustomers,
        newReviews,
        countChangeMailing,
        // mailing,
        // orders,
        newOrders
      },
      chartRevenue,
      chartOrder,
      revenueCompare,
      orderCompare
    } = this.props;
    let countMailing = countChangeMailing;
    if (countMailing > 0) {
      countMailing = `+${countMailing}`;
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
                    {revenue} <small>₽</small>
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
                  <h3 className={classes.cardTitle}>{`+${countsOrder}`}</h3>
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
                  <h3 className={classes.cardTitle}>{`+${newReviews}`}</h3>
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
                  <h3 className={classes.cardTitle}>{`+${newCustomers}`}</h3>
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
                  {/*<CardIcon color="rose">*/}
                  {/*  <UnsubscribeIcon/>*/}
                  {/*</CardIcon>*/}
                  <p className={classes.cardCategory}>Подписки</p>
                  <h3 className={classes.cardTitle}>{`${countMailing}`}</h3>
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
                <CheckboxListSecondary resource={newOrders}/>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {chartRevenue && chartRevenue.data
            ? <GridItem xl={6} xs={12}>
              <Card chart>
                <CardHeader color="success">
                  {btns.map((btn) => {
                    return (
                      <Button
                        round
                        size={"sm"}
                        key={btn.name}
                        color={btn.name === this.state.btnChartRevenue ? "warning" : "info"}
                        onClick={this.handleClickChartButton}
                        data-type={btn.type}
                        data-chart='Revenue'
                      >
                        {btn.name}
                      </Button>
                    );
                  })}
                  <ChartistGraph
                    className="ct-chart"
                    data={chartRevenue.data}
                    type="Line"
                    options={chartRevenue.options}
                    listener={chartRevenue.animation}
                    tooltip
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Выручка</h4>
                  <Compare
                    classes={classes}
                    measurement={"в процентах"}
                    unit={"%"}
                    count={revenueCompare.percent}
                    title={revenueCompare.title}
                  />
                  <Compare
                    classes={classes}
                    measurement={"в рублях"}
                    unit={"₽"}
                    count={revenueCompare.total}
                    title={revenueCompare.title}
                  />
                </CardBody>
              </Card>
            </GridItem>
            : null
          }
          {chartOrder && chartOrder.data
            ? <GridItem xl={6} xs={12}>
              <Card chart>
                <CardHeader color="danger">
                  {btns.map((btn) => {
                    return (
                      <Button
                        round
                        size={"sm"}
                        key={btn.name}
                        color={btn.name === this.state.btnChartOrder ? "success" : "info"}
                        onClick={this.handleClickCharOrderButton}
                        data-type={btn.type}
                        data-chart='Order'
                      >
                        {btn.name}
                      </Button>
                    );
                  })}
                  <ChartistGraph
                    className="ct-chart"
                    data={chartOrder.data}
                    type="Line"
                    options={chartOrder.options}
                    listener={chartOrder.animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Заказы</h4>
                  <Compare
                    classes={classes}
                    measurement={"в процентах"}
                    unit={"%"}
                    count={orderCompare.percent}
                    title={orderCompare.title}
                  />
                  <Compare
                    classes={classes}
                    measurement={"в рублях"}
                    unit={"₽"}
                    count={orderCompare.total}
                    title={orderCompare.title}
                  />
                </CardBody>
              </Card>
            </GridItem>
            : null
          }

        </GridContainer>
      </>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  startDashboard: PropTypes.func.isRequired,
  isLoadDashboard: PropTypes.bool,
  dashboard: PropTypes.exact({
    countsOrder: PropTypes.number,
    revenue: PropTypes.number,
    newCustomers: PropTypes.number,
    newReviews: PropTypes.number,
    countChangeMailing: PropTypes.number,
    mailing: PropTypes.arrayOf(PropTypes.object),
    orders: PropTypes.arrayOf(PropTypes.object),
    newOrders: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  chartRevenue: PropTypes.object,
  chartOrder: PropTypes.object,
  startChart: PropTypes.func,
  startChartOrder: PropTypes.func,
  revenueCompare: PropTypes.object,
  orderCompare: PropTypes.object
};

export default withStyles(dashboardStyle)(Dashboard);
