import { BigNumberish, Contract, utils } from "ethers";
import {
  COINSWAP_CONTRACT_ABI,
  COINSWAP_CONTRACT_ADDRESS,
  ERC20_CONTRACT_ABI,
  ERC20_CONTRACT_ADDRESS,
} from "../../constants";
import useWeb3 from "./useWeb3";
import { useEffect, useState } from "react";
import { JsonRpcSigner } from "@ethersproject/providers";

export default function UseCoinswap() {
  const [isLoading, setLoading] = useState(false);
  const [amountAT3, setAmountAT3] = useState(0);
  const [amountETH, setAmountETH] = useState(0);
  const [balanceOfAT3, setBalanceOfAT3] = useState(0);
  const [DexAT3Balance, setDexAT3Balance] = useState(0);
  const { getProviderOrSigner } = useWeb3();

  useEffect(() => {
    fetchBalanceOfAT3().then((r) => r);
    getDexBalance().then((r) => setDexAT3Balance(r));
  });

  async function fetchBalanceOfAT3() {
    let signer: JsonRpcSigner = (await getProviderOrSigner(
      true
    )) as JsonRpcSigner;
    const contract = new Contract(
      ERC20_CONTRACT_ADDRESS,
      ERC20_CONTRACT_ABI,
      signer
    );
    let balance: BigNumberish = await contract.balanceOf(signer.getAddress());
    balance = utils.formatUnits(balance, 6) as unknown as number;
    setBalanceOfAT3(balance);
  }

  async function buy(): Promise<boolean> {
    setLoading(true);
    const signer = await getProviderOrSigner(true);
    let coinswapContract = new Contract(
      COINSWAP_CONTRACT_ADDRESS,
      COINSWAP_CONTRACT_ABI,
      signer
    );
    try {
      let tx = await coinswapContract.buy({
        gasPrice: `${amountAT3}`,
        gasLimit: "1000000",
      });
      await tx.wait();
      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      console.error(e);
      return false;
    }
  }

  async function sell(amount: number): Promise<boolean> {
    const signer = await getProviderOrSigner(true);
    let coinswapContract = new Contract(
      COINSWAP_CONTRACT_ADDRESS,
      COINSWAP_CONTRACT_ABI,
      signer
    );
    try {
      let tx = await coinswapContract.sell(amount);
      setLoading(true);
      tx.wait();
      setLoading(false);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async function getDexBalance(): Promise<number> {
    const signer = await getProviderOrSigner(true);
    const coinswapContract = new Contract(
      COINSWAP_CONTRACT_ADDRESS,
      COINSWAP_CONTRACT_ABI,
      signer
    );
    const erc20contract = new Contract(
      ERC20_CONTRACT_ADDRESS,
      ERC20_CONTRACT_ABI,
      signer
    );
    let balance: BigNumberish = await erc20contract.balanceOf(
      coinswapContract.address
    );
    balance = utils.formatUnits(balance, 6) as unknown as number;
    return balance;
  }

  return {
    buy,
    sell,
    isLoading,
    amountAT3,
    setAmountAT3,
    amountETH,
    setAmountETH,
    balanceOfAT3,
    DexAT3Balance,
  };
}
