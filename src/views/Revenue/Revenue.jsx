import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import OrderTableSort from "../Order/OrderTableSort";
// assets
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
// data resource
import { geRevenueColumns, revenue } from "../Order/utils";

class Revenue extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12}>
          <GridItem xs={12} sm={12}>
            <Card>
              <CardHeader color="info" stats>
                <CardIcon color="warning">
                  <Icon><AttachMoneyIcon/></Icon>
                </CardIcon>
                <h4 className={classes.cardTitleWhite}>Выручки</h4>
              </CardHeader>
              <CardBody>
                <OrderTableSort
                  {...this.props}
                  orders={revenue}
                  tableLayout={undefined}
                  getColumns={geRevenueColumns}
                  path={"/revenue"}
                  pagination={revenue.length > 10}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridItem>
      </GridContainer>
    );
  }
}

Revenue.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object
};

export default withStyles(dashboardStyle)(Revenue);
