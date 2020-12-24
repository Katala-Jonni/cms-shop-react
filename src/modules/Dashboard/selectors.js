import { createSelector } from "reselect";

const getMasterState = state => state.dashboard;

export const getLoadDashboard = createSelector(getMasterState, state => state.isLoadDashboard);
