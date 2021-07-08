import { createSelector } from "reselect";

const chatsSelector = (state: any) => state.chats;

export const getUsername = createSelector(
  [chatsSelector],
  (state: any) => state.username
);

export const getMessage = createSelector(
  [chatsSelector],
  (state: any) => state.message
);

export const getCreatedAt = createSelector(
  [chatsSelector],
  (state: any) => state.created_at
);
