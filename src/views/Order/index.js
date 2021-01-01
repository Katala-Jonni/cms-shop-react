import { connect } from "react-redux";
import Order from "./Order";
import {
  clearOrder,
  getIsLoadOrder,
  getOrders,
  startLoadOrder,
  startSearchOrder
} from "../../modules/Order";

const mapStateFromProps = (state) => ({
  orders: getOrders(state),
  isLoadOrder: getIsLoadOrder(state)
});

const mapDispatchFromProps = {
  startLoadOrder,
  clearOrder,
  startSearchOrder
};

export default connect(mapStateFromProps, mapDispatchFromProps)(Order);
