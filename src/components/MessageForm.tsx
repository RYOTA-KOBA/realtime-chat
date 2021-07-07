import React from "react";

type P = {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  inputMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  messageValue: string;
};

const MessageForm: React.FC<P> = (props: P) => {
  return (
    <form onSubmit={props.sendMessage}>
      <input
        type="text"
        value={props.messageValue}
        onChange={props.inputMessage}
        placeholder="メッセージを入力"
      />

      <button type="submit" disabled={!props.messageValue}>
        送信
      </button>
    </form>
  );
};

export default MessageForm;
