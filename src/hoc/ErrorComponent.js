import React, { Component } from "react";
import { Result, Button } from "antd";
import { NavLink } from "react-router-dom";
// import store from "../store";
// const DEV_ENV = "development";
//
// {
//   ComponentToWrap
//   // environment = process.env.NODE_ENV
// }

const CaptureError = (ComponentToWrap) =>
  class ErrorComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }

    displayName = "ErrorComponent";

    componentDidCatch(error, extra) {

      this.setState(previousState => ({
        ...previousState,
        error: { error, extra }
      }));
    }

    handleClickBack = () => {
      // eslint-disable-next-line react/prop-types
      if (this.props.toServerError) {
        console.log("test");
        // eslint-disable-next-line react/prop-types
        this.props.toServerError({ serverError: null });
      }
      this.setState({ error: null });
    };

    render() {
      const { error } = this.state;
      if (error !== null) {
        // return environment === DEV_ENV
        //   ? <DevError error={error}/>
        //   : <ErrorComponent/>;
        return (
          <Result
            status="500"
            title="500"
            subTitle="Что-то пошло не так, поробуйте снова!"
            extra={
              /* eslint-disable-next-line react/prop-types */
              <NavLink to={this.props.location.pathname}>
                <Button
                  type="primary"
                  onClick={this.handleClickBack}
                >
                  Вернуться обратно
                </Button>
              </NavLink>}
          />
        );
      }

      return <ComponentToWrap {...this.props} />;
    }
  };

export default CaptureError;
