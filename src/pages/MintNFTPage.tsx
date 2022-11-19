import useNFTMint from "../hooks/useNFTMint";

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
    <div>
      <div>
        <h1>Welcome to Crypto Devs!</h1>
        <div>
          Its an NFT collection for developers in Crypto.
        </div>
        <div>
          {tokenIdsMinted}/20 have been minted
        </div>
        {renderButton()}
      </div>
      <div>
        <img src="/src/assets/cryptodevs/0.svg" alt={"Zeroth NFT"}/>
      </div>
    </div>
  );
}
