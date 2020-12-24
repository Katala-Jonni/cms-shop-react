import React, { Component } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import { Grid } from "@material-ui/core";
import NavPills from "components/NavPills/NavPills";
// @material-ui/icons
import DetailsIcon from "@material-ui/icons/Details";
import BuildIcon from "@material-ui/icons/Build";
// data resource
import { geCategoryColumns, category } from "../Order/utils";
// components
import OrderTableSort from "../Order/OrderTableSort";
import ProductList from "./ProductList";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Catalog extends Component {
  onChangeSearch = evt => {
    console.log("CurrentCategory-onChangeSearch", evt.target.value);
  };

  getTotalTabs = () => {
    const tabs = [
      {
        title: "Товары",
        icon: DetailsIcon,
        component: <ProductList/>
      },
      {
        title: "Категории",
        icon: BuildIcon,
        component: <OrderTableSort
          {...this.props}
          orders={category}
          bordered
          tableLayout={undefined}
          getColumns={geCategoryColumns}
          path={"/category"}
          data-name='category'
          pagination={category.length > 10}
          history={this.props.history}
          viewSearch
          onChangeSearch={this.onChangeSearch}
        />
      }
    ];
    return tabs.map(tab => {
      return {
        tabButton: tab.title,
        tabIcon: tab.icon,
        tabContent: tab.component,
        dataName: tab.title
      };
    });
  };

  render() {
    return (
      <div>
        <GridContainer>
          <Grid xs={12} item>
            <NavPills
              color="warning"
              alignCenter
              tabs={this.getTotalTabs()}
            />
          </Grid>
        </GridContainer>
      </div>
    );
  }
}

Catalog.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};


export default withStyles(styles)(Catalog);
