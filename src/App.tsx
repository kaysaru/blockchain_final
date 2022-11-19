import React, {useState, useEffect, useRef} from "react";
import Container from "@mui/material/Container";
import MenuAppBar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Web3Modal from "web3modal";
import Core from "web3modal";
import {JsonRpcSigner, Web3Provider} from "@ethersproject/providers";
import {providers} from "ethers";
import useWeb3 from "./hooks/useWeb3";

export default function Home() {
  const {
    getProviderOrSigner,
    connectWallet,
    walletConnected,
    setWalletConnected,
    web3ModalRef,
  } = useWeb3();

  return (
    <>
      <MenuAppBar/>
      <Outlet></Outlet>
    </>
  );
}
