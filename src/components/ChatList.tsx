import React, { useEffect, useRef } from "react";
import { fetchChatsdata, getUsername } from "../reducks/chats/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../reducks/chats/operations";
import { InitialChatsState } from "../reducks/chats/types";
import DisplayTime from "./DisplayTime";
import styled from "styled-components";

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
  const username = getUsername(selector);
  const scrollToBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  //メッセージ入力時に自動でスクロール
  if (scrollToBottom && scrollToBottom.current) {
    scrollToBottom.current.scrollIntoView({ block: "end", behavior: "smooth" });
  }

  return (
    <Wrapper>
      <List>
        {chatsdata &&
          chatsdata.map((chat: Chats) =>
            username === chat.username ? (
              <OwnListItem key={chat.id}>
                <OwnMessage>{chat.message}</OwnMessage>
                <DisplayTime created_at={chat.created_at} />
              </OwnListItem>
            ) : (
              <ListItem key={chat.id}>
                <Username>{chat.username}</Username>
                <Message>{chat.message}</Message>
                <DisplayTime created_at={chat.created_at} />
              </ListItem>
            )
          )}
        <div ref={scrollToBottom} />
      </List>
    </Wrapper>
  );
};

export default ChatList;

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const List = styled.ul`
  padding: 0 10px;
  height: 80vh;
  margin: 10vh 0;
  overflow-y: scroll;
  background: #d1d1e9;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e45858;
  }
  &::-webkit-scrollbar-track {
    background-color: #d1d1e9;
  }
`;
const ListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  & div {
    margin-top: auto;
    margin-bottom: 12px;
    margin-left: 5px;
  }
  &:first-child {
    margin-top: 15px;
  }
`;
const OwnListItem = styled.li`
  justify-content: flex-end;
  text-align: center;

  list-style: none;
  display: flex;
  align-items: center;
  & div {
    margin-top: auto;
    margin-bottom: 12px;
    margin-left: 5px;
  }
  &:first-child {
    margin-top: 15px;
  }
`;
const Username = styled.p`
  color: #555555;
  width: 10%;
  max-width: 10%;
  overflow-wrap: break-word;
  margin-top: 12px;
  margin-right: 5px;
  margin-bottom: 12px;
`;
const Message = styled.p`
  color: #000000;
  margin-top: 12px;
  margin-bottom: 12px;
  padding: 10px 20px;
  line-height: 24px;
  border-radius: 25px;
  background: #fffffe;
  max-width: 60%;
  overflow-wrap: break-word;
`;
const OwnMessage = styled.p`
  color: #000000;
  margin-top: 12px;
  margin-bottom: 12px;
  padding: 10px 20px;
  line-height: 24px;
  border-radius: 25px;
  background: #8bc34a;
  max-width: 60%;
  overflow-wrap: break-word;
`;
