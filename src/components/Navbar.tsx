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
  // Override media queries injected by theme.mixins.toolbar
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
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
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
          KANSwap
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{ flexGrow: 1, alignSelf: "flex-end" }}
          textColor="inherit"
          indicatorColor="secondary"
        >
          <Tab component={Link} to={"/coinswap"} label="Swap Coins" />
          <Tab component={Link} to={"/nftstake"} label="Stake" />
          <Tab component={Link} to={"/mintnft"} label="Mint" />
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
