require("@nomicfoundation/hardhat-toolbox");
// hardhat 에서 플로그인 모음을 가져오는 구문
// 콘솔 로그 abi 생성 플러그인 등 ethers 등
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

// 컴파일과 배포를 할때 속성
module.exports = {
  solidity: "0.8.30",
  // networks 네트워크에 배포할때 속성
  networks : {
    // sepolia 우리가 세풀리아 네트워크를 사용할 속성들의 키이름을 정해준것. 세폴리아니까 세폴리아 정합
    sepolia : {
      url : process.env.INFURA_RPC, // RPC 엔트포인트 주소 네트워크에 통신할 주소가 필요
      accounts : [process.env.PRIVATE_KEY], // 배포를 할때 필요한 가스비를 비불할 계정 개인키의 값을 작성
    }
  }
};
