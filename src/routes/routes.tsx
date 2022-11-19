import App from "../App";
import NFTStake from "../pages/NFTStake";
import ErrorPage from "../pages/ErrorPage";
import CoinswapPage from "../pages/CoinswapPage";
import MintNFTPage from "../pages/MintNFTPage";

const routes = [
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "nftstake",
        element: <NFTStake/>,
      },
      {
        path: "coinswap",
        element: <CoinswapPage/>
      },
      {
        path: "mintnft",
        element: <MintNFTPage/>
      }
    ],
  },
  {
    path: '/nftstake',
    element: <NFTStake/>
  }
]

export default routes;