import { fork, takeLatest, put, call } from "redux-saga/effects";
import { endDashboard, startDashboard } from "./actions";

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* startDashboardLoad() {
  yield call(delay, 100);
  return yield put(endDashboard({ isLoadDashboard: true }));
}

function* dashboardWatcher() {
  yield takeLatest(startDashboard, startDashboardLoad);
}

export default function* () {
  yield fork(dashboardWatcher);
  // console.log("Dashboard saga run");
};
