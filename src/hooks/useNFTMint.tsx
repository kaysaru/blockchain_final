import React, {useEffect, useState} from "react";
import {Contract, providers, utils} from "ethers";
import {NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS} from "../../constants";
import useWeb3 from "./useWeb3";
import {JsonRpcSigner, Web3Provider} from "@ethersproject/providers";
import {Button, Typography} from "@mui/material";

import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';

export default function useNFTMint() {
  // presaleStarted keeps track of whether the presale has started or not
  const [presaleStarted, setPresaleStarted] = useState(false);
  // presaleEnded keeps track of whether the presale ended
  const [presaleEnded, setPresaleEnded] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // checks if the currently connected MetaMask wallet is the owner of the contract
  const [isOwner, setIsOwner] = useState(false);
  // tokenIdsMinted keeps track of the number of tokenIds that have been minted
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");

  const {
    getProviderOrSigner,
    connectWallet,
    walletConnected,
    setWalletConnected,
    web3ModalRef,
  } = useWeb3();

  async function presaleMint() {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
      const tx = await nftContract.presaleMint({
        // value signifies the cost of one crypto dev which is "0.01" eth.
        // We are parsing `0.01` string to ether using the utils library from ethers.js
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted an NFT!");
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * publicMint: Mint an NFT after the presale
   */
  async function publicMint() {
    try {
      const signer = await getProviderOrSigner(true);
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
      // call the mint from the contract to mint the Crypto Dev
      const tx = await nftContract.mint({
        value: utils.parseEther("0.01"),
      });
      setLoading(true);
      await tx.wait();
      setLoading(false);
      window.alert("You successfully minted a Crypto Dev!");
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * startPresale: starts the presale for the NFT Collection
   */
  const startPresale = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
      // call the startPresale from the contract
      const tx = await nftContract.startPresale();
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // set the presale started to true
      await checkIfPresaleStarted();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * checkIfPresaleStarted: checks if the presale has started by quering the `presaleStarted`
   * variable in the contract
   */
  async function checkIfPresaleStarted() {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
      const _presaleStarted = await nftContract.presaleStarted();
      if (!_presaleStarted) {
        await getOwner();
      }
      setPresaleStarted(_presaleStarted);
      return _presaleStarted;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  /**
   * checkIfPresaleEnded: checks if the presale has ended by quering the `presaleEnded`
   * variable in the contract
   */
  const checkIfPresaleEnded = async () => {
    try {
      const provider = await getProviderOrSigner();
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
      const _presaleEnded = await nftContract.presaleEnded();
      // _presaleEnded is a Big Number, so we are using the lt(less than function) instead of `<`
      // Date.now()/1000 returns the current time in seconds
      // We compare if the _presaleEnded timestamp is less than the current time
      // which means presale has ended
      const hasEnded = _presaleEnded.lt(Math.floor(Date.now() / 1000));
      if (hasEnded) {
        setPresaleEnded(true);
      } else {
        setPresaleEnded(false);
      }
      return hasEnded;
    } catch (err) {
      console.error(err);
      return false;
    }
  };


  /**
   * getOwner: calls the contract to retrieve the owner
   */
  async function getOwner() {
    try {
      const provider = await getProviderOrSigner() as Web3Provider;
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
      const _owner = await nftContract.owner();
      const signer = await getProviderOrSigner(true) as JsonRpcSigner;
      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getTokenIdsMinted: gets the number of tokenIds that have been minted
   */
  const getTokenIdsMinted = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // No need for the Signer here, as we are only reading state from the blockchain
      const provider = await getProviderOrSigner();
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const nftContract = new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
      // call the tokenIds from the contract
      const _tokenIds = await nftContract.tokenIds();
      //_tokenIds is a `Big Number`. We need to convert the Big Number to a string
      setTokenIdsMinted(_tokenIds.toString());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open

      connectWallet();

      // Check if presale has started and ended
      const _presaleStarted = checkIfPresaleStarted().then(r => {
        if (r) {
          checkIfPresaleEnded().then(a => a)
        }
      });

      getTokenIdsMinted().then(r => r);

      // Set an interval which gets called every 5 seconds to check presale has ended
      const presaleEndedInterval = setInterval(async function () {
        const _presaleStarted = await checkIfPresaleStarted();
        if (_presaleStarted) {
          const _presaleEnded = await checkIfPresaleEnded();
          if (_presaleEnded) {
            clearInterval(presaleEndedInterval);
          }
        }
      }, 5 * 1000);

      // set an interval to get the number of token Ids minted every 5 seconds
      setInterval(async function () {
        await getTokenIdsMinted();
      }, 5 * 1000);
    }
  }, [walletConnected]);

  const renderButton = () => {
    // If wallet is not connected, return a button which allows them to connect their wllet
    if (!walletConnected) {
      return (
        <Button variant="contained" size="large" endIcon={<SendIcon />} onClick={connectWallet}>
          Connect your wallet
        </Button>
      );
    }

    // If we are currently waiting for something, return a loading button
    if (loading) {
      return <Button variant="contained" size="large" endIcon={<CircularProgress color="secondary" />}>Loading...</Button>;
    }

    // If connected user is the owner, and presale hasnt started yet, allow them to start the presale
    if (isOwner && !presaleStarted) {
      return (
        <Button variant="contained" size="large" onClick={startPresale}>
          Start Presale!
        </Button>
      );
    }

    // If connected user is not the owner but presale hasn't started yet, tell them that
    if (!presaleStarted) {
      return (
        <Typography>
          Presale hasnt started!
        </Typography>
      );
    }

    // If presale started, but hasn't ended yet, allow for minting during the presale period
    if (presaleStarted && !presaleEnded) {
      return (
        <div>
          <Typography>
            Presale has started!!! If your address is whitelisted, Mint a Crypto
            Dev 🥳
          </Typography>
          <Button variant="contained" size="large" onClick={presaleMint}>
            Presale Mint 🚀
          </Button>
        </div>
      );
    }

    // If presale started and has ended, its time for public minting
    if (presaleStarted && presaleEnded) {
      return (
        <Button variant="contained" size="large" onClick={publicMint}>
          Public Mint 🚀
        </Button>
      );
    }
  };


  return {
    checkIfPresaleEnded,
    checkIfPresaleStarted,
    presaleMint,
    publicMint,
    startPresale,
    getOwner,
    getTokenIdsMinted,
    renderButton,

    isOwner,
    setIsOwner,
    loading,
    tokenIdsMinted,
    presaleEnded,
    presaleStarted
  }
}