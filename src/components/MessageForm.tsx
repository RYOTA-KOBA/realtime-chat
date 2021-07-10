import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../reducks/chats/operations";
import { getUsername } from "../reducks/chats/selectors";
import { InitialChatsState } from "../reducks/chats/types";
import { Wapper, Input, Button } from "./UsernameForm";

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
    <Wapper onSubmit={sendMessage}>
      <Input
        type="text"
        value={messageValue}
        onChange={inputMessage}
        placeholder="メッセージを入力"
      />

      <Button type="submit" disabled={!messageValue}>
        送信
      </Button>
    </Wapper>
  );
};

export default MessageForm;
