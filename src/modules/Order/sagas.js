import { fork, takeLatest, put, call } from "redux-saga/effects";
import {
  endLoadCurrentOrder,
  endLoadOrder,
  endSaveCurrentOrder, endSearchOrder,
  startLoadCurrentOrder,
  startLoadOrder,
  startSaveCurrentOrder, startSearchOrder
} from "./actions";
import { getOrders, getSearchOrder, order, orderMap } from "../../views/Order/utils";

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* startLoad() {
  yield call(delay, 100);
  const payload = {
    isLoadOrder: true,
    orders: getOrders(orderMap)
  };
  yield put(endLoadOrder(payload));
}

function* startLoadCurrent(action) {
  yield call(delay, 100);
  const target = order.find(o => o.id === action.payload.id);
  const payload = {
    currentOrder: target,
    statusCurrentOrder: target.status.toLowerCase()
  };
  yield put(endLoadCurrentOrder(payload));
}

function* startSaveCurrent(action) {
  yield call(delay, 100);
  const [first, ...other] = action.payload.status.slice();
  const currentOrder = { ...action.payload.currentOrder };
  currentOrder.status = `${first.toUpperCase()}${other.join("")}`;
  const indexCurrentOrder = orderMap.findIndex(el => el.id === currentOrder.id);
  orderMap[indexCurrentOrder] = currentOrder;
  const payload = {
    orders: getOrders(orderMap),
    currentOrder,
    statusCurrentOrder: currentOrder.status.toLowerCase()
  };
  yield put(endSaveCurrentOrder(payload));
}

function* searchOrder(action) {
  const { payload } = action;
  if (payload.value) {
    const orders = getSearchOrder(payload.value);
    yield put(endSearchOrder({ orders: getOrders(orders) }));
  } else {
    yield call(startLoad);
  }
}

function* orderWatcher() {
  yield takeLatest(startLoadOrder, startLoad);
  yield takeLatest(startLoadCurrentOrder, startLoadCurrent);
  yield takeLatest(startSaveCurrentOrder, startSaveCurrent);
  yield takeLatest(startSearchOrder, searchOrder);
}

export default function* () {
  yield fork(orderWatcher);
  console.log("Order saga run");
};
