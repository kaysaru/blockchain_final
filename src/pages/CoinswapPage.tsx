import {
  AlertProps,
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import { forwardRef, SyntheticEvent, useState } from "react";
import useCoinswap from "../hooks/useCoinswap";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CoinswapPage() {
  const {
    buy,
    sell,
    amountAT3,
    setAmountAT3,
    amountETH,
    setAmountETH,
    balanceOfAT3,
    DexAT3Balance,
  } = useCoinswap();

  const [isAT3toETHSwapLoading, setAT3toETHSwapLoading] = useState(false);
  const [isETHtoAT3SwapLoading, setETHtoAT3SwapLoading] = useState(false);

  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);

  const handleCloseSuccess = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSuccess(false);
  };
  const handleCloseError = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setError(false);
  };

  const handleBuy = async () => {
    setETHtoAT3SwapLoading(true);
    await buy().then((r) => {
      if (r) setSuccess(true);
      else setError(true);
    });
    setETHtoAT3SwapLoading(false);
  };

  const handleSell = async (amountAT3: number) => {
    setAT3toETHSwapLoading(true);
    await sell(amountAT3).then((r) => {
      if (r) setSuccess(true);
      else setError(true);
    });
    setAT3toETHSwapLoading(false);
  };

  return (
    <Container disableGutters={false}>
      <Box sx={{ marginTop: "2em" }}>
        <Typography variant={"h5"} textAlign={"center"}>
          Your balance of AT3
        </Typography>
        <Typography
          variant={"h3"}
          textAlign={"center"}
          sx={{ margin: "1rem 0" }}
        >
          {balanceOfAT3}
        </Typography>
        <Typography variant={"h5"} textAlign={"center"}>
          DEX balance of AT3
        </Typography>
        <Typography
          variant={"h3"}
          textAlign={"center"}
          sx={{ margin: "1rem 0" }}
        >
          {DexAT3Balance}
        </Typography>
      </Box>
      <Divider sx={{ margin: "2em 0" }} />
      {/* @ts-ignore */}
      <Grid container spacing={2} align="center" alignItems="center">
        <Grid item xs={5}>
          <Paper
            elevation={2}
            sx={{
              height: "18em",
              padding: "2em 1em",
              width: "15em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h5"} textAlign={"center"}>
              Wei to AT3
            </Typography>
            <Divider />
            <Typography textAlign={"center"}>Wei to AT3</Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              textAlign={"center"}
            >
              More wei, more likely that transaction will permit
            </Typography>
            <TextField
              id="filled-basic"
              type={"number"}
              label="Enter AT3 to buy"
              variant="filled"
              value={amountAT3}
              onChange={(e) =>
                setAmountAT3(e.target.value as unknown as number)
              }
            />
            <LoadingButton
              loading={isETHtoAT3SwapLoading}
              variant="text"
              onClick={handleBuy}
            >
              Swap
            </LoadingButton>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Typography variant={"h4"}>
            <div>1 Wei</div>=<div>1 AT3</div>
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ justifyContent: "center" }}>
          <Paper
            elevation={2}
            sx={{
              height: "18em",
              padding: "2em 1em",
              width: "15em",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h5"} textAlign={"center"}>
              AT3 to Wei
            </Typography>
            <Divider />
            <Typography textAlign={"center"}>AT3 to ETH (or Wei)</Typography>
            <TextField
              id="filled-basic"
              type={"number"}
              label="Enter AT3 to sell"
              variant="filled"
              value={amountETH}
              onChange={(e) =>
                setAmountETH(e.target.value as unknown as number)
              }
            />
            <LoadingButton
              loading={isAT3toETHSwapLoading}
              variant="text"
              onClick={() => handleSell(amountETH)}
            >
              Swap
            </LoadingButton>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          Success! :)
        </Alert>
      </Snackbar>
      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          Error :(
        </Alert>
      </Snackbar>
    </Container>
  );
}
