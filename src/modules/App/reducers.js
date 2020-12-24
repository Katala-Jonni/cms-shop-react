import {
  startApp, toServerError
} from "./actions";

const getInitialState = () => {
  return {
    isLoad: false,
    serverError: null
  };
};

const initialState = {
  ...getInitialState()
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  // console.log("payload", payload, action);
  switch (type) {
    case startApp.toString():
      return {
        ...state,
        ...payload
      };
    case toServerError.toString():
      return {
        ...state,
        ...payload
      };
    default: {
      return state;
    }
  }
};
