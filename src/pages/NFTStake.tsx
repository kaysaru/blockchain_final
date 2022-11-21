import { useState, SyntheticEvent, forwardRef } from "react";
import useStake from "../hooks/useStake";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiAlert from "@mui/material/Alert";
import {
  TextField,
  ListItemText,
  ListItem,
  Divider,
  List,
  Typography,
  Snackbar,
  Container,
  Paper,
  Grid,
  AlertProps,
} from "@mui/material";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const {
    stake,
    getStakedTokens,
    stakedTokens,
    setIdToStake,
    idToStake,
    withdraw,
    idToWithdraw,
    setIdToWithdraw,
    claimRewards,
    availableRewards,
    reward,
  } = useStake();

  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [isClaimRewardLoading, setClaimRewardLoading] = useState(false);
  const [isCheckRewardLoading, setCheckRewardLoading] = useState(false);
  const [isStakeLoading, setStakeLoading] = useState(false);
  const [isWithdrawLoading, setWithdrawLoading] = useState(false);
  const [isCheckStakedLoading, setCheckStakedLoading] = useState(false);

  async function handleCheckRewards() {
    setCheckRewardLoading(true);
    await availableRewards().then((success) => {
      if (success) setSuccess(true);
      else setError(true);
    });
    setCheckRewardLoading(false);
  }

  async function handleClaimRewards() {
    setClaimRewardLoading(true);
    await claimRewards().then((success) => {
      if (success) setSuccess(true);
      else setError(true);
    });
    setClaimRewardLoading(false);
  }

  async function handleGetStakedTokens() {
    setCheckStakedLoading(true);
    await getStakedTokens().then((success) => {
      if (success) {
        setSuccess(true);
      } else setError(true);
    });
    // @ts-ignore
    // setStakedTokens([]);
    setCheckStakedLoading(false);
  }

  async function handleStake() {
    setStakeLoading(true);
    await stake(idToStake!).then((success) => {
      if (success) setSuccess(true);
      else setError(true);
    });
    setStakeLoading(false);
  }

  async function handleWithdraw() {
    setWithdrawLoading(true);
    await withdraw(idToWithdraw!).then((success) => {
      if (success) setSuccess(true);
      else setError(true);
    });
    setWithdrawLoading(false);
  }

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

  return (
    <Container>
      {/* @ts-ignore */}
      <Grid container spacing={1} align="center" alignItems="start">
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ margin: "2rem 0" }}>
            Here you can stake our CANSwap NFT
          </Typography>
        </Grid>
        <Grid item xs={3}>
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
              Claim Rewards
            </Typography>
            <Divider />
            <Typography textAlign={"center"}>
              Claim rewards from staked NFTs
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              textAlign={"center"}
            >
              <Typography variant="h6">
                {reward != undefined && `${reward}`}
              </Typography>
            </Typography>
            <LoadingButton
              variant="text"
              loading={isClaimRewardLoading}
              onClick={handleClaimRewards}
            >
              Claim Rewards
            </LoadingButton>
            <LoadingButton
              variant="text"
              loading={isCheckRewardLoading}
              onClick={handleCheckRewards}
            >
              Check rewards
            </LoadingButton>
          </Paper>
        </Grid>

        <Grid item xs={3}>
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
              Stake
            </Typography>
            <Divider />
            <Typography textAlign={"center"}>Stake token (NFTs)</Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              textAlign={"center"}
            >
              Here you can stake your NFTs and then claim the rewards
            </Typography>
            <TextField
              id="filled-basic"
              type={"number"}
              label="Enter token ID to stake"
              variant="filled"
              value={idToStake}
              onChange={(e) =>
                setIdToStake(e.target.value as unknown as number)
              }
            />
            <LoadingButton
              loading={isStakeLoading}
              variant="text"
              onClick={handleStake}
            >
              Stake Token
            </LoadingButton>
          </Paper>
        </Grid>
        <Grid item xs={3}>
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
              Withdraw
            </Typography>
            <Divider />
            <Typography textAlign={"center"}>
              Withdraw NFT from KANSwap
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              textAlign={"center"}
            >
              Here you can withdraw your NFTs from staking
            </Typography>
            <TextField
              id="filled-basic"
              type={"number"}
              label="Enter token ID to withdraw"
              variant="filled"
              value={idToWithdraw}
              onChange={(e) =>
                setIdToWithdraw(e.target.value as unknown as number)
              }
            />
            <LoadingButton
              loading={isWithdrawLoading}
              variant="text"
              onClick={handleWithdraw}
            >
              Withdraw token
            </LoadingButton>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={2}
            sx={{
              minHeight: "18em",
              padding: "2em 1em",
              display: "flex",
              maxWidth: "30em",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant={"h5"} textAlign={"center"}>
              Check staked tokens
            </Typography>
            <Divider />
            <Typography textAlign={"center"}>
              Here you can get the list of your staked tokens
            </Typography>
            <List sx={{ display: "inline-block" }}>
              {stakedTokens &&
                stakedTokens.map((e, key) => {
                  return (
                    <ListItem key={key}>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "subtitle2",
                          style: {
                            whiteSpace: "pre-line",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          },
                        }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      >
                        <div>Owner: {e[0]}</div>
                        <div>Token ID: {e[1].toNumber()}</div>
                      </ListItemText>
                    </ListItem>
                  );
                })}
            </List>
            <LoadingButton
              loading={isCheckStakedLoading}
              variant="text"
              onClick={handleGetStakedTokens}
            >
              Check staked tokens
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
