import { fork } from "redux-saga/effects";
import { sagas as appSagas } from "./App";
import { sagas as dashboardSagas } from "./Dashboard";

export default function* rootSaga() {
  yield fork(appSagas);
  yield fork(dashboardSagas);
}
