// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("MyNftModule", (m) => {
  const token = m.contract("MyNFT", ["BingNFT", "BTK"]);
  const sale = m.contract("SaleNFT", [token]);
  return {token, sale};
});
