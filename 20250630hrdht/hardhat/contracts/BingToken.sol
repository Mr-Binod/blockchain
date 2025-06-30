// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BingToken is ERC20, Ownable {
    // 컨트랙트 배포자 // 계정 추상화 혹은 컨트랙트가 배포자인 경우
    constructor(string memory name, string memory symbol) 
    ERC20(name, symbol) 
    Ownable(msg.sender)
    {}
    // 이더를 보내면 이더의 량에 맞는 토큰을 발행
    // 이더를 보냈을때 토큰 이더가 0.001개 보내면 토큰 100개를 받을수 있게 비율을 지정한다.
    // 이더리움 받으면 지금할 토큰의 비율 0.01 개당 100개
    uint private rate = 100; 

    // 컨트랙트의 특수한 메서드
    // 컨트랙트 주소에서 이더를 전송 받으면 호출되는 내장 메서드 => 틀수한 메서드
    // receive 메서드는 컨트랙트가 이더를 받으면 호추되는 메서드
    // contract 가 이더를 수신하면 받으면 실행되는 특별한 함수
    receive() external payable {
        require(msg.value >= 0.01 ether, "ETH balance error");
        // 최소 전달하는 이더가 0.01 이상 이어야한다

        // 계산 토큰의 수 계산 보낸 량에 비례해서 0.01당 100 토큰
        //  0.015 에 150 토큰
        uint tokenValue = (msg.value * rate) / 1 ether * 100 ;
        // 토큰의 베율 계산 100개씩 닽위
        _mint(msg.sender, tokenValue);
    }

    // 컨트랙트 배포자만 호출할수 있느 함수
    function mint (address to, uint amount) external onlyOwner {
        // 배포자 이후의 검증 로직 작성
        _mint(to, amount);
    }

    // 소유자가 이더를 회수할수 있다
    // 수익창출
    function reward() external onlyOwner {
        payable(owner()).transfer(address(this).balance); 
    }
}

