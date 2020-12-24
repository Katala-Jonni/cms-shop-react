import {
  getLoad, getServerError,
  loadApp
} from "../modules/App";

import { connect } from "react-redux";
import Admin from "./Admin";

const mapStateFromProps = state => ({
  isLoad: getLoad(state),
  serverError: getServerError(state)
});

const mapDispatchFromProps = {
  loadApp
};

export default connect(mapStateFromProps, mapDispatchFromProps)(Admin);
