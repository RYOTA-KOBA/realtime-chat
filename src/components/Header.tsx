import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getUsername } from "../reducks/chats/selectors";
import { InitialChatsState } from "../reducks/chats/types";

export const Header: React.FC = () => {
  const selector = useSelector((state: InitialChatsState) => state);
  const username = getUsername(selector);

  return (
    <Wrapper>
      <h1>Chat App</h1>
      {username && (
        <ItemRight>
          <ItemRightUserName>{username}</ItemRightUserName>
          <br />
          <ItemRightSpan>でログイン中</ItemRightSpan>
        </ItemRight>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  max-width: 708px;
  width: 100%;
  position: fixed;
  height: 8vh;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fffffe;
  top: 0;

  & h1 {
    color: #2b2c34;
    margin: 0;
  }
`;
const ItemRight = styled.div`
  max-width: 35%;
  padding-right: 20px;
  overflow-wrap: break-word;
`;
const ItemRightUserName = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #e45858;
`;
const ItemRightSpan = styled.span`
  font-size: 14px;
  color: #868686;
`;
