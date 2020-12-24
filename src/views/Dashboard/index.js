import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import { getLoadDashboard, startDashboard } from "../../modules/Dashboard";

const mapStateFromProps = (state) => ({
  isLoadDashboard: getLoadDashboard(state)
});

const mapDispatchFromProps = {
  startDashboard
};

export default connect(mapStateFromProps, mapDispatchFromProps)(Dashboard);
