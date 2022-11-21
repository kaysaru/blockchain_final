import { useState } from "react";
import {
  Container,
  Divider,
  Tab,
  Tabs,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
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

const pages = ["coinswap", "nftstake", "mintnft"];

export default function MenuAppBar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState(0);
  const { walletConnected, connectOnLoad } = useWeb3();

  function handleChange(event: React.SyntheticEvent, newValue: number) {
    setValue(newValue);
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <Tab component={Link} to={"/coinswap"} label="Swap Coins"></Tab>
          <Tab component={Link} to={"/nftstake"} label="Stake" />
          <Tab component={Link} to={"/mintnft"} label="Mint" />
        </Tabs>
        {/* <IconButton size="large" aria-label="search" color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton
          size="large"
          aria-label="display more actions"
          edge="end"
          color="inherit"
        >
          <MoreIcon />
        </IconButton> */}
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
