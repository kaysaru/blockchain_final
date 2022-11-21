import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import Core from "web3modal";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { providers } from "ethers";

export default function useWeb3() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef<Core>();

  function connectOnLoad() {
    web3ModalRef.current = new Web3Modal({
      network: "goerli",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    connectWallet().then((r) => r);
  }

  useEffect(() => {
    if (!walletConnected) {
      connectOnLoad();
    }
  }, []);

  async function connectWallet() {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   *
   * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
   *
   * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
   * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
   * request signatures from the user using Signer functions.
   *
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  async function getProviderOrSigner(
    needSigner = false
  ): Promise<Web3Provider | JsonRpcSigner> {
    const provider = await web3ModalRef.current?.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }
    if (needSigner) {
      return web3Provider.getSigner();
    }
    return web3Provider;
  }

  return {
    getProviderOrSigner,
    connectWallet,
    walletConnected,
    setWalletConnected,
    web3ModalRef,
    connectOnLoad,
  };
}
