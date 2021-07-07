import React from "react";

type Props = Partial<{
  username: string;
  message: string;
  created_at: number;
}>;

const ChatList: React.FC<Props> = (props: Props) => {
  return (
    <ul>
      <li>
        <span>{props.username}</span>
        &nbsp;
        {props.message}
      </li>
    </ul>
  );
};

export default ChatList;
