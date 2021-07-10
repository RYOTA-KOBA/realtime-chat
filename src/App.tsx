import React from "react";
import "./styles/App.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getUsername } from "./reducks/chats/selectors";
import { InitialChatsState } from "./reducks/chats/types";

import UsernameForm from "./components/UsernameForm";
import MessageForm from "./components/MessageForm";
import ChatList from "./components/ChatList";
import { Header } from "./components/Header";

const App: React.FC = () => {
  const selector = useSelector((state: InitialChatsState) => state);
  const username = getUsername(selector);

  return (
    <Wrapper>
      <Header />
      <ChatList />
      {username !== "" ? <MessageForm /> : <UsernameForm />}
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  max-width: 728px;
  margin: 0 auto;
`;
