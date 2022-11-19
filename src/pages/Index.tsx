import {Box, Container, Divider, Typography} from "@mui/material";

export default function Index() {

  async function addAT3Token() {
    const tokenAddress = '0x09421413231b5b2aC431B65e435746670b0A2C9d';
    const tokenSymbol = 'AT3';
    const tokenDecimals = 18;
    const tokenImage = 'http://placekitten.com/300/300';

    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Box>
        <Divider/>
        <Typography>Cryptoanarchy out now</Typography>
        <Typography>Swap, stake and mint NFT on this decentralized platform.</Typography>
        <button onClick={addAT3Token}>Add</button>
      </Box>
    </Container>
  )
}