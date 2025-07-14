// Configurable Deployment Module
// This module allows you to customize token parameters

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ConfigurableDeployModule", (m) => {
  // Get parameters with defaults


  // 1. Deploy BingNFT contract
  const bingNFT = m.contract("BingNFT");

  // 2. Deploy Bingtoken with custom parameters
  const bingtoken = m.contract("Bingtoken", [
    "Bing Token",  // name
    "BTK"         // symbol
  ]);

  // 3. Deploy MetaTransaction contract
  const metaTransaction = m.contract("MetaTransaction", [
    bingtoken
  ]);

  return { 
    bingNFT,
    bingtoken,
    metaTransaction
  };
}); 