import MenuAppBar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import useWeb3 from "./hooks/useWeb3";

export default function Home() {
  const {} = useWeb3();

  return (
    <>
      <MenuAppBar />
      <Outlet />
    </>
  );
}
