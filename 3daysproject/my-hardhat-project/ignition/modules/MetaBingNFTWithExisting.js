const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MetaBingNFTWithExistingModule", (m) => {
    // Use existing BingNFT contract address
    const BINGNFT_ADDRESS = "0xA51224dd0Fe0051d49a6ADbEA1487cF0D13f72C7";
    
    // Deploy MetaBingNFT with existing BingNFT address
    const metaBingNFT = m.contract("MetaBingNFT", [BINGNFT_ADDRESS]);
    
    return { metaBingNFT };
}); 