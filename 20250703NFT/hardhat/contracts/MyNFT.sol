// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.30;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract MyNFT is ERC721URIStorage, Ownable {
    constructor (string memory name, string memory symbol)
    ERC721(name, symbol)
    Ownable(msg.sender) {

    }
    uint private tokenId;
    function minting(string memory _tokenURI) external returns(uint) {
        uint _nextTokenId = tokenId;
        _safeMint(msg.sender, _nextTokenId);
        _setTokenURI(_nextTokenId, _tokenURI);

        tokenId++;
        return _nextTokenId; // 생선된 토큰의 아이디 반환
    }
}