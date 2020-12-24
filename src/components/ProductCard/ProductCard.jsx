import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import Button from "../CustomButtons/Button";
// import Warning from "../Typography/Warning";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: "30px"
  }
});

const ProductCard = (props) => {
  const classes = useStyles();
  const { target } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={target.name}
          image={target.image}
          title={target.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {target.name}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="h3">
            {`${target.price} ₽`}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="h3">
            {target.status
              ? <IconButton color="primary" component="span"><CheckIcon/></IconButton>
              : <IconButton color="secondary" component="span"><CloseIcon/></IconButton>
            }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <NavLink to={props.path}>
          <Button size="sm" color="info">
            {props.btnText}
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  classes: PropTypes.object,
  path: PropTypes.string,
  btnText: PropTypes.string,
  target: PropTypes.object
};

export default ProductCard;
