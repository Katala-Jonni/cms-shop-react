import { createSelector } from "reselect";

const getOrderState = state => state.order;

export const getOrders = createSelector(getOrderState, state => state.orders);
export const getIsLoadOrder = createSelector(getOrderState, state => state.isLoadOrder);
export const getOrderCurrent = createSelector(getOrderState, state => state.currentOrder);
export const getStatusCurrentOrder = createSelector(getOrderState, state => state.statusCurrentOrder);
