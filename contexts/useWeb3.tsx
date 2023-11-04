"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import Web3 from "web3";

declare const ethereum: any;

interface IWeb3Context {
  web3: Web3 | null;
  walletRequired: boolean;
}

export const Web3Context = createContext<IWeb3Context>({
  web3: null,
  walletRequired: true,
});

export const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [walletRequired, setWalletRequired] = useState<boolean>(false);

  useEffect(() => {
    if (typeof ethereum !== "undefined") {
      //메타마스크가 있따면
      setWeb3(new Web3(ethereum));
      setWalletRequired(false);
    } else {
      console.log("metamask not installed ");
      setWalletRequired(true);
    }
  }, []);

  return (
    <Web3Context.Provider value={{ web3, walletRequired }}>
      {children}
    </Web3Context.Provider>
  );
};
