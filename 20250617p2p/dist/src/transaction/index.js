"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const crypto_js_1 = require("crypto-js");
const wallet_1 = require("../wallet");
class Transaction {
    constructor(input, output) {
        this.input = input;
        this.output = output;
        this.id = this.calculateHash(); // 고유 식별자
        // 이전 트랜잭션을 조회해서 다음 거래를 처리할때 식별하는 값
    }
    calculateHash() {
        return (0, crypto_js_1.SHA256)(JSON.stringify(this.input) + JSON.stringify(this.output)).toString();
    }
    // 트랜잭션의 서명값ㅇ르 input 에 서명값을 포함
    // input 에는 내용만 담고 실제로 거래를 발생시키는 서명과 공개키의 값ㅇ르 할당할 메서드
    signInputs(wallet) {
        this.input.forEach((input) => {
            input.publicKey = wallet.publicKey;
            // 거래내용을 검증하기위한 서명값
            input.signature = wallet.signMessage(this.id);
        });
    }
    // 서명 검증 거래가 올바른지
    // 여러개의 값을 검증
    // 배열의 메서드
    // every 배열안에 있는 모든 값이 만족하는지 검사
    // 하나라고 틀리면 false 반환한다
    // () => {} 콜백의 매개변수는 첫번쨰 요소 두변재 인덱스
    verifyInputs() {
        // every returns boolean
        return this.input.every((input) => {
            if (!(input.signature && input.publicKey))
                return false;
            try {
                return wallet_1.Wallet.verifySignature(this.id, input.signature, input.publicKey);
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.Transaction = Transaction;
