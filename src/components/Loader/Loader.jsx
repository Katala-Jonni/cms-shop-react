import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  //border-color: red;
`;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <ClipLoader
          css={override}
          size={150}
          color={this.props.color}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

Loader.defaultProps = {
  color: '#26c6da'
};

Loader.propTypes = {
  color: PropTypes.string
};

export default Loader;
