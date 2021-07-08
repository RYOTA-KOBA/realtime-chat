import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addUsername } from "../reducks/chats/operations";

const InputUsername: React.FC = () => {
  const dispatch = useDispatch();
  const [usernameValue, setUsernameValue] = useState<string>("");

  const inputUsername = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsernameValue(e.target.value);
    },
    [setUsernameValue]
  );

  const sendUsername = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addUsername(usernameValue));
    setUsernameValue("");
  };

  return (
    <form onSubmit={sendUsername}>
      <input type="text" onChange={inputUsername} placeholder="名前を入力" />
      <button type="submit" disabled={!usernameValue}>
        ログイン
      </button>
    </form>
  );
};

export default InputUsername;
