import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import {
  getChartOrder,
  getChartRevenue,
  getDashboard,
  getLoadDashboard,
  getOrderCompare,
  getRevenueCompare,
  startChart,
  startChartOrder,
  startDashboard
} from "../../modules/Dashboard";

const mapStateFromProps = (state) => ({
  isLoadDashboard: getLoadDashboard(state),
  dashboard: getDashboard(state),
  chartRevenue: getChartRevenue(state),
  chartOrder: getChartOrder(state),
  revenueCompare: getRevenueCompare(state),
  orderCompare: getOrderCompare(state)
});

const mapDispatchFromProps = {
  startDashboard,
  startChart,
  startChartOrder
};

export default connect(mapStateFromProps, mapDispatchFromProps)(Dashboard);
