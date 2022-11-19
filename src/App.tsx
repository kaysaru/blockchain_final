import MenuAppBar from "./components/Navbar";
import { Outlet } from "react-router-dom";
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
      <Outlet/>
    </>
  );
}
