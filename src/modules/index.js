import { fork } from "redux-saga/effects";
import { sagas as appSagas } from "./App";
import { sagas as dashboardSagas } from "./Dashboard";
import { sagas as orderSagas } from "./Order";

export default function* rootSaga() {
  yield fork(appSagas);
  yield fork(dashboardSagas);
  yield fork(orderSagas);
}
