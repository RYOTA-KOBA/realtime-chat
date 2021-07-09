import { AnyAction } from "redux";
import * as Actions from "./actions";
import initialState from "../store/initialState";
import { ChatsState } from "./types";

export const ChatsReducer = (
  state: ChatsState = initialState.chats,
  action: AnyAction
): ChatsState => {
  switch (action.type) {
    case Actions.ADD_MESSAGE:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.ADD_USERNAME:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.FETCH_CHATS:
      return {
        ...state,
        chatsdata: action.payload,
      };
    default:
      return state;
  }
};
