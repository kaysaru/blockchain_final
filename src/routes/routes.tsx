import App from "../App";
import NFTStake from "../pages/NFTStake";
import ErrorPage from "../pages/ErrorPage";
import CoinswapPage from "../pages/CoinswapPage";
import MintNFTPage from "../pages/MintNFTPage";
import Index from "../pages/Index";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "index",
        element: <Index />,
      },
      {
        path: "nftstake",
        element: <NFTStake />,
      },
      {
        path: "coinswap",
        element: <CoinswapPage />,
      },
      {
        path: "mintnft",
        element: <MintNFTPage />,
      },
    ],
  },
];

export default routes;
