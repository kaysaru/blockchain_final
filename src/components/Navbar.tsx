import { SyntheticEvent, useState } from "react";
import { Tab, Tabs, Button, Typography, Toolbar, AppBar } from "@mui/material";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { styled } from "@mui/material/styles";
import useWeb3 from "../hooks/useWeb3";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  "@media all": {
    minHeight: 128,
  },
}));

export default function MenuAppBar() {
  const [value, setValue] = useState(0);
  const { walletConnected, connectOnLoad } = useWeb3();

  function handleChange(event: SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  const handleConnected = () => {
    return walletConnected ? <LinkIcon /> : <LinkOffIcon />;
  };

  return (
    <AppBar position="static" color="primary">
      <StyledToolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            margin: "0.5rem",
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Link to={"/"}>KANSwap</Link>
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ flexGrow: 1, alignSelf: "flex-end" }}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab component={Link} to={"/"} label="Start" />
          <Tab component={Link} to={"/mintnft"} label="Mint" />
          <Tab component={Link} to={"/coinswap"} label="Swap Coins" />
          <Tab component={Link} to={"/nftstake"} label="Stake" />
        </Tabs>
        <Button
          variant="outlined"
          onClick={connectOnLoad}
          startIcon={handleConnected()}
          color="inherit"
          sx={{ margin: "1rem" }}
        >
          {walletConnected ? "Connected" : "Not Connected"}
        </Button>
      </StyledToolbar>
    </AppBar>
  );
}
