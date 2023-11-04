"use client";
import { Space } from "@/app/components/Space";
import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { SpaceContext, Web3Context } from "../../../contexts";
import { usePlanetContract } from "../hooks/usePlanetContracts";
import { styled } from "styled-components";
import { MenuView, Title } from "../components";
import Button from "@mui/material/Button";
import Metadata from "../components/MetaData/MetaData";
import { PlanetName } from "../components/Planet/Planet";
import { useRouter } from "next/navigation";

const Listview = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: white;
`;

const SwitchView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

const Counter = styled.div`
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 20px;
`;

const GoBackButton = styled(Button)`
  margin-top: 8px !important;
`;

const List: NextPage = () => {
  const router = useRouter();
  const { web3 } = useContext(Web3Context);
  const { totalSupply, tokenURI, ownerOf } = usePlanetContract(web3);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [nubmerOfTokens, setNumberOfTokens] = useState<number>(-1);

  const [owner, setOwner] = useState<string>("");

  const [metadataURI, setMetadatURI] = useState<string>("");

  const [metaData, setMetaData] = useState<any>();

  const { showPlanet, clearPlanet } = useContext(SpaceContext);

  useEffect(() => {
    if (web3) {
      (async () => {
        const total = await totalSupply();
        setNumberOfTokens(+total);
        if (currentIndex < nubmerOfTokens) {
          const tokenId = web3.utils.numberToHex(currentIndex);
          const uri = await tokenURI(+tokenId);
          const owner = await ownerOf(+tokenId);
          setMetadatURI(uri);
          setOwner(owner);
        }
      })();
    }
  }, [currentIndex, nubmerOfTokens, ownerOf, tokenURI, totalSupply, web3]);

  useEffect(() => {
    if (metadataURI) {
      (async () => {
        const metaQuery = await fetch(metadataURI);
        const metadata = await metaQuery.json();
        setMetaData(metadata);
      })();
    }
  }, [metadataURI]);

  useEffect(() => {
    if (metaData && metaData.planetType) {
      showPlanet(metaData.planetType as PlanetName);
    }
    return () => clearPlanet();
  }, [metaData]);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex <= nubmerOfTokens - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
      <Listview>
        <MenuView>
          <Title>Planet #{currentIndex}</Title>
          {metaData && (
            <Metadata owner={owner} properties={metaData.attributes} />
          )}
          <SwitchView>
            <Button
              variant="contained"
              size="large"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Prev
            </Button>
            {nubmerOfTokens > 0 && (
              <Counter>
                {currentIndex + 1} / {nubmerOfTokens}
              </Counter>
            )}
            <Button
              variant="contained"
              size="large"
              onClick={handleNext}
              disabled={currentIndex === nubmerOfTokens - 1}
            >
              Next
            </Button>
          </SwitchView>
          <GoBackButton onClick={() => router.back()}>GO PREVIOUS</GoBackButton>
        </MenuView>
      </Listview>
    </>
  );
};

export default List;
