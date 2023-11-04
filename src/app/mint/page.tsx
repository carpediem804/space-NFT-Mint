"use client";
import { Button } from "@mui/material";
import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { MenuView, Title } from "../components";
import { PlanetList } from "../components/Planet/Planet";
import { SpaceContext } from "../../../contexts/useSpace";
import { Web3Context } from "../../../contexts/useWeb3";
import { useRouter } from "next/navigation";
import { usePlanetContract } from "../hooks/usePlanetContracts";
import BN from "bn.js";

const Container = styled.div`
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

const Description = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 100;
  color: #ffffff;
  text-align: center;
`;

const ButtonView = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Mint: NextPage = () => {
  const router = useRouter();
  const { showPlanet, clearPlanet } = useContext(SpaceContext);
  const [planetIndex, setPlanetIndex] = useState<number>(-1);
  const { web3 } = useContext(Web3Context);
  const { mintPlanet, totalSupply } = usePlanetContract(web3);

  const showRandomPlanet = () => {
    setPlanetIndex(Math.floor(Math.random() * PlanetList.length));
  };

  useEffect(() => {
    if (planetIndex >= 0) {
      showPlanet(PlanetList[planetIndex]);
      // console.log("PlanetList[planetIndex] : ", PlanetList[planetIndex]);
    }
    return () => clearPlanet();
  }, [clearPlanet, planetIndex, showPlanet]);

  useEffect(() => {
    const interval = setInterval(() => showRandomPlanet(), 1000);
    showRandomPlanet();
    return () => clearInterval(interval);
  }, []);

  const handleMintPlant = async () => {
    if (!web3) {
      return;
    }
    const accounts = await web3.eth.requestAccounts();
    // 내꺼는 세번째에 있다.

    const currentAccount = accounts[0];

    mintPlanet({
      from: currentAccount,
      value: web3.utils.toWei(new BN("10").toString(), "milliether"), //0.01 eth
    }).on("transactionHash", (txHash: string) => {
      router.push(`/mint/${txHash}`);
    });
  };

  return (
    <Container>
      <MenuView>
        <Title>CRYPTO SPACE</Title>
        <Description>
          You can mint a planet NFT by paying <b>0.01ETH</b>.
          <br />
          You will get a random planet.
          <br />
          Please press below button to mint!
        </Description>
        <ButtonView>
          <MenuButton
            variant="contained"
            size="large"
            onClick={handleMintPlant}
          >
            MINT PLANET
          </MenuButton>
          <MenuButton
            variant="outlined"
            size="large"
            onClick={() => router.back()}
          >
            GO PREVIOUS
          </MenuButton>
        </ButtonView>
      </MenuView>
    </Container>
  );
};

export default Mint;
