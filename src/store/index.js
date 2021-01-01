import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../modules";
import app from "../modules/App";
import dashboard from "../modules/Dashboard";
import order from "../modules/Order";
import { reducer as formReducer } from "redux-form";

const sagaMiddleware = createSagaMiddleware();

const mainReducer = combineReducers({
  app,
  dashboard,
  order,
  form: formReducer
});

const composeEnhancers = typeof window === "object"
&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);
const store = createStore(mainReducer, enhancer);
sagaMiddleware.run(rootSaga);

export default store;
