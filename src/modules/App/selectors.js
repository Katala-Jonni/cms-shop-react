import { createSelector } from "reselect";

const getAdminState = state => state.app;

export const getLoad = createSelector(getAdminState, state => state.isLoad);
export const getServerError = createSelector(getAdminState, state => state.serverError);
