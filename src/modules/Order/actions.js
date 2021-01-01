import { createAction } from "redux-actions";

export const startLoadOrder = createAction("@@Order/START_LOAD_ORDER");
export const endLoadOrder = createAction("@@Order/END_LOAD_ORDER");
export const startLoadCurrentOrder = createAction("@@Order/START_LOAD_CURRENT_ORDER");
export const endLoadCurrentOrder = createAction("@@Order/END_LOAD_CURRENT_ORDER");
export const startSaveCurrentOrder = createAction("@@Order/START_SAVE_CURRENT_ORDER");
export const endSaveCurrentOrder = createAction("@@Order/END_SAVE_CURRENT_ORDER");
export const clearOrder = createAction("@@Order/CLEAR_ORDER");
export const clearCurrentOrder = createAction("@@Order/CLEAR_CURRENT_ORDER");
export const startSearchOrder = createAction("@@Order/START_SEARCH_ORDER");
export const endSearchOrder = createAction("@@Order/END_SEARCH_ORDER");
