import {
  endChart,
  endDashboard
} from "./actions";

const getInitialState = () => {
  return {
    isLoadDashboard: false,
    dashboard: {
      countsOrder: 0,
      revenue: 0,
      newCustomers: 0,
      newReviews: 0,
      countChangeMailing: 0,
      mailing: [],
      orders: [],
      newOrders: []
    },
    chartRevenue: {},
    chartOrder: {},
    revenueCompare: {},
    orderCompare: {}
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
    case endChart.toString(): {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};
