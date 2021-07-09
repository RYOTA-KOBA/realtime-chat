import React from "react";
import "./styles/App.css";
import { useSelector } from "react-redux";
import { getUsername } from "./reducks/chats/selectors";

import UsernameForm from "./components/UsernameForm";
import MessageForm from "./components/MessageForm";
import ChatList from "./components/ChatList";
import DisplayUsername from "./DisplayUsername";

const App: React.FC = () => {
  const selector = useSelector((state) => state);
  const username = getUsername(selector);

  return (
    <>
      <ChatList />
      <div style={{ display: "flex" }}>
        <DisplayUsername />
        {username !== "" ? <MessageForm /> : <UsernameForm />}
      </div>
    </>
  );
};

export default App;
