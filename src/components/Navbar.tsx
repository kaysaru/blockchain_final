import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {
  Container, Divider, Tab, Tabs
} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {useState} from "react";

const pages = ['coinswap', 'nftstake', 'mintnft'];

export default function MenuAppBar() {
  const [value, setValue] = useState("")

  function handleChange(event: React.SyntheticEvent, newValue: string) {
    setValue(newValue)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={'/'} style={{textDecoration: "none", color: "white"}}>KANSwap</Link>
          </Typography>

        </Toolbar>
        <Divider/>
        <Toolbar>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="primary"
            >
              {pages.map((page) => {
                return (
                  <Link to={page} key={page}>
                    <Tab value={page} label={page.toUpperCase()}/>
                  </Link>
                )
              })}
            </Tabs></Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}