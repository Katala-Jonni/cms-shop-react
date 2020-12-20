import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
// import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { infoColor, successColor } from "../../assets/jss/material-dashboard-react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import CardFooter from "components/Card/CardFooter.jsx";

// import avatar from "assets/img/faces/marc.jpg";
// import style manually


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

const CustomCheckbox = withStyles({
  root: {
    color: infoColor[1],
    "&$checked": {
      color: successColor[1]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

function UserProfile(props) {
  const [state, setState] = React.useState({
    checkedG: true
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12}>
          <Card>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12}>
                  <TextField
                    select
                    label="Категория*"
                    value={" "}
                    onChange={() => null}
                    id='category'
                    helperText="Выберите категорию"
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem key={1} value={"Завтраки"}>
                      Завтраки
                    </MenuItem>
                    <MenuItem key={2} value={"Ужины"}>
                      Ужины
                    </MenuItem>
                    <MenuItem key={3} value={"Обеды"}>
                      Обеды
                    </MenuItem>
                  </TextField>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Наименование*"
                    id="name-product"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      // disabled: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Количество"
                    id="count"
                    type='number'
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Цена*"
                    id="price"
                    type='number'
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControlLabel
                    control={<CustomCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG"/>}
                    label="Активно?"
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA", margin: "20px 0 10px" }}>Детальне описание</InputLabel>
                  {props.children}
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>

        {/*<GridItem xs={12} sm={12} md={4}>*/}
        {/*  <Card profile>*/}
        {/*    <CardAvatar profile>*/}
        {/*      <a href="#pablo" onClick={e => e.preventDefault()}>*/}
        {/*        <img src={avatar} alt="..."/>*/}
        {/*      </a>*/}
        {/*    </CardAvatar>*/}
        {/*    <CardBody profile>*/}
        {/*      <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>*/}
        {/*      <h4 className={classes.cardTitle}>Alec Thompson</h4>*/}
        {/*      <p className={classes.description}>*/}
        {/*        Dont be scared of the truth because we need to restart the*/}
        {/*        human foundation in truth And I love you like Kanye loves Kanye*/}
        {/*        I love Rick Owens’ bed design but the back is...*/}
        {/*      </p>*/}
        {/*      <Button color="primary" round>*/}
        {/*        Follow*/}
        {/*      </Button>*/}
        {/*    </CardBody>*/}
        {/*  </Card>*/}
        {/*</GridItem>*/}

      </GridContainer>
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.any
};


export default withStyles(styles)(UserProfile);
