export interface IWallet {
    account : string; // 공개키로 만든 주소의 값 내 지갑의 계좌번호 , 개인키는 계좌의 비밀번호
    privateKey : string;
    publicKey : string;
    balance : number; // 잔액 -> 사용자에게 제공하기위한 인터페이스 -> UTXO (자산의 내용 {account : 10232, balance : 2323})
}