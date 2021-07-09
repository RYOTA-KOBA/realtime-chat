import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { ChatsReducer } from "../chats/reducers";

const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      chats: ChatsReducer,
    }),
    applyMiddleware(thunk)
  );
};

export default createStore;
