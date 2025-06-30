// // This setup uses Hardhat Ignition to manage smart contract deployments.
// // Learn more about it at https://hardhat.org/ignition

// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// const JAN_1ST_2030 = 1893456000;
// const ONE_GWEI = 1_000_000_000n;

// module.exports = buildModule("LockModule", (m) => {
//   const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
//   const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

//   const lock = m.contract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   return { lock };
// });


// hardhat-ignition file 

const {buildModule}  = require("@nomicfoundation/hardhat-ignition/modules")

// hardhat-ignition 있는 모듈 생성 함수 buildmodule 모듈들을 import 해온다

module.exports = buildModule("BingTokenModule",
  // BingTokenModule 이라는 이름을 정의 해서 사용
  // BingTokenModule 배포가 이러나면 이 모듈이름을 배포를 재배포를 방지해준다
  (m) => {
    // m 빌드 모듈이 ㅍ ㅗ함된 함수
    // 컴파일된 내용이 포함
    // 생성자의 매개변수가 포함되면 두번째 매개변수로 배열을 전달
    // 생성자 실행 말 즉슨 컨트랙트 배포 설정파일 내용의 네트워크에 
    const token = m.contract("BingToken", ["BingToken", "BTK"]); 
    // 배포된 결과의 객체를 반환
    return {token};
  }

)