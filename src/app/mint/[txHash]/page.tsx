"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { SpaceContext, Web3Context } from "../../../../contexts";
import { usePlanetContract } from "@/app/hooks/usePlanetContracts";
import { PlanetName } from "@/app/components/Planet/Planet";
import { MenuView, Title } from "@/app/components";
import { Button, CircularProgress } from "@mui/material";
import Metadata from "@/app/components/MetaData/MetaData";

const TxView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const DownMenuView = styled(MenuView)`
  margin-top: 320px;
  align-items: center;
`;

const Description = styled.div`
  width: 100%;
  margin-top: 8px;
  text-align: center;
  color: #ccc;
`;

const Progress = styled(CircularProgress)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const GoPrevButton = styled(Button)`
  margin-top: 24px !important;
  width: 100%;
`;

type TxStatus = "PENDING" | "MINING" | "MINED" | "WRONG_TX";

const MintTx = () => {
  //   const router = useRouter();
  const txCode = usePathname().split("/")[2];
  const router = useRouter();
  //   console.log("tx hash ", txCode);

  const [status, setStatus] = useState<TxStatus>("PENDING");

  const { web3 } = useContext(Web3Context);
  const { contractAddress, tokenURI } = usePlanetContract(web3);
  const { showPlanet } = useContext(SpaceContext);
  const [metadata, setMetadata] = useState();
  const [owner, setOwner] = useState<string>("");
  const [tokenId, setTokenId] = useState<string | number>("");

  const checkTx = useCallback(async () => {
    if (web3 && txCode) {
      const receipt = await web3.eth.getTransactionReceipt(txCode);

      if (receipt) {
        // 민팅 된거 조회 해야한다

        const mintingEvent = receipt.logs.filter(
          (log) =>
            log.topics &&
            log.topics[0] ===
              web3.utils.sha3("Transfer(address,address,uint256)") // 실제 emit Transfer가 발생할때의 로그
        )[0]; //하나만 발생하기 때문에

        const isMintingTx =
          receipt.to.toLowerCase() === contractAddress.toLowerCase() &&
          mintingEvent;

        if (isMintingTx) {
          const tokenId = mintingEvent.topics[3];
          setTokenId(web3.utils.hexToNumber(tokenId));

          // meta data 가져오기
          const uri = await tokenURI(Number(tokenId));
          const metaDataQuery = await fetch(uri);

          const metaData = await metaDataQuery.json();
          console.log("metadata", metaData);
          setMetadata(metaData);
          const owner = mintingEvent.topics[2]; //총 80자
          setOwner(owner.slice(-40));

          const planetType = metaData.planetType as PlanetName;
          showPlanet(planetType);
          setStatus("MINED");
        }
      } else {
        setStatus("MINING");
      }
    }
  }, [web3, txCode, contractAddress, tokenURI, showPlanet]);

  useEffect(() => {
    if (status === "PENDING") {
      checkTx();
      return;
    } else if (status === "MINING") {
      const interval = setInterval(() => checkTx(), 5000);
      return () => clearInterval(interval);
    }
  }, [checkTx, status]);

  return (
    <TxView>
      <DownMenuView>
        {status === "MINING" && (
          <>
            <Progress />
            <Description>Wait until Transaction is mined ...</Description>
          </>
        )}
        {status === "WRONG_TX" && (
          <>
            <Title>Wrong Transaction</Title>
            <Description>It{"'"}s not a mining Transaction</Description>
          </>
        )}
        {status === "MINED" && (
          <>
            <Title>Planet #{tokenId}</Title>
            <Metadata owner={owner} properties={metadata.attributes} />
          </>
        )}
        {status !== "PENDING" && status !== "MINING" && (
          <GoPrevButton
            variant="contained"
            size="large"
            onClick={() => router.back()}
          >
            Go PREVIOUS
          </GoPrevButton>
        )}
      </DownMenuView>
    </TxView>
  );
};

export default MintTx;
