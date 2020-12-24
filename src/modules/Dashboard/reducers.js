import {
  endDashboard
} from "./actions";

const getInitialState = () => {
  return {
    isLoadDashboard: false,
    dashBoard: {
      countsOrder: 10,
      revenue: 100000,
      newCustomers: 58,
      newReviews: 85,
      countChangeMailing: 49,
      revenues: [],
      mailing: [],
      orders: []
    }
  };
};


const INIT_STATE = {
  ...getInitialState()
};


export default (state = INIT_STATE, action) => {
  const { payload, type } = action;
  // console.log("Dashboard reducer", payload);
  switch (type) {
    case endDashboard.toString(): {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};
