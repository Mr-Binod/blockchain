const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MetaBingNFTModule", (m) => {
    // Deploy BingNFT first (if not already deployed)
    const bingNFT = m.contract("BingNFT");
    
    // Deploy MetaBingNFT with BingNFT address as constructor parameter
    const metaBingNFT = m.contract("MetaBingNFT", [bingNFT]);
    
    return { bingNFT, metaBingNFT };
}); 