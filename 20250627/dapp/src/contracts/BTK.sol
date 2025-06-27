// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;



// 솔리디티에서 import 

import "../../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";


// "0x8b6cbb59a1078245a6b4780ef2d97abf022a9368"
contract BingToken is ERC20 {
    constructor() ERC20("BingToken", "BTK") {
        // ERC20("BingToken", "BTK") 부모 컨트랙트 생성자
        // constructor() 매개변수를 받아서 처리하겠다
        // 배포한 컨트랙트 주인이 최초에 토큰의 소유권을 일부분 가지고 있겠다
        // 단위 변환하면 wei 단위를 토큰단위로 변환해서 ui로 보여주면 된다
        _mint(msg.sender, 1000 * 10 ** decimals());   
    }
}