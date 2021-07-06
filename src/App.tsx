import React, { useEffect, useState } from "react";
import "./App.css";
import { db, timestamp } from "./firebase";

const App: React.FC = () => {
  const [chatdata, setChatdata] = useState([]);
  const [isMessageCreated, setIsMessageCreated] = useState(false);
  const [formValue, setFormValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [username, setUsername] = useState("");

  const sendUsername = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUsername(usernameValue);
    setUsernameValue("");
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username) {
      await db.collection("chats").add({
        message: formValue,
        created_at: timestamp,
        username: username,
      });
    }
    setFormValue("");
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
              chats = chats.filter((chat: any) => chat.id !== change.doc.id);
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
        chatdata.map((d: any) => (
          <ul key={d.id}>
            <li>
              <span>{d.username}</span>
              &nbsp;
              {d.message}
            </li>
          </ul>
        ))}
      {username !== "" ? (
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="メッセージを入力"
          />

          <button type="submit" disabled={!formValue}>
            送信
          </button>
        </form>
      ) : (
        <form onSubmit={sendUsername}>
          <input
            type="text"
            onChange={(e) => setUsernameValue(e.target.value)}
            placeholder="名前を入力"
          />
          <button type="submit" disabled={!usernameValue}>
            ログイン
          </button>
        </form>
      )}
    </>
  );
};

export default App;
