import React from "react";

interface Props {
  created_at: any;
}

const DisplayTime: React.FC<Props> = (props: Props) => {
  const date = new Date(props.created_at.seconds * 1000);
  const Time = date.toLocaleTimeString("ja-JP");

  return <div>{Time}</div>;
};

export default DisplayTime;
