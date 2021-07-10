import React from "react";
import styled from "styled-components";

interface Props {
  created_at: any;
}

const DisplayTime: React.FC<Props> = (props: Props) => {
  const date = new Date(props.created_at.seconds * 1000);
  const Time = date.toLocaleTimeString("ja-JP");

  return <TimeItem>{Time}</TimeItem>;
};

export default DisplayTime;

const TimeItem = styled.div`
  font-size: 13px;
  color: #868686;
`;
