import { createStore as reduxCreateStore, combineReducers } from "redux";
import { ChatsReducer } from "../chats/reducers";

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      chats: ChatsReducer,
    })
  );
}
