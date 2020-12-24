import {
  endLoadCatalog
} from "./actions";

const getInitialState = () => {
  return {};
};


const INIT_STATE = {
  ...getInitialState()
};

export default (state = INIT_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case endLoadCatalog.toString(): {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};
