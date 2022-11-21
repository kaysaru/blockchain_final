import MenuAppBar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import useWeb3 from "./hooks/useWeb3";

export default function Home() {
  const shouldRedirect = true;
  const {
    getProviderOrSigner,
    connectWallet,
    walletConnected,
    setWalletConnected,
    web3ModalRef,
  } = useWeb3();
  const location = useLocation();

  return (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  );
}
