import { createSelector } from "reselect";

const getMasterState = state => state.dashboard;

export const getLoadDashboard = createSelector(getMasterState, state => state.isLoadDashboard);
export const getDashboard = createSelector(getMasterState, state => state.dashboard);
export const getChartRevenue = createSelector(getMasterState, state => state.chartRevenue);
export const getChartOrder = createSelector(getMasterState, state => state.chartOrder);
export const getRevenueCompare = createSelector(getMasterState, state => state.revenueCompare);
export const getOrderCompare = createSelector(getMasterState, state => state.orderCompare);
