// 조건 검사의 로직을 제공하는 라이브러리
// 차이 

const {expect} = require("chai");
// chai 테스트할때 조건 검증 메서드를 제공하는 라이브러리

// ethers 
const {ethers} = require("hardhat");
// 하드햇에서 제공하는 이더리움 기능의 지갑, 서명 등의 기능을 메서드로 제공

describe("token test", () => {
    let owner;
    let address;
    let address2;
    let tokenContract;
    beforeEach(async () => {
        // 테스트 용도로 배포자 지갑 지갑2 이렇게 지갑을 3 
        // 배열의 형태에서 지갑의 내용 할당
        // 가상의 서명자들 배열을 만들어서 그 안에서 3 명의 서명자를 가지고 온것
        console.log(await ethers.getSigners())
        [owner, address, address2] = await ethers.getSigners();
        
        const createTokenContract = await ethers.getContractFactory("BingToken");

        tokenContract = await createTokenContract.deploy("BingToken", "BTK");

        // 블록 생성 될때까지 기다린다. 블록 생성되서 컨트랙트가 배포될때까지
        await tokenContract.waitForDeployment();

        // 테스트 환경해서는 트랜잭션이 생성되면 바로 블록 생성을 시켜준다.
        // 로컬에서 테스트환경 제공하는 네트워크들은 전부 트랜잭ㄷ션이 생기면 자동으로 블록 생성ㅎ새서 트랜잭션 처리

    })
    it("배포자가 소유자인지 검증", async () => {
        console.log(await tokenContract.owner())
        console.log(owner.address)
        expect(await tokenContract.owner()).to.equal(owner.address)
    })
    it("ether 보내는 받은 토큰 검증", async () => {
        await address.sendTransaction({
            to : tokenContract.target, // CA 주소 target
            value : ethers.parseEther("0.01") // 0.01 eth 보낸다
        })
        const balance = await tokenContract.balanceOf(address.address);
        console.log(balance);
        expect(balance).to.equal(100) // 0.01 eth를 보냈으면 100의 토큰을 받아야한다
    })

    // 컨트랙트 주인이 토큰을 사요자에게 발행
    it("컨트랙트 배포자가 토큰을 발행해주는 검증", async () => {
        console.log(tokenContract)
        await tokenContract.mint(address2.address, 2000);
        const balance = await tokenContract.balanceOf(address2.address);
        console.log(balance)
    })
})


