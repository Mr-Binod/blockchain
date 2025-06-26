// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract Bank {
    // 지갑의 관리자
    // 불변성 변수의 불변성
    address public immutable owner; 
    
    // 변수 선언할때 get 과 set이 생성된다 
    // private immutable 는 get 과 set 호출할수 없다
    // 입금한 계정들
    mapping(address => uint) private balances;

    // 관리자가 출금 제한을 한 내용
    mapping(address => uint) private balanceLimit;
    
    // event log => 기록하는 용도로 상태변수로 표현
    // 입금하는 주소와 입금 금액을 로긍로 기록하기위한 이벤트
    event DepositeEn(address indexed account, uint amount);
    event WithdrawlEn(address indexed account, uint amount);
    event SetLimitEn(address indexed account, uint Limit);

    constructor() {
        owner = msg.sender; 
    }
    
    function deposite() external payable {
        require(msg.value > 0);
        balances[msg.sender] += msg.value; // 입금된 이더량

        emit DepositeEn(msg.sender, msg.value); // 입금 이벤트 기록
    }
    // 출금 withdrawl(uint amount) external payable 함수에 작성을 하면 함수에서 이더를받을수 있다
    function withdrawl(uint amount) external {
        require(amount > 0);
        require(amount <= balances[msg.sender]);
        // 출금할때 // 출금 제한을 걸어서 얼마만큼 출금할수 있는지
        require(amount <= balanceLimit[msg.sender]);
        // 상태변수의 잔액의 량이 줄어든다
        balances[msg.sender] -= amount;

        // 출금은 이더를 보내줘야 한다.
        // address 보내줄 주소 
        // 컨트랙트에서 이더를 보내줄 주소
        // payable 해당 지갑 주소로 송금할수 있는 객체
        // payable 형변환 지갑 주소를 할당새서 형변환
        // address payable account = payable(msg.sender)
        // 컨트랙트 내에서 지갑에 이더를 송금
        // 1000000000000000000 = 1 ether 
        // payable(msg.sender).transfer(amount ether); 기본으로 ether 가진다
        payable(msg.sender).transfer(amount);
        emit WithdrawlEn(msg.sender, amount);

    }
    // 관리자가 출금 한도를 설정
    function setLimit(address account, uint amount) external {
        balanceLimit[account] = amount; // 한번 출금할때 한도
        emit SetLimitEn(account, amount);
    }
    // 본인의 잔액 조회 저금해놓은 잔액
    function getBalance() external view returns(uint) {
        return balances[msg.sender];  
    }

    function getLimit () external view returns(uint) {
        return balanceLimit[msg.sender];
    }

    function getContractBalance () external view returns(uint) {

        return address(this).balance;
    }
}