import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
// @material-ui/icons
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Loader from "components/Loader/Loader";
// data resource
import { getOrderColumns } from "./utils";
//
import OrderTableSort from "./OrderTableSort";

class Order extends React.Component {

  componentWillUnmount(): void {
    this.props.clearOrder();
  }

  componentDidMount(): void {
    this.props.startLoadOrder();
  }

  onChangeSearch = evt => {
    this.props.startSearchOrder({ value: evt.target.value });
  };

  render() {
    const { classes, isLoadOrder, orders } = this.props;

    if (!isLoadOrder) {
      return (
        <Loader/>
      );
    }

    return (
      <GridContainer>
        <GridItem xs={12}>
          <GridItem xs={12} sm={12}>
            <Card>
              <CardHeader color="info" stats>
                <CardIcon color="success">
                  <AddShoppingCartIcon/>
                </CardIcon>
                <h4 className={classes.cardTitleWhite}>Заказы</h4>
              </CardHeader>
              <CardBody>
                <OrderTableSort
                  {...this.props}
                  orders={orders}
                  scroll={{
                    x: "100vh"
                  }}
                  tableLayout={undefined}
                  getColumns={getOrderColumns}
                  path={"/order"}
                  pagination={orders.length > 10}
                  viewSearch
                  onChangeSearch={this.onChangeSearch}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridItem>
      </GridContainer>

    );
  }
}

Order.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  orders: PropTypes.array,
  startLoadOrder: PropTypes.func,
  isLoadOrder: PropTypes.bool,
  clearOrder: PropTypes.func,
  startSearchOrder: PropTypes.func
};

export default withStyles(dashboardStyle)(Order);
