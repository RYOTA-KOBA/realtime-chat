import React, { useEffect, useState, useCallback } from "react";
import "./styles/App.css";
import { db, timestamp } from "./firebase";

import UsernameForm from "./components/UsernameForm";
import MessageForm from "./components/MessageForm";
import ChatList from "./components/ChatList";

type Chats = Partial<{
  id: string;
  created_at: number;
  username: string;
  message: string;
}>;

const App: React.FC = () => {
  const [chatdata, setChatdata] = useState<Chats[]>([]);
  const [isMessageCreated, setIsMessageCreated] = useState<boolean>(false);
  const [messageValue, setMessageValue] = useState<string>("");
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const inputMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessageValue(e.target.value);
    },
    [setMessageValue]
  );

  const inputUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsernameValue(e.target.value);
    },
    [setUsernameValue]
  );

  const sendUsername = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUsername(usernameValue);
    setUsernameValue("");
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username) {
      await db.collection("chats").add({
        message: messageValue,
        created_at: timestamp,
        username: username,
      });
    }
    setMessageValue("");
  };

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
      {console.log(chatdata)}
      {chatdata &&
        chatdata.map((d: Chats) => (
          <ChatList
            key={d.id}
            username={d.username}
            message={d.message}
            created_at={d.created_at}
          />
        ))}
      {username !== "" ? (
        <MessageForm
          sendMessage={sendMessage}
          inputMessage={inputMessage}
          messageValue={messageValue}
        />
      ) : (
        <UsernameForm
          sendUsername={sendUsername}
          inputUsername={inputUsername}
          usernameValue={usernameValue}
        />
      )}
    </>
  );
};

export default App;
