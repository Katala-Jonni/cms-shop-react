import {
  clearCurrentOrder,
  clearOrder,
  endLoadCurrentOrder,
  endLoadOrder,
  endSaveCurrentOrder, endSearchOrder
} from "./actions";

const getInitialState = () => {
  return {
    isLoadOrder: false,
    orders: [],
    currentOrder: null,
    statusCurrentOrder: null
  };
};


const INIT_STATE = {
  ...getInitialState()
};

export default (state = INIT_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case endLoadOrder.toString(): {
      return {
        ...state,
        ...payload
      };
    }
    case endLoadCurrentOrder.toString(): {
      return {
        ...state,
        ...payload
      };
    }
    case endSaveCurrentOrder.toString(): {
      return {
        ...state,
        ...payload
      };
    }
    case clearOrder.toString(): {
      return {
        ...getInitialState()
      };
    }

    case clearCurrentOrder.toString(): {
      return {
        ...state,
        currentOrder: null,
        statusCurrentOrder: null
      };
    }
    case endSearchOrder.toString(): {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};
