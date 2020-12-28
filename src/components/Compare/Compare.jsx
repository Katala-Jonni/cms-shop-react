import PropTypes from "prop-types";
import React from "react";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const Compare = props => {
  const { classes, title, count, measurement, unit } = props;
  return (
    <p className={classes.cardCategory}>
      {count > 0
        ? <span className={classes.successText}>
            <ArrowUpward className={classes.upArrowCardCategory}/> {count} {unit}
          </span>
        : count < 0
          ? <span className={classes.errorText}>
            <ArrowDownwardIcon className={classes.upArrowCardCategory}/>{count} {unit}
          </span>
          : <span className={classes.errorText}>
            {count} {unit}
          </span>
      }
      {" "}
      {title} {measurement}
    </p>
  );
};

Compare.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number,
  title: PropTypes.string,
  unit: PropTypes.string,
  measurement: PropTypes.string
};

export default Compare;
