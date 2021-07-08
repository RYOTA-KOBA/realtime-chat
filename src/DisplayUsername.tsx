import React from "react";
import { useSelector } from "react-redux";
import { getUsername } from "./reducks/chats/selectors";

const DisplayUsername: React.FC = () => {
  const selector = useSelector((state) => state);
  const username = getUsername(selector);

  return <div>{username}</div>;
};

export default DisplayUsername;