import useNFTMint from "../hooks/useNFTMint";
import {Container, Grid, Typography} from "@mui/material";

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
      <Grid container sx={{marginTop: "3em"}} justify="center" alignItems="center">
        <Grid xs={7}>
          <Typography variant={"h3"}>Welcome to KANSwap!</Typography>
          <Typography variant={"h5"} sx={{margin: "1.5rem 0"}}>
            Its an NFT collection for developers in AITU.
          </Typography>
          <Typography>
            {tokenIdsMinted}/20 have been minted
          </Typography>
          {renderButton()}
        </Grid>
        <Grid xs={5}>
          <img src="/src/assets/cryptodevs/0.svg" alt={"Zeroth NFT"}/>
        </Grid>
      </Grid>

    </Container>
  );
}
