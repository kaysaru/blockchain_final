import { Contract, BigNumber } from "ethers";
import { useState } from "react";
import {
  NFT_STAKING_CONTRACT_ADDRESS,
  NFT_STAKING_CONTRACT_ABI,
} from "../../constants";
import { JsonRpcSigner } from "@ethersproject/providers";
import useWeb3 from "./useWeb3";

export default function useStake() {
  const [stakedTokens, setStakedTokens] = useState<[[string, BigNumber]]>();
  const [idToStake, setIdToStake] = useState<number>();
  const [idToWithdraw, setIdToWithdraw] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState(0);
  const { getProviderOrSigner } = useWeb3();

  async function stake(idToStake: number): Promise<boolean> {
    const signer = await getProviderOrSigner(true);
    let nftStakeContract = new Contract(
      NFT_STAKING_CONTRACT_ADDRESS,
      NFT_STAKING_CONTRACT_ABI,
      signer
    );
    try {
      let tx = await nftStakeContract.stake(idToStake);
      setLoading(true);
      let receipt = await tx.wait();
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async function withdraw(idToWithdraw: number): Promise<boolean> {
    const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
    let nftStakeContract = new Contract(
      NFT_STAKING_CONTRACT_ADDRESS,
      NFT_STAKING_CONTRACT_ABI,
      signer
    );

    try {
      setLoading(true);
      let tx = await nftStakeContract.withdraw(idToWithdraw);
      let receipt = await tx.wait();
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      console.error(e);
      return false;
    }
  }

  async function claimRewards() {
    const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
    let nftStakeContract = new Contract(
      NFT_STAKING_CONTRACT_ADDRESS,
      NFT_STAKING_CONTRACT_ABI,
      signer
    );
    try {
      setLoading(true);
      let tx = await nftStakeContract.claimRewards();
      let receipt = await tx.wait();
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  }

  async function availableRewards() {
    const signer = (await getProviderOrSigner(true)) as JsonRpcSigner;
    let nftStakeContract = new Contract(
      NFT_STAKING_CONTRACT_ADDRESS,
      NFT_STAKING_CONTRACT_ABI,
      signer
    );
    try {
      setLoading(true);
      setReward(
        (
          await nftStakeContract.availableRewards(await signer.getAddress())
        ).toNumber()
      );
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      setLoading(false);
      return false;
    }
  }

  async function getStakedTokens(): Promise<boolean> {
    const signer: JsonRpcSigner = (await getProviderOrSigner(
      true
    )) as JsonRpcSigner;
    let nftStakeContract: Contract = new Contract(
      NFT_STAKING_CONTRACT_ADDRESS,
      NFT_STAKING_CONTRACT_ABI,
      signer
    );

    try {
      setLoading(true);
      let st: [[string, BigNumber]] = await nftStakeContract.getStakedTokens(
        signer.getAddress()
      );
      setStakedTokens(st);
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      console.error(e);
      return false;
    }
  }

  return {
    getStakedTokens,
    setStakedTokens,
    withdraw,
    stake,
    stakedTokens,
    loading,
    idToStake,
    setIdToStake,
    idToWithdraw,
    setIdToWithdraw,
    claimRewards,
    availableRewards,
    reward,
  };
}
