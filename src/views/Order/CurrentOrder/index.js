import { connect } from "react-redux";
import CurrentOrder from "./CurrentOrder";
import {
  clearCurrentOrder,
  getOrderCurrent,
  getStatusCurrentOrder,
  startLoadCurrentOrder,
  startSaveCurrentOrder
} from "../../../modules/Order";


const mapStateFromProps = (state) => ({
  currentOrder: getOrderCurrent(state),
  statusCurrentOrder: getStatusCurrentOrder(state)
});

const mapDispatchFromProps = {
  startLoadCurrentOrder,
  startSaveCurrentOrder,
  clearCurrentOrder
};

export default connect(mapStateFromProps, mapDispatchFromProps)(CurrentOrder);
