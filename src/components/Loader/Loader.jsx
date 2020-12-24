import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { BarLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;



const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: '100vh'
};

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
        {this.props.isStart
          ? <div style={style}>
            <BarLoader
              height={5}
              width={300}
              color={this.props.color}
              loading={this.state.loading}
            />
          </div>

          : <ClipLoader
            css={override}
            size={150}
            color={this.props.color}
            loading={this.state.loading}
          />
        }

      </div>
    );
  }
}

Loader.defaultProps = {
  color: "#26c6da"
};

Loader.propTypes = {
  color: PropTypes.string,
  isStart: PropTypes.bool
};

export default Loader;
