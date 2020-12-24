import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import classname from "classnames";
import { PageHeader } from "antd";
// components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import Button from "../../components/CustomButtons/Button";
import Loader from "../../components/Loader/Loader";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
// @material-ui/icons
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import BuildIcon from "@material-ui/icons/Build";
// data resource
import { geGoodsColumns, goods } from "../Order/utils";
// assets
import { grayColor } from "../../assets/jss/material-dashboard-react";
//
import OrderTableSort from "../Order/OrderTableSort";

moment.locale("ru");

const path = "/catalog";

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

class CurrentCategory extends Component {
  displayName = "CurrentCategory";

  state = {
    target: null,
    category: "",
    clicked: true
  };

  componentWillUnmount(): void {
    clearInterval(this.timer);
  }

  componentDidMount(): void {
    this.timer = setTimeout(() => {
      const target = goods.find(o => +o.category.id === +this.props.match.params.id);
      this.setState({
        target: target.category,
        category: target.category.title
      });
      clearTimeout(this.timer);
    }, 1000);
  }

  handleClickSave = () => {
    this.setState({
      clicked: true
    });
    const options = {
      variant: "warning",
      message: "ВНимание! Происходит затирание объекта!"
    };
    this.props.handleClickNotification(options)();
  };

  handleChange = evt => {
    this.setState({
      target: {
        ...this.state.target,
        title: evt.target.value
      },
      clicked: this.state.category.toLowerCase() === evt.target.value.toLowerCase()
    });
  };

  onChangeSearch = evt => {
    console.log("CurrentCategory-onChangeSearch", evt.target.value);
  };

  render() {
    const { classes } = this.props;
    const { target } = this.state;
    return (
      <>
        {target
          ? <GridContainer>
            <GridItem xs={12}>
              <NavLink to={path}>
                <PageHeader
                  onBack={() => null}
                  title="Каталог"
                />
              </NavLink>
            </GridItem>
            <GridItem xs={12} sm={12}>
              <Card>
                <CardHeader color="info" stats>
                  <CardIcon color={"warning"}>
                    <BuildIcon/>
                  </CardIcon>
                  <Typography
                    variant='h6'
                    component="h3"
                    className={classname(classes.cardTitleWhite, classes.orderMargin)}
                  >
                    {target.title}
                  </Typography>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={6} container direction="column" alignItems="flex-start">
                      <div>
                        <TextField
                          required
                          id="standard-basic"
                          label="Категория"
                          value={target.title}
                          className={classes.orderMargin}
                          onChange={this.handleChange}
                        />
                      </div>
                    </GridItem>
                    <GridItem xs={12}>
                      <Typography variant='h6' component="h3" className={classes.orderMargin}>
                        Вхождения
                      </Typography>
                      <OrderTableSort
                        {...this.props}
                        orders={goods}
                        getColumns={geGoodsColumns}
                        path={"/product"}
                        bordered
                        tableLayout={undefined}
                        pagination={goods.length > 10}
                        viewSearch
                        onChangeSearch={this.onChangeSearch}
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

CurrentCategory.propTypes = {
  classes: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  handleClickNotification: PropTypes.func
};

export default withStyles(useStyles)(CurrentCategory);
