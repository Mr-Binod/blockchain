// // SPDX-License-Identifier: MIT
// pragma solidity 0.8.30;

// import "@openzeppelin/contracts/utils/Strings.sol";
// import "./BingNFt.sol";

// contract MetaBingNFT {
//     BingNFT public bingNFT;
//     address public owner;
    
//     event NFTMinted(address indexed user, uint256 tokenId, uint256 amount, string metadata);
    
//     constructor(address _bingNFTAddress) {
//         bingNFT = BingNFT(_bingNFTAddress);
//         owner = msg.sender;
//     }
    
//     // ✅ Meta-transaction for minting NFT
//     function mintNFT(
//         address user,
//         uint256 tokenId,
//         uint256 amount,
//         string memory metadata,
//         bytes memory signature
//     ) external {
//         // Verify signature
//         _verifySignature(user, metadata, signature);
        
//         // Mint NFT to user
//         // bingNFT.mint(user, tokenId, amount, "");
        
//         emit NFTMinted(user, tokenId, amount, metadata);
//     }
    
//     // ✅ Batch mint NFTs
//     function mintBatchNFT(
//         address user,
//         uint256[] memory tokenIds,
//         uint256[] memory amounts,
//         string[] memory metadatas,
//         bytes memory signature
//     ) external {
//         // Verify signature for first metadata (or create combined metadata)
//         string memory combinedMetadata = _combineMetadata(metadatas);
//         _verifySignature(user, combinedMetadata, signature);
        
//         // Mint batch NFTs to user
//         bingNFT.mintBatch(user, tokenIds, amounts, "");
        
//         // Emit events for each NFT
//         for (uint i = 0; i < tokenIds.length; i++) {
//             emit NFTMinted(user, tokenIds[i], amounts[i], metadatas[i]);
//         }
//     }
    
//     // ✅ Set token URI (only owner)
//     function setTokenURI(string memory newURI) external {
//         require(msg.sender == owner, "Only owner can set URI");
//         bingNFT.setURI(newURI);
//     }
    
//     // ✅ Verify signature
//     function _verifySignature(
//         address user,
//         string memory metadata,
//         bytes memory signature
//     ) internal pure {
//         bytes32 messageHash = _getEthSignMsgHash(metadata);
//         (bytes32 r, bytes32 s, uint8 v) = _splitSignature(signature);
        
//         address recoveredAddress = ecrecover(messageHash, v, r, s);
//         require(recoveredAddress == user, "Invalid signature");
//     }
    
//     // ✅ Get Ethereum signed message hash
//     function _getEthSignMsgHash(string memory metadata) internal pure returns (bytes32) {
//         bytes32 messageHash = keccak256(abi.encodePacked(metadata));
//         return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", Strings.toString(bytes(metadata).length), metadata));
//     }
    
//     // ✅ Split signature into components
//     function _splitSignature(bytes memory signature) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
//         require(signature.length == 65, "Invalid signature length");
        
//         assembly {
//             r := mload(add(signature, 32))
//             s := mload(add(signature, 64))
//             v := byte(0, mload(add(signature, 96)))
//         }
        
//         if (v < 27) {
//             v += 27;
//         }
        
//         require(v == 27 || v == 28, "Invalid signature 'v' value");
//     }
    
//     // ✅ Combine multiple metadata strings
//     function _combineMetadata(string[] memory metadatas) internal pure returns (string memory) {
//         string memory combined = "";
//         for (uint i = 0; i < metadatas.length; i++) {
//             combined = string(abi.encodePacked(combined, metadatas[i]));
//             if (i < metadatas.length - 1) {
//                 combined = string(abi.encodePacked(combined, "|"));
//             }
//         }
//         return combined;
//     }
    
//     // ✅ Transfer ownership
//     function transferOwnership(address newOwner) external {
//         require(msg.sender == owner, "Only owner can transfer ownership");
//         owner = newOwner;
//     }
    
//     // ✅ Get contract info
//     function getContractInfo() external view returns (address nftContract, address contractOwner) {
//         return (address(bingNFT), owner);
//     }
// } 