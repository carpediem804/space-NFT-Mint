"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { styled } from "styled-components";
import { MenuView, Title } from "./components";
import { Button } from "@mui/material";
import Link from "next/link";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuButton = styled(Button)`
  margin: 4px 0;
  width: 100%;
`;

export default function Home() {
  return (
    <MainContainer>
      <MenuView>
        <Title>CRYPTO SPACE</Title>
        <Link href={"./mint"}>
          <MenuButton variant="outlined" size="large">
            Minting Your Own Planet
          </MenuButton>
        </Link>
        <Link href={"./list"}>
          <MenuButton variant="outlined" size="large">
            View All Plantes
          </MenuButton>
        </Link>
      </MenuView>
    </MainContainer>
  );
}
