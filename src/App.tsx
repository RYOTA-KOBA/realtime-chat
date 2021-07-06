import React, { useEffect, useState } from "react";
import "./App.css";
import { db, timestamp } from "./firebase";

const App: React.FC = () => {
  const [chatdata, setChatdata] = useState([]);
  // const [isMessageCreated, setIsMessageCreated] = useState(false);
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await db.collection("chats").add({
      message: formValue,
      created_at: timestamp,
    });
    setFormValue("");
  };

  useEffect(() => {
    let chats: any = [];
    db.collection("chats").onSnapshot((snapshots) => {
      snapshots.docChanges().forEach((change) => {
        const data = change.doc.data({ serverTimestamps: "estimate" });
        const changeType = change.type;

        switch (changeType) {
          case "added":
            chats.push({ ...data, id: change.doc.id });
            break;
          case "removed":
            chats = chats.filter((chat: any) => chat.id !== change.doc.id);
            break;
          default:
            break;
        }
      });
      setChatdata(chats);
    });
  }, [setChatdata]);

  return (
    <>
      {console.log(chatdata)}
      {chatdata &&
        chatdata.map((d: any) => (
          <ul key={d.id}>
            <li>{d.message}</li>
          </ul>
        ))}

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="メッセージを入力"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
};

export default App;
