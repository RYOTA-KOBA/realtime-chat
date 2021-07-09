import { Chats, ChatsAction } from "./types";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const addMessageAction = (chatState: Chats): ChatsAction => {
  return {
    type: "ADD_MESSAGE",
    payload: {
      id: chatState.id,
      username: chatState.username,
      message: chatState.message,
      created_at: chatState.created_at,
    },
  };
};

export const ADD_USERNAME = "ADD_USERNAME";
export const addUsernameAction = (chatState: Chats): ChatsAction => {
  return {
    type: "ADD_USERNAME",
    payload: {
      id: "",
      username: chatState.username,
      message: "",
      created_at: Number(null),
    },
  };
};

export const FETCH_CHATS = "FETCH_CHATS";
export const fetchChatsAction = (chatsdata: Chats): ChatsAction => {
  return {
    type: "FETCH_CHATS",
    payload: chatsdata,
  };
};
