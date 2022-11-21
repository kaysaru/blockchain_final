import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Index() {
  async function addAT3Token() {
    const tokenAddress = "0x09421413231b5b2aC431B65e435746670b0A2C9d";
    const tokenSymbol = "AT3";
    const tokenDecimals = 18;
    const tokenImage = "http://placekitten.com/300/300";

    try {
      await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Container>
        <Box>
          <Grid container spacing={2} sx={{ marginTop: "3rem" }}>
            <Grid item xs={6}>
              <Typography variant="h2">Cryptofinances out now.</Typography>
              <Typography variant="h2">Turn your ideas into future.</Typography>
              <Typography variant="h5">
                Swap, stake and mint NFT on this decentralized platform.
              </Typography>
              <Typography sx={{ margin: "1rem 0" }}>
                Add our AT3 token to get started with KANSwap!
              </Typography>
              <Button variant="contained" onClick={addAT3Token}>
                Add AT3 to Metamask
              </Button>
            </Grid>
            <Grid item xs={6}>
              <img
                id="bunny"
                src="/src/assets/astronaut-bunny.webp"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ margin: "3rem 0" }} />
        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="center"
          sx={{ marginBottom: "2rem" }}
        >
          <Card variant="outlined" sx={{ padding: "1rem 2rem" }}>
            <Typography>Mint NFT</Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              You can mint an NFT from our new collection!
            </Typography>
            <Button component={Link} to="/mintnft" variant="outlined">
              Mint!
            </Button>
          </Card>
          <Card variant="outlined" sx={{ padding: "1rem 2rem" }}>
            <Typography>Swap coins</Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Swap AT3 to Ethereum and vice versa!
            </Typography>
            <Button component={Link} to="/coinswap" variant="outlined">
              Start swapping!
            </Button>
          </Card>
          <Card variant="outlined" sx={{ padding: "1rem 2rem" }}>
            <Typography>Stake NFT</Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              KANSwap offers staking: load your NFT from our collection to earn
              tokens!
            </Typography>
            <Button component={Link} to="/nftstake" variant="outlined">
              Let's stake!
            </Button>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}
