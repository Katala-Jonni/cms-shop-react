import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

const st = {
  width: "100%",
  minWidth: "100px"
};

const CheckboxListSecondary = (props) => {
  const { resource } = props;
  if (!resource.length) {
    return (
      <Typography
        variant='h6'
        component="h3"
      >
        Новых заказов нет
      </Typography>
    );
  }
  return (
    <List dense style={{ st }}>
      <ListItem divider>
        <ListItemText id={"labelId"} primary={"Дата"}/>
        <Hidden only={["xs"]}>
          <ListItemSecondaryAction>№ заказа</ListItemSecondaryAction>
        </Hidden>
      </ListItem>
      {resource.map(o => {
        const labelId = `checkbox-list-secondary-label-${o.id}`;
        return (
          <NavLink to={`/order/${o.id}`} key={o.id}>
            <ListItem button divider style={{padding: '10px'}}>
              <ListItemText id={labelId} primary={o.date}/>
              <Hidden only={["xs"]}>
                <ListItemSecondaryAction>{o.order}</ListItemSecondaryAction>
              </Hidden>
            </ListItem>
          </NavLink>

        );
      })}
    </List>
  );
};

CheckboxListSecondary.defaultProps = {
  resource: []
};

CheckboxListSecondary.propTypes = {
  resource: PropTypes.array
};

export default CheckboxListSecondary;
