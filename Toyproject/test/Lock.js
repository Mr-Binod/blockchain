const { expect } = require("chai");

const { ethers } = require("hardhat");
 

describe("token test", () => { 
  let owner; 
  let address;
  let Contract;

  before(async () => {
    // console.log(await ethers.getSigners())
    [owner, address] = await ethers.getSigners();
    const createContract = await ethers.getContractFactory("CoinNFT")
    Contract = await createContract.deploy("MultiCoin", "MLT")
    await Contract.waitForDeployment();
    // console.log(createContract, Contract, 'Createcontract')
    // console.log( Contract, 'Contract')
  })
  it("배포자 검증", async () => {
    // console.log("yes", owner, address)
    await Contract.sellNFT("hello",
      "https://t4.ftcdn.net/jpg/03/16/24/49/360_F_316244961_4Kch7qlXUf8accn4wXUK4vA4ZfPMmpPh.jpg",
      87
    )
    console.log(await Contract.getCoins())
  })
  it("토큰 구매", async () => {
    await Contract.buyToken(200);
    console.log(await Contract.getuserTokens())
  })


  // it("should emit NFTEvents with all 5 args", async () => {
  //   const name = "hello";
  //   const url = "https://t4.ftcdn.net/jpg/03/16/24/49/360_F_316244961_4Kch7qlXUf8accn4wXUK4vA4ZfPMmpPh.jpg";
  //   const price = 87;
  //   const trade = "sell";

  //   await expect(Contract.sellNFT(name, url, price))
  //     .to.emit(Contract, "NFTEvents")
  //     .withArgs(owner.address, name, price, url, trade);

  //   console.log(Contract.userCoins())
  // });
  it("NFT 구매2", async () => {
    console.log(await Contract.getCoinindex(0))
  })

  it("NFT 구매", async () => {
    console.log(await Contract.getCoins())
    await Contract.buyNFT(0, 20)
    console.log(await Contract.getCoins(), "123")
    const [[a,b]] = await Contract.getuserCoins()
    console.log(a)
    console.log(b)
     console.log(await Contract.getuserTokens())
  })
})

