import {Container} from "@mui/material";
import { ChangeEvent } from "react";
import useCoinswap from "../hooks/useCoinswap";

export default function CoinswapPage() {
  const {buy, sell, amountAT3, setAmountAT3, amountETH, setAmountETH, balanceOfAT3, DexAT3Balance} = useCoinswap();
  // @ts-ignore
  // @ts-ignore
  return (
    <Container>

      <div>Your balance of AT3 - {balanceOfAT3}</div>
      <div>DEX balance of AT3 - {DexAT3Balance}</div>
      <div>
        here enter amount to swap
      </div>
      <div>
        Wei to AT3 (you are specifying wei amount that will be paid)
      </div>
      <div>
        <input type={'number'} value={amountAT3} onChange={(e) => setAmountAT3(e.target.value)}/>
      </div>
      <div>
        AT3 to Wei
      </div>
      <div>
        <input type={'number'} value={amountETH} onChange={(e) => setAmountETH(e.target.value)}/>
      </div>
      <div>
        <button type={"button"} onClick={buy}>buy AT3</button>
        <button type={"button"} onClick={e => sell(amountAT3)}>sell AT3</button>
      </div>
    </Container>
  )
}