// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CoinNFT is ERC20 {

    mapping(address => uint) private balances;
    uint private tokensPerETH = 100_000_000;
    struct CoinStruct {
        address owner;
        string name;
        uint price;
        string url;
    }
    struct userCoin {
        string name;
        string url;
    }

    event NFTEvents(
        address owner,
        string name,
        uint price,
        string url,
        string trade
    );

    CoinStruct[] private Coins;

    mapping(address => userCoin[]) private userCoins;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function buyToken(uint tokenamt) external payable {
        require(msg.value == (tokenamt / tokensPerETH));
        _mint(msg.sender, tokenamt * 10 ** decimals());
        balances[msg.sender] += tokenamt; 
    }

    function sellNFT(
        string memory name,
        string memory url,
        uint price
    ) external {
        string memory trade = "sell";
        Coins.push(CoinStruct(msg.sender, name, price, url));
        emit NFTEvents(msg.sender, name, price, url, trade);
    }

    function buyNFT(uint index, uint price) external payable{
        require(balanceOf(msg.sender) > Coins[index].price);
        
        string memory trade = "buy";
        address prevOwner = Coins[index].owner;
        string memory name = Coins[index].name;
        string memory url = Coins[index].url;
        userCoins[msg.sender].push(userCoin(name, url));
        balances[msg.sender] -= price;
        // balances[prevOwner] += price;
        Coins[index] = Coins[Coins.length - 1];
        Coins.pop();
        emit NFTEvents(msg.sender, name, price, url, trade);
    }

    function getCoins() external view returns (CoinStruct[] memory) {
        return Coins;
    }
    function getCoinindex(uint index) public view returns (address, string memory, uint, string memory) {
    CoinStruct memory coin = Coins[index];
    return (coin.owner, coin.name, coin.price, coin.url);
}

    function getuserCoins() external view returns (userCoin[] memory) {
        return userCoins[msg.sender];
    }

    function getuserTokens() external view returns (uint) {
        return (balances[msg.sender]);
    }
}