import {Box, Button, Container, Divider, Grid, Paper, TextField, Typography} from "@mui/material";
import {ChangeEvent} from "react";
import useCoinswap from "../hooks/useCoinswap";

export default function CoinswapPage() {
  const {buy, sell, amountAT3, setAmountAT3, amountETH, setAmountETH, balanceOfAT3, DexAT3Balance} = useCoinswap();
  return (
    <Container disableGutters={false}>
      <Box sx={{marginTop: "2em"}}>
        <Typography variant={"h5"} textAlign={"center"}>Your balance of AT3</Typography>
        <Typography variant={"h3"} textAlign={"center"} sx={{margin: "1rem 0"}}>{balanceOfAT3}</Typography>
        <Typography variant={"h5"} textAlign={"center"}>DEX balance of AT3</Typography>
        <Typography variant={"h3"} textAlign={"center"} sx={{margin: "1rem 0"}}>{DexAT3Balance}</Typography>
      </Box>
      <Divider sx={{margin: "2em 0"}}/>
      <Grid container spacing={2} align="center" sx={{padding: "0"}}>
        <Grid item xs={5}>
          <Paper elevation={2} sx={{
            height: "18em",
            padding: "2em 1em",
            width: "15em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <Typography variant={"h5"} textAlign={"center"}>
              Wei to AT3
            </Typography>
            <Divider/>
            <Typography textAlign={"center"}>
              Wei to AT3
            </Typography>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom textAlign={"center"}>
              More wei, more likely that transaction will permit
            </Typography>
            <TextField id="filled-basic" type={"number"} label="filled" variant="filled" value={amountAT3}
                       onChange={(e) => setAmountAT3(e.target.value as unknown as number)}/>
            <Button variant="text" onClick={e => buy()}>Swap</Button>

          </Paper>
        </Grid>
        <Grid item xs={2}><Typography>1 Wei = 1</Typography></Grid>
        <Grid item xs={5} sx={{justifyContent: "center"}}>
          <Paper elevation={2} sx={{
            height: "18em",
            padding: "2em 1em",
            width: "15em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <Typography variant={"h5"} textAlign={"center"}>
              AT3 to Wei
            </Typography>
            <Divider/>
            <Typography textAlign={"center"}>
              AT3 to ETH (or Wei)
            </Typography>
            <TextField id="filled-basic" type={"number"} label="filled" variant="filled" value={amountETH}
                       onChange={(e) => setAmountETH(e.target.value as unknown as number)}/>
            <Button variant="text" onClick={e => sell(amountETH)}>Swap</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}