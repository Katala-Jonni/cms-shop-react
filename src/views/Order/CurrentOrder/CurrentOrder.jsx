import React, { Component } from "react";
import PropTypes from "prop-types";
import { PageHeader } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import classname from "classnames";
// core components
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CardIcon from "../../../components/Card/CardIcon";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import Button from "../../../components/CustomButtons/Button";
import Loader from "../../../components/Loader/Loader";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid } from "@material-ui/core";
// @material-ui/icons
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
// assets
import { grayColor } from "../../../assets/jss/material-dashboard-react";
// data resource
import { formatDate, geProductColumns, products, statusStyle } from "../utils";
import OrderTableSort from "../OrderTableSort";

moment.locale("ru");

const path = "/order";

const statusMap = Object.keys(statusStyle).map((el) => {
  return {
    value: el,
    label: el
  };
});

const useStyles = ((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: "80vh"
    }
  },
  cardTitleWhite: {
    color: "#fff"
  },
  marginRight: {
    marginRight: "auto"
  },
  orderMargin: {
    marginBottom: "15px"
  },
  headerTitle: {
    color: grayColor[1]
  },
  text: {
    color: grayColor[2]
  },
  select: {
    width: "100%"
  }
}));

class CurrentOrder extends Component {
  displayName = "CurrentOrder";

  state = {
    currentOrder: null,
    status: null,
    clicked: true,
    statusMap: []
  };

  componentWillUnmount(): void {
    // delete state
    this.props.clearCurrentOrder();
  }

  componentDidMount(): void {
    this.props.startLoadCurrentOrder({ id: +this.props.match.params.id });
  }

  getMenuStatus = () => {
    return statusMap.filter(status => status.value.toLowerCase() !== this.state.status);
  };

  handleChange = (event) => {
    const prevStatus = this.props.currentOrder.status.toLowerCase();
    const newStatus = event.target.value;
    this.setState({
      status: newStatus,
      clicked: prevStatus === newStatus
    });
  };

  handleClickSave = () => {
    this.setState({
      clicked: true
    });
    const options = {
      variant: "warning",
      message: "ВНимание! Происходит затирание объекта!"
    };
    this.props.handleClickNotification(options)();
    if (options.variant === "error") return false;
    this.props.startSaveCurrentOrder({
      status: this.state.status,
      currentOrder: this.props.currentOrder
    });
  };

