// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BingNFT is ERC1155, Ownable {
    // Removed unused variable
    struct Sellstake {
        address seller;
        uint token;
        uint price;
    }
    struct Ownertokens {
        uint tokenid;
        uint tokens;
    }
    mapping(uint => Sellstake) public items;
    mapping(address => Ownertokens[])  private ownerTokens;
    mapping(uint256 => string) private _uris;

    uint[] public listNFTids;
    uint private tokenId;
    string private initialURI = "https://myproject.com/metadata/{id}.json";
    
    constructor() ERC1155(initialURI) Ownable(msg.sender) {
        // No need for external address parameter
    }

    function settokenURI(string memory newuri) external returns (uint) {
        uint createdTokenId = tokenId;
        
        // Mint 100 tokens of the new ID to msg.sender
        _mint(msg.sender, createdTokenId, 100, "");
        
        // Set the URI for this token ID
        _uris[createdTokenId] = newuri;
        
        // Store the owner mapping with token ID and amount
        ownerTokens[msg.sender].push(Ownertokens(createdTokenId, 100));
        
        // Increment token ID for next creation
        tokenId++;
        
        return createdTokenId;
    }

    function SellNFT(uint nftid, uint token, uint price) external {
        require(balanceOf(msg.sender, nftid) >= token, "Insufficient tokens");
        require(price > 0, "Price must be greater than 0");
        require(items[nftid].seller == address(0), "NFT already for sale");
        require(token > 0, "Must sell at least 1 token");
        
        // Transfer tokens from seller to contract (marketplace)
        _safeTransferFrom(msg.sender, address(this), nftid, token, "");
        
        // Update seller's token tracking
        for(uint i = 0; i < ownerTokens[msg.sender].length; i++) {
            if(ownerTokens[msg.sender][i].tokenid == nftid) {
                ownerTokens[msg.sender][i].tokens -= token;
                break;
            }
        }
        
        // Add to marketplace
        items[nftid] = Sellstake(msg.sender, token, price);
        listNFTids.push(nftid);
    }

    function BuyNFT(uint nftid) external payable {
        Sellstake memory item = items[nftid];
        require(item.price == msg.value, "Incorrect price");
        require(msg.sender != item.seller, "Cannot buy your own NFT");
        require(item.seller != address(0), "NFT not for sale");
        
        // Transfer the tokens from contract to buyer
        _safeTransferFrom(address(this), msg.sender, nftid, item.token, "");
        
        // Transfer the payment to seller
        payable(item.seller).transfer(msg.value);
        
        // Update buyer's token tracking
        bool found = false;
        for(uint i = 0; i < ownerTokens[msg.sender].length; i++) {
            if(ownerTokens[msg.sender][i].tokenid == nftid) {
                ownerTokens[msg.sender][i].tokens += item.token;
                found = true;
                break;
            }
        }
        
        // If buyer doesn't have this token type yet, add it
        if(!found) {
            ownerTokens[msg.sender].push(Ownertokens(nftid, item.token));
        }
        
        // Remove from sale
        delete items[nftid];
    }
    
    function cancelSale(uint nftid) external {
        Sellstake memory item = items[nftid];
        require(item.seller == msg.sender, "Only seller can cancel");
        require(item.seller != address(0), "NFT not for sale");
        
        // Return tokens to seller
        _safeTransferFrom(address(this), msg.sender, nftid, item.token, "");
        
        // Update seller's token tracking
        bool found = false;
        for(uint i = 0; i < ownerTokens[msg.sender].length; i++) {
            if(ownerTokens[msg.sender][i].tokenid == nftid) {
                ownerTokens[msg.sender][i].tokens += item.token;
                found = true;
                break;
            }
        }
        
        // If seller doesn't have this token type in tracking yet, add it
        if(!found) {
            ownerTokens[msg.sender].push(Ownertokens(nftid, item.token));
        }
        
        // Remove from sale
        delete items[nftid];
    }


    function uri(uint256 tokenid) public view virtual override returns (string memory) {
        string memory customUri = _uris[tokenid];
        if (bytes(customUri).length > 0) {
            return customUri;
        }
        // Replace {id} with the actual token ID
        string memory tokenIdStr = Strings.toString(tokenid);
        return string(abi.encodePacked("https://myproject.com/metadata/", tokenIdStr, ".json"));
    }

    function getall(uint item) external view returns(Sellstake memory) {
        return items[item];
    }
    function ownerToken() external view returns(Ownertokens[] memory) {
        return ownerTokens[msg.sender];
    }
    
    function getOwnerTokenCount() external view returns(uint) {
        return ownerTokens[msg.sender].length;
    }
    
    function getOwnerTokenAtIndex(uint index) external view returns(Ownertokens memory) {
        require(index < ownerTokens[msg.sender].length, "Index out of bounds");
        return ownerTokens[msg.sender][index];
    }
    
    function getMintedTokens(address user) external view returns(uint[] memory tokenIds, uint[] memory amounts) {
        Ownertokens[] memory userTokens = ownerTokens[user];
        tokenIds = new uint[](userTokens.length);
        amounts = new uint[](userTokens.length);
        
        for(uint i = 0; i < userTokens.length; i++) {
            tokenIds[i] = userTokens[i].tokenid;
            amounts[i] = userTokens[i].tokens;
        }
    }
    
    function getCurrentBalance(address user, uint tknId) external view returns(uint) {
        return balanceOf(user, tknId);
    }
    
    function getAllTokenBalances(address user) external view returns(uint[] memory tokenIds, uint[] memory balances) {
        Ownertokens[] memory userTokens = ownerTokens[user];
        tokenIds = new uint[](userTokens.length);
        balances = new uint[](userTokens.length);
        
        for(uint i = 0; i < userTokens.length; i++) {
            tokenIds[i] = userTokens[i].tokenid;
            balances[i] = balanceOf(user, userTokens[i].tokenid);
        }
    }
    
}

// How to "Get" It:

// During Deployment: You explicitly provide this string when you deploy the contract. For example, if you're using a tool like Hardhat, Truffle, or Remix, you'll enter this string in the deployment interface.

// Example: deploy("https://myproject.com/metadata/{id}.json", deployerAddress)

// After Deployment (via uri function): You can query the uri(uint256 id) public function of your deployed contract. If no specific URI has been set for a given id using setTokenURI, this function will return the initialURI (potentially with the {id} placeholder replaced).
