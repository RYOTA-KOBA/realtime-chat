import React, { useEffect, useState } from "react";
import "./styles/App.css";
import { db } from "./firebase";
import { useSelector } from "react-redux";
import { getUsername } from "./reducks/chats/selectors";

import UsernameForm from "./components/UsernameForm";
import MessageForm from "./components/MessageForm";
import ChatList from "./components/ChatList";
import DisplayUsername from "./DisplayUsername";

type Chats = Partial<{
  id: string;
  created_at: number;
  username: string;
  message: string;
}>;

const App: React.FC = () => {
  const [chatdata, setChatdata] = useState<Chats[]>([]);
  const [isMessageCreated, setIsMessageCreated] = useState<boolean>(false);

  const selector = useSelector((state) => state);
  const username = getUsername(selector);

  useEffect(() => {
    let chats: any = [];
    db.collection("chats")
      .orderBy("created_at")
      .onSnapshot((snapshots) => {
        snapshots.docChanges().forEach((change) => {
          const data = change.doc.data({ serverTimestamps: "estimate" });
          const changeType = change.type;

          switch (changeType) {
            case "added":
              chats.push({ ...data, id: change.doc.id });
              setIsMessageCreated(true);
              break;
            case "removed":
              chats = chats.filter((chat: Chats) => chat.id !== change.doc.id);
              break;
            default:
              break;
          }
        });
        setChatdata(chats);
        setIsMessageCreated(false);
      });
  }, [setChatdata, setIsMessageCreated]);

  return (
    <>
      {chatdata &&
        chatdata.map((d: Chats) => (
          <ChatList
            key={d.id}
            username={d.username}
            message={d.message}
            created_at={d.created_at}
          />
        ))}
      <div style={{ display: "flex" }}>
        <DisplayUsername />
        {username !== "" ? <MessageForm /> : <UsernameForm />}
      </div>
    </>
  );
};

export default App;
