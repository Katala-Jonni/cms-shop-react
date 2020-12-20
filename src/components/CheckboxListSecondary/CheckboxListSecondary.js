import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";

import { filterNewOrder } from "../../views/Order/utils";

const st = {
  width: "100%",
  minWidth: "100px"
};

const CheckboxListSecondary = () => {

  return (
    <List dense style={{ st }}>
      <ListItem divider>
        <ListItemAvatar>
          <p></p>
        </ListItemAvatar>
        <ListItemText id={'labelId'} primary={'Дата'}/>
        <ListItemSecondaryAction>№ заказа</ListItemSecondaryAction>
      </ListItem>
      {filterNewOrder.map(o => {
        const labelId = `checkbox-list-secondary-label-${o.id}`;
        return (
          <NavLink to={`/order/${o.id}`} key={o.id}>
            <ListItem button divider>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${o.id}`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={o.date}/>
              <ListItemSecondaryAction>{o.order}</ListItemSecondaryAction>
            </ListItem>
          </NavLink>

        );
      })}
    </List>
  );
};

export default CheckboxListSecondary;
