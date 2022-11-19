import {useState, useEffect, useRef, SyntheticEvent, forwardRef} from "react";
import {BigNumber} from "ethers";
import useStake from "../hooks/useStake";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const zero = BigNumber.from(0);

  const {
    stake,
    getStakedTokens,
    setStakedTokens,
    stakedTokens,
    loading,
    setIdToStake,
    idToStake,
    withdraw,
    idToWithdraw,
    setIdToWithdraw,
    claimRewards,
    availableRewards,
    reward,
  } = useStake();

  const [open, setOpen] = useState(false);

  async function handleGetStakedTokens() {
    let success = getStakedTokens();
    // @ts-ignore
    setStakedTokens([]);
    if (await success) setOpen(true);
  }

  async function handleClaimRewards() {
    let success = await claimRewards();
    if (success) setOpen(true);
  }

  async function handleStake() {
    let success = await stake(idToStake!);
    if (success) setOpen(true);
  }

  async function handleWithdraw() {
    let success = await withdraw(idToWithdraw!);
    if (success) setOpen(true);
  }

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function handleCheckRewards() {
    let success = await availableRewards();
    if (await success) setOpen(true);
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3">
        Here you can stake our "CryptoDevs" NFT
      </Typography>
      <Divider sx={{margin: "20px 0"}}/>
      <Box>
        <Typography variant="h5">Claim Rewards</Typography>
        <Button variant="contained" onClick={handleClaimRewards}>
          Claim rewards
        </Button>
        <Button variant="contained" onClick={handleCheckRewards}>
          Check rewards
        </Button>
        <Typography variant="h6">{reward != undefined && reward}</Typography>
      </Box>
      <Divider sx={{margin: "20px 0"}}/>
      <Box>
        <Typography variant="h5">Stake</Typography>
        <TextField
          label="Enter token ID to stake"
          variant="filled"
          value={idToStake}
          onChange={(e) => setIdToStake(e.target.value as unknown as number)}
        />
        <Button variant="contained" onClick={handleStake}>
          Stake token
        </Button>
      </Box>
      <Divider sx={{margin: "20px 0"}}/>
      <Box>
        <Typography variant="h5">Withdraw</Typography>
        <TextField
          label="Enter token ID to withdraw"
          variant="filled"
          value={idToWithdraw}
          onChange={(e) => setIdToWithdraw(e.target.value as unknown as number)}
        />
        <Button variant="contained" onClick={handleWithdraw}>
          Withdraw token
        </Button>
      </Box>
      <Divider sx={{margin: "20px 0"}}/>
      <Box>
        <Typography variant="h5">Check staked tokens</Typography>
        <Button variant="contained" onClick={handleGetStakedTokens}>
          Get staked tokens
        </Button>
        <List>
          {stakedTokens &&
            stakedTokens.map((e: any) => {
              return (
                <ListItem>
                  <ListItemText>
                    <div>Owner: {e[0]}</div>
                    <div>Token ID: {e[1].toNumber()}</div>
                  </ListItemText>
                </ListItem>
              );
            })}
        </List>
        <div>{loading && <CircularProgress/>}</div>
      </Box>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={"success"}
          sx={{width: "100%"}}
        >
          Success!
        </Alert>
      </Snackbar>
    </Container>
  );
}
