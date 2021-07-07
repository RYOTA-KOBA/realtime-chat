import React from "react";

type P = {
  sendUsername: (e: React.FormEvent<HTMLFormElement>) => void;
  inputUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  usernameValue: string;
};

const InputUsername: React.FC<P> = (props) => {
  return (
    <form onSubmit={props.sendUsername}>
      <input
        type="text"
        onChange={props.inputUsername}
        placeholder="名前を入力"
      />
      <button type="submit" disabled={!props.usernameValue}>
        ログイン
      </button>
    </form>
  );
};

export default InputUsername;
