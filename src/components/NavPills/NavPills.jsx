import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

// material-ui components
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/GridItem.jsx";

import navPillsStyle from "../../assets/jss/material-dashboard-react/components/navPillsStyle.jsx";

class NavPills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props.active
    };
  }

  handleChange = (event, active) => {
    this.setState({ active });
  };
  handleChangeIndex = index => {
    this.setState({ active: index });
  };

  handleClickTab = () => {};

  render() {
    const {
      classes,
      tabs,
      direction,
      color,
      horizontal,
      alignCenter
    } = this.props;

    const flexContainerClasses =
      classes.flexContainer +
      " " +
      cx({
        [classes.horizontalDisplay]: horizontal !== undefined
      });
    const tabButtons = (
      <Tabs
        classes={{
          root: classes.root,
          fixed: classes.fixed,
          flexContainer: flexContainerClasses,
          indicator: classes.displayNone
        }}
        value={this.state.active}
        onChange={this.handleChange}
        centered={alignCenter}
        scrollButtons={"on"}
      >
        {tabs.map((prop, key) => {
          var icon = {};
          if (prop.tabIcon !== undefined) {
            icon["icon"] = <prop.tabIcon className={classes.tabIcon}/>;
          }
          const pillsClasses =
            classes.pills +
            " " +
            cx({
              [classes.horizontalPills]: horizontal !== undefined,
              [classes.pillsWithIcons]: prop.tabIcon !== undefined
            });
          return (
            <Tab
              label={prop.tabButton}
              key={key}
              onClick={this.handleClickTab}
              {...icon}
              selected
              classes={{
                root: pillsClasses,
                selected: classes[color]
              }}
              data-name={prop.dataName}
            />
          );
        })}
      </Tabs>
    );
    const tabContent = (
      <div className={classes.contentWrapper}>
        <SwipeableViews
          axis={direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.active}
          onChangeIndex={this.handleChangeIndex}
        >
          {tabs.map((prop, key) => {
            return (
              <div className={classes.tabContent} key={key}>
                {prop.tabContent}
              </div>
            );
          })}
        </SwipeableViews>
      </div>
    );
    return horizontal !== undefined ? (
      <GridContainer>
        <ItemGrid {...horizontal.tabsGrid}>{tabButtons}</ItemGrid>
        <ItemGrid {...horizontal.contentGrid}>{tabContent}</ItemGrid>
      </GridContainer>
    ) : (
      <div>
        {tabButtons}
        {tabContent}
      </div>
    );
  }
}

NavPills.defaultProps = {
  active: 0,
  color: "primary"
};

NavPills.propTypes = {
  classes: PropTypes.object.isRequired,
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};

export default withStyles(navPillsStyle)(NavPills);
