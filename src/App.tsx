import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";

const App: React.FC = () => {
  const [chatdata, setChatdata] = useState([]);

  useEffect(() => {
    let chats: any = [];
    db.collection("chats").onSnapshot((snapshots) => {
      snapshots.docChanges().forEach((change) => {
        const data = change.doc.data({ serverTimestamps: "estimate" });
        const changeType = change.type;

        switch (changeType) {
          case "added":
            chats.push(data);
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
    </>
  );
};

export default App;
