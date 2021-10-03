require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
const { ALCHEMY_API_KEY, RPC_URL, PRIVATE_KEY, ETHERSCAN_API } = process.env;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

console.log("+++++++++++");

 module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`, `0x${PRIVATE_KEY}`, `0x${PRIVATE_KEY}`],
      timeout:350000,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API
  }
};
