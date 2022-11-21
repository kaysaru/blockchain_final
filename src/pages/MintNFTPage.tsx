import useNFTMint from "../hooks/useNFTMint";
import {Container, Divider, Grid, Typography} from "@mui/material";

export default function MintNFTPage() {

  const {
    checkIfPresaleEnded,
    checkIfPresaleStarted,
    presaleMint,
    publicMint,
    startPresale,
    getOwner,
    getTokenIdsMinted,
    renderButton,

    isOwner,
    setIsOwner,
    loading,
    tokenIdsMinted,
    presaleEnded,
    presaleStarted
  } = useNFTMint()


  return (
    <Container>
      {/*@ts-ignore*/}
      <Grid container spacing={2} sx={{marginTop: "4em"}} justify="center" alignItems="center">
        <Grid item xs={6}>
          <Typography variant={"h3"}>Welcome to KANSwap!</Typography>
          <Typography variant={"h5"} sx={{margin: "1.5rem 0"}}>
            Its an NFT collection for developers in AITU.
          </Typography>
          <Typography>
            {tokenIdsMinted}/20 have been minted
          </Typography>
          {renderButton()}
        </Grid>
        <Grid item xs={5}>
          <img src="/src/assets/cryptodevs/1.png" alt={"Zeroth NFT"}/>
        </Grid>
      </Grid>
    </Container>
  );
}
