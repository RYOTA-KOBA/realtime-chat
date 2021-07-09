import { createSelector } from "reselect";
import { ChatsState, InitialChatsState } from "./types";

const chatsSelector = (state: InitialChatsState) => state.chats;

export const getUsername = createSelector(
  [chatsSelector],
  (state: ChatsState) => state.username
);

export const getMessage = createSelector(
  [chatsSelector],
  (state: ChatsState) => state.message
);

export const getCreatedAt = createSelector(
  [chatsSelector],
  (state: ChatsState) => state.created_at
);

export const fetchChatsdata = createSelector(
  [chatsSelector],
  (state: ChatsState) => state.chatsdata
);
