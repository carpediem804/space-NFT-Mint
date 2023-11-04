import React, { HTMLAttributes } from "react";
import { styled } from "styled-components";

const View = styled.div`
  padding: 24px;
  border-radius: 12px;
  background: #8888885b;
  display: flex;
  flex-direction: column;
  width: 550px;
  margin-top: 140px;
  /* justify-content: center;
  align-items: center; */
`;

export const MenuView = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <View {...props}>{children}</View>;
};