  render() {
    const { classes, currentOrder, statusCurrentOrder } = this.props;
    const { status } = this.state;
    return (
      <>
        {currentOrder
          ? <GridContainer>
            <GridItem xs={12}>
              <NavLink to={path}>
                <PageHeader
                  onBack={() => null}
                  title="Все заказы"
                />

              </NavLink>
            </GridItem>
            <GridItem xs={12} sm={12}>
              <Card>
                <CardHeader color="info" stats>
                  <CardIcon color={statusStyle[currentOrder.status.toLowerCase()]}>
                    <AddShoppingCartIcon/>
                  </CardIcon>
                  <Typography
                    variant='h6'
                    component="h3"
                    className={classname(classes.cardTitleWhite, classes.orderMargin)}
                  >
                    Номер заказа №-{currentOrder.order}
                  </Typography>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={6} container direction="column" alignItems="flex-start">
                      <Typography variant='subtitle1' component="h3" className={classes.orderMargin}>
                        Тип оплаты - {`Наличными`}
                      </Typography>
                      <div className={classes.orderMargin}>
                        <small className={classes.headerTitle}>Дата/Время</small>
                        <p className={classes.text}>{moment(currentOrder.date, formatDate).format("LLLL")}</p>
                      </div>
                      <div>
                        <TextField
                          select
                          label="Статус"
                          value={status || statusCurrentOrder}
                          onChange={this.handleChange}
                          helperText="Выберите статус"
                          variant="outlined"
                        >
                          {status
                            ? <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                            : null
                          }
                          {this.getMenuStatus().map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <Typography variant='h6' component="h3" className={classes.orderMargin}>
                        Покупатель
                      </Typography>
                      <p className={classes.orderMargin}>
                        {currentOrder.customer.id
                          ? <NavLink to={`/customers/1`}>
                            {currentOrder.customer.name}
                          </NavLink>
                          : <span>{currentOrder.customer}</span>
                        }
                      </p>
                      <p>
                        Email: <span><a href="mailto:katala.jonni@yandex.ru">katala.jonni@yandex.ru</a></span>
                      </p>
                      <p>
                        Телефон: 8-999-999-99-99
                      </p>
                      <Typography variant='subtitle1' component="p" className={classes.orderMargin}>
                        Адрес: город Петрозаводск, ул. Генерала Судакова, дом 7, квартира 180
                      </Typography>
                    </GridItem>
                    <GridItem xs={12}>
                      <Typography variant='h6' component="h3" className={classes.orderMargin}>
                        Пожелания
                      </Typography>
                      <Typography
                        variant='body2'
                        component="p"
                        className={classes.orderMargin}
                        align='left'
                        style={{ border: "1px dotted #aaa", padding: "10px" }}
                      >
                        Позвоните за час
                      </Typography>
                    </GridItem>
                    <GridItem xs={12}>
                      <Typography variant='h6' component="h3" className={classes.orderMargin}>
                        Товары
                      </Typography>
                      <OrderTableSort
                        {...this.props}
                        orders={products}
                        getColumns={geProductColumns}
                        path={"/product"}
                        bordered
                        scroll={{ x: "100vh" }}
                        tableLayout={undefined}
                        pagination={products.length > 10}
                        footer={() => {
                          return (
                            <>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                              >
                                <Grid
                                  md={7}
                                  item
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    component={"p"}
                                    align={"right"}
                                    paragraph
                                  >
                                    Итого:
                                  </Typography>
                                </Grid>
                                <Grid
                                  md={5}
                                  item
                                  style={{ textAlign: "right" }}
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    component={"p"}
                                    align={"right"}
                                    paragraph>{`${3000} ₽`}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                              >
                                <Grid
                                  md={7}
                                  item
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    component={"p"}
                                    align={"right"}
                                    paragraph
                                  >
                                    Доставка:
                                  </Typography>
                                </Grid>
                                <Grid
                                  md={5}
                                  item
                                  style={{ textAlign: "right" }}
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    component={"p"}
                                    align={"right"}
                                    paragraph>{`${100} ₽`}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                              >
                                <Grid
                                  md={7}
                                  item
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    component={"p"}
                                    align={"right"}
                                    paragraph
                                  >
                                    {`Промокод (ddh-EdndGHh-dds):`}
                                  </Typography>
                                </Grid>
                                <Grid
                                  md={5}
                                  item
                                  style={{ textAlign: "right" }}
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    component={"p"}
                                    align={"right"}
                                    paragraph>{`${0} ₽`}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                              >
                                <Grid
                                  md={7}
                                  item
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    component={"p"}
                                    align={"right"}
                                    paragraph
                                  >
                                    К оплате:
                                  </Typography>
                                </Grid>
                                <Grid
                                  md={5}
                                  item
                                  style={{ textAlign: "right" }}
                                >
                                  <Typography
                                    variant={"subtitle1"}
                                    component={"p"}
                                    align={"right"}
                                    paragraph>{`${3100} ₽`}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </>
                          );
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    {!this.state.clicked
                      ? <Button
                        color={"success"}
                        startIcon={<SaveIcon/>}
                        onClick={this.handleClickSave}
                        disabled={this.state.clicked}
                      >
                        Сохранить
                      </Button>
                      : null
                    }
                    <Button
                      color={"danger"}
                      startIcon={<CloseIcon/>}
                      onClick={() => this.props.history.push(path)}
                      style={{ marginLeft: "auto" }}
                    >
                      Отмена
                    </Button>
                  </Grid>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
          : <div className={classes.loader}>
            <Loader/>
          </div>
        }
      </>
    );
  }
}

CurrentOrder.propTypes = {
  classes: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  handleClickNotification: PropTypes.func,
  startLoadCurrentOrder: PropTypes.func,
  currentOrder: PropTypes.object,
  statusCurrentOrder: PropTypes.string,
  startSaveCurrentOrder: PropTypes.func,
  clearCurrentOrder: PropTypes.func
};

export default withStyles(useStyles)(CurrentOrder);
