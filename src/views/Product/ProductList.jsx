import React, { Component } from "react";
import PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
import moment from "moment/min/moment-with-locales";

moment.locale("ru");

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Hidden from "@material-ui/core/Hidden";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
// core components
import GridItem from "../../components/Grid/GridItem";
import ProductCard from "../../components/ProductCard/ProductCard";
import GridContainer from "../../components/Grid/GridContainer";
// import Loader from "../../components/Loader/Loader";
// @material-ui/icons
import SearchIcon from "@material-ui/icons/Search";
import LabelIcon from "@material-ui/icons/Label";
// data resource
import { goods, category } from "../Order/utils";


const renderRow = props => {
  const { index, style } = props;

  const handleClickItem = () => {
    const goodsFilter = goods.filter(item => item.category.id === category[index].id);
    console.log(goodsFilter);
  };

  return (
    <ListItem button style={style} key={index} onClick={handleClickItem}>
      <ListItemText secondary={category[index].name}/>
    </ListItem>
  );
};

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
};

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
    flex: 1
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

class OrderForm extends Component {
  displayName = "OrderForm";

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem
          xs={12}
          md={3}
        >
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Найти"
              inputProps={{ "aria-label": "Поиск товаров" }}
              onChange={(evt) => console.log(evt.target.value)}
            />
            <IconButton type="button" className={classes.iconButton} aria-label="search">
              <SearchIcon/>
            </IconButton>
          </Paper>
          <Paper>
            <Hidden only={["sm", "xs"]}>
              <ListSubheader
                color={"primary"}
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <LabelIcon/> <span style={{ marginLeft: "5px" }}>Категория</span>
              </ListSubheader>
              <FixedSizeList height={500} itemSize={46} itemCount={category.length}>
                {renderRow}
              </FixedSizeList>
            </Hidden>
            <Hidden only={["md", "lg", "xl"]}>
              <div className={classes.indentCard}>
                <TextField
                  select
                  label="Категория"
                  value={category[0].title}
                  style={{ width: "100%" }}
                  onChange={this.handleChange}
                  variant="outlined"
                >
                  {category.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Hidden>
          </Paper>
        </GridItem>
        <GridItem
          xs={12}
          md={9}
          item
          container
          justify="space-between"
        >
          {goods.map(target => {
            return (
              <GridItem key={target.id} xs={6} md={4} lg={3}>
                <ProductCard
                  path={`/product/${target.id}`}
                  btnText='Открыть'
                  target={target}
                />
              </GridItem>
            );
          })}
        </GridItem>
      </GridContainer>
    );
  }
}

OrderForm.propTypes = {
  classes: PropTypes.object
};

export default withStyles(useStyles)(OrderForm);
