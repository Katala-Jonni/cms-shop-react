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
// data resource
import { getOrderColumns, order } from "./utils";
//
import OrderTableSort from "./OrderTableSort";

class Order extends React.Component {
  onChangeSearch = evt => {
    console.log("CurrentCategory-onChangeSearch", evt.target.value);
  };

  render() {
    const { classes } = this.props;

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
                  orders={order}
                  scroll={{
                    x: "100vh"
                  }}
                  tableLayout={undefined}
                  getColumns={getOrderColumns}
                  path={"/order"}
                  pagination={order.length > 10}
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
  location: PropTypes.object
};

export default withStyles(dashboardStyle)(Order);
