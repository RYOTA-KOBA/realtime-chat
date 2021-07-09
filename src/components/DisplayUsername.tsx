import React from "react";
import { useSelector } from "react-redux";
import { getUsername } from "../reducks/chats/selectors";
import { InitialChatsState } from "../reducks/chats/types";

const DisplayUsername: React.FC = () => {
  const selector = useSelector((state: InitialChatsState) => state);
  const username = getUsername(selector);

  return <div>{username}</div>;
};

export default DisplayUsername;
