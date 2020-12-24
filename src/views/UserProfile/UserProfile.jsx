import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

moment.locale("ru");

// core components
// import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
// import Loader from "../../components/Loader/Loader";

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";

// @material-ui/icons
// import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { Grid } from "@material-ui/core";
import ProductCard from "../../components/ProductCard/ProductCard";
import { goods, category } from "../Order/utils";
import Hidden from "@material-ui/core/Hidden";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import LabelIcon from "@material-ui/icons/Label";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
// import Info from "../../components/Typography/Info";
// import DirectionsIcon from "@material-ui/icons/Directions";
// import Divider from "@material-ui/core/Divider";


function renderRow(props) {
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
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
};
//

const useStyles = ((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    // marginTop: theme.spacing(2),
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
      <Grid
      container
      >
        <GridItem xs={12}>Сортировка, Создать новый, Экспорт</GridItem>
        <GridItem
          xs={12}
          md={3}
          // container
          // justify="flex-start"
          // alignItems='flex-start'
        >
          <GridItem item xs={12}>
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
          </GridItem>
          <GridItem item xs={12}>
            <Hidden only={["md", "sm", "xs"]}>
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
            </Hidden>
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
      </Grid>
    );
  }
}

OrderForm.propTypes = {
  classes: PropTypes.object
};

export default withStyles(useStyles)(OrderForm);
