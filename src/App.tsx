import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";

const App: React.FC = () => {
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    db.collection("users")
      .get()
      .then((snapshots: any) => {
        const userArray: any = [];
        snapshots.docs.forEach((doc: any) => {
          const data = doc.data();
          userArray.push({
            id: doc.id,
            username: data.username,
            created_at: data.created_at,
          });
        });
        setUserdata(userArray);
      });
  }, []);

  return (
    <>
      {console.log(userdata)}
      {userdata &&
        userdata.map((d: any) => (
          <ul key={d.id}>
            <li>{d.username}</li>
          </ul>
        ))}
    </>
  );
};

export default App;
