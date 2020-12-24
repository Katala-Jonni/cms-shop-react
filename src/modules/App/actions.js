import { createAction } from "redux-actions";

export const loadApp = createAction("@@App/LOAD_APP");
export const startApp = createAction("@@App/START_APP");
export const toServerError = createAction("@@App/TO_SERVER_ERROR");
