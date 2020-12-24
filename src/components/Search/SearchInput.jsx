import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";

const useStyles = ((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    padding: theme.spacing(1)
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  indentCard: {
    marginBottom: theme.spacing(2)
  }
}));

const SearchInput = (props) => {
  const { classes, onChange } = props;
  return (
    <Paper component="div" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Найти"
        inputProps={{ "aria-label": "Поиск товаров" }}
        onChange={onChange}
      />
      <SearchIcon/>
    </Paper>
  );
};

SearchInput.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func,
  disabledBtn: PropTypes.bool
};

export default withStyles(useStyles)(SearchInput);
