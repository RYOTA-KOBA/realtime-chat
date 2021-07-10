import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addUsername } from "../reducks/chats/operations";
import styled from "styled-components";

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
    <Wapper onSubmit={sendUsername}>
      <Input type="text" onChange={inputUsername} placeholder="名前を入力" />
      <Button type="submit" disabled={!usernameValue}>
        ログイン
      </Button>
    </Wapper>
  );
};

export default InputUsername;

export const Wapper = styled.form`
  height: 10vh;
  position: fixed;
  bottom: 0;
  background-color: #181717;
  width: 100%;
  max-width: 728px;
  display: flex;
`;

export const Input = styled.input`
  width: 70%;
  font-size: 1rem;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

export const Button = styled.button`
  width: 30%;
  background-color: #6246ea;
  ${(props) => props.disabled && DisabledCss};
  color: #fffffe;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
`;

const DisabledCss = `
  opacity: 0.7;
  background-color: #7e68ea;
`;
