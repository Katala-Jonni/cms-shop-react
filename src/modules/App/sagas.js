import { fork, takeLatest, put, call } from "redux-saga/effects";
import { loadApp, startApp } from "./actions";

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* loadApplication() {
  yield call(delay, 2000);
  const payload = {
    isLoad: true
  };
  return yield put(startApp(payload));
}

function* appWatcher() {
  yield takeLatest(loadApp, loadApplication);
}

export default function* () {
  yield fork(appWatcher);
  // console.log("App saga run");
}
