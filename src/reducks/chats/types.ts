import { Action } from "redux";

export interface Chats {
  id: string;
  username: string;
  message: string;
  created_at: number;
}

export interface ChatsAction extends Action {
  type: string;
  payload: Chats;
}

export interface ChatsState {
  id: string;
  username: string;
  message: string;
  created_at: number;
  chatsdata: Chats[];
}

export interface InitialChatsState {
  chats: ChatsState;
}
