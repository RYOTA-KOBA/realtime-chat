import * as Actions from "./actions";
import initialState from "../store/initialState";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ChatsReducer = (state = initialState.chats, action) => {
  switch (action.type) {
    case Actions.ADD_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
