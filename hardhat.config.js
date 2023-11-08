/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/S31AoDFUPz4LSGSiBXLYTkk3is-fOxJG",
      accounts: [
        `0x6d8c8329217feca66caeef2feba6210f701f64425bc0f6c56b0df55afc4b91d1`,
      ],
    },
  },
};
