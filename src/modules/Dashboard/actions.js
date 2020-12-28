import { createAction } from "redux-actions";

export const startDashboard = createAction("@@Dashboard/START_DASHBOARD");
export const endDashboard = createAction("@@Dashboard/END_DASHBOARD");
export const startChart = createAction("@@Dashboard/START_CHART");
export const endChart = createAction("@@Dashboard/END_CHART");
export const startChartOrder = createAction("@@Dashboard/START_CHART_ORDER");
export const endChartOrder = createAction("@@Dashboard/END_CHART_ORDER");
