import React, { HTMLAttributes } from "react";
import { styled } from "styled-components";

const TitleText = styled.div`
  margin-bottom: 24px;
  color: #eeeeee;
  font-size: 24px;
  text-align: center;
`;

export const Title = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <TitleText {...props}>{children}</TitleText>;
};
