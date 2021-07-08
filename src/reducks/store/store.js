import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { ChatsReducer } from "../chats/reducers";

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      chats: ChatsReducer,
    }),
    applyMiddleware(thunk)
  );
}
