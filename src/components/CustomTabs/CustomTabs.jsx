import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Grid } from "@material-ui/core";
// @material-ui/icons
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
// material-ui components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "../Card/CardFooter";
import Button from "../CustomButtons/Button";
import customTabsStyle from "assets/jss/material-dashboard-react/components/customTabsStyle.jsx";

class CustomTabs extends React.Component {
  state = {
    value: 0,
    color: this.props.headerColor
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {

    const {
      classes,
      plainTabs,
      tabs,
      title
    } = this.props;

    const { color, value } = this.state;

    const cardTitle = classNames({
      [classes.cardTitle]: true
    });
    return (
      <Card plain={plainTabs}>
        <CardHeader color={color} plain={plainTabs}>
          {title !== undefined ? (
            <div className={cardTitle}>{title}</div>
          ) : null}
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.displayNone,
              scrollButtons: classes.displayNone
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabs.map((prop, key) => {
              let icon = {};
              if (prop.tabIcon) {
                icon = {
                  icon: <prop.tabIcon/>
                };
              }
              return (
                <Tab
                  key={key}
                  classes={{
                    root: classes.tabRootButton,
                    selected: classes.tabSelected,
                    wrapper: classes.tabWrapper
                  }}
                  label={prop.tabName}
                  data-label={prop.dataName}
                  {...icon}
                />
              );
            })}
          </Tabs>
        </CardHeader>
        <CardBody>
          {tabs.map((prop, key) => {
            if (key === value) {
              return <div key={key}>{prop.tabContent}</div>;
            }
            return null;
          })}

        </CardBody>
        <CardFooter>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >

            <Button
              color={"success"}
              startIcon={<SaveIcon/>}
              onClick={() => null}
            >
              Сохранить
            </Button>
            <Button
              color={"danger"}
              startIcon={<CloseIcon/>}
              onClick={() => this.props.history.push(`/product`)}
              style={{ marginLeft: "auto" }}
            >
              Отмена
            </Button>
          </Grid>
        </CardFooter>
      </Card>
    );
  }
}

CustomTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary"
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.any,
      tabContent: PropTypes.node.isRequired
    })
  ),
  plainTabs: PropTypes.bool,
  history: PropTypes.object
};

export default withStyles(customTabsStyle)(CustomTabs);
