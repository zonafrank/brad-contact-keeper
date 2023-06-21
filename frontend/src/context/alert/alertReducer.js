import { REMOVE_ALERT, SET_ALERT } from "../types";

const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return state.concat(action.payload);
    case REMOVE_ALERT:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default alertReducer;
