import React, { useEffect } from "react";
import { fetchChatsdata, getCreatedAt } from "../reducks/chats/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../reducks/chats/operations";
import { InitialChatsState } from "../reducks/chats/types";
import DisplayTime from "./DisplayTime";

type Chats = Partial<{
  id: string;
  created_at: number;
  username: string;
  message: string;
}>;

const ChatList: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: InitialChatsState) => state);
  const chatsdata = fetchChatsdata(selector);

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  return (
    <>
      <ul>
        {chatsdata &&
          chatsdata.map((chat: Chats) => (
            <li key={chat.id}>
              {chat.username}: {chat.message}
              <DisplayTime created_at={chat.created_at} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default ChatList;
