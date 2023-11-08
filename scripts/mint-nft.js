require("dotenv").config();
// const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(
  "https://eth-sepolia.g.alchemy.com/v2/S31AoDFUPz4LSGSiBXLYTkk3is-fOxJG"
);
const contract = require("../artifacts/contracts/NavasNFT.sol/NavasNFT.json");
const contractAddress = "0x1854E4FB93B158ff62bFd704a38B01212CCE7ed1";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(
    "0x21baa824cdB0260674ddF05d816Fcbbbf6C36A60",
    "latest"
  ); //get latest nonce

  //the transaction
  const tx = {
    from: "0x21baa824cdB0260674ddF05d816Fcbbbf6C36A60",
    to: "0x1854E4FB93B158ff62bFd704a38B01212CCE7ed1",
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods
      .mintNFT("0x21baa824cdB0260674ddF05d816Fcbbbf6C36A60", tokenURI)
      .encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(
    tx,
    "6d8c8329217feca66caeef2feba6210f701f64425bc0f6c56b0df55afc4b91d1"
  );
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT("ipfs://QmPoJ1t7xXCAHG93sJbwdAixNcxuSQmY8BpFRBUyFYpHVs");
