import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../reducks/chats/operations";
import { getUsername } from "../reducks/chats/selectors";
import { InitialChatsState } from "../reducks/chats/types";

const MessageForm: React.FC = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: InitialChatsState) => state);
  const username = getUsername(selector);
  const [messageValue, setMessageValue] = useState<string>("");

  const inputMessage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessageValue(e.target.value);
    },
    [setMessageValue]
  );

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addMessage(messageValue, username));
    setMessageValue("");
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={messageValue}
        onChange={inputMessage}
        placeholder="メッセージを入力"
      />

      <button type="submit" disabled={!messageValue}>
        送信
      </button>
    </form>
  );
};

export default MessageForm;
