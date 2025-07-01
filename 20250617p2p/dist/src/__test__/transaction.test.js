"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importStar(require("node:test"));
const chain_1 = require("../chain");
const mempool_1 = require("../mempool");
const transaction_1 = require("../transaction");
const wallet_1 = require("../wallet");
const UTXO_1 = require("../UTXO");
(0, node_test_1.describe)('transaction check', () => {
    let wallet01;
    let wallet02;
    let mempool;
    let blockChain;
    let utxoLedger;
    (0, node_test_1.default)("초기화", () => {
        wallet01 = new wallet_1.Wallet();
        wallet02 = new wallet_1.Wallet();
        mempool = new mempool_1.Mempool();
        blockChain = new chain_1.BlockChain();
        utxoLedger = new UTXO_1.UTXOLedger();
        // UTXO 미사용 객체의 이전 트랜젯션 내용을 포함
        // 반감기 기준으로 보상이 절반씩 줄어들었고 총발행량 기준으로 총 발행량에서 보상만큼의 이전 트랜잿션
        const txInput = {
            txId: "",
            outputIndex: 0,
            signature: "",
            publicKey: ""
        };
        // 출력 값 지갑 주소 첫번째가
        const txOutput = {
            address: wallet01.account,
            amount: 50
        };
        // 월래 이 트랜젝션을 mempool
        // 블록 생성했을대 첫번재 트랜잭션을 ㅗ만들어서 넣어준다
        const coinbaseTx = new transaction_1.Transaction([], [txOutput]);
        // 거래의 서명 생성
        coinbaseTx.signInputs(wallet01);
        // 서명검증 이후에 트랜잭션 추가
        mempool.addTransaction(coinbaseTx);
    });
    (0, node_test_1.default)("트랜잭션 mempool조회", () => {
        console.log(mempool, "qwe");
    });
    (0, node_test_1.default)("트랜잭션 처리", () => {
        // mempool.transactions[0]
        // utxo 처리
        // 이전 처리과정 블록에 트랜잭션 기록된 과정
        const block = blockChain.addBlock([JSON.stringify(mempool.transactions[0])]);
        utxoLedger.updateTransaction(mempool.transactions[0]);
        mempool.removeTransaction(mempool.transactions[0].id);
        console.log(utxoLedger.utxos, "ww");
        // 미사용 객체 생성
        // 트랜잭션의 처리과정에서
        console.log(blockChain.chain);
    });
    (0, node_test_1.default)("지갑에서 사토시 이체", () => {
        // UTXO 조회해서 잔액 가져오기
        const utxos = utxoLedger.getUtxoAddress(wallet01.account);
        console.log("잔액 : ", utxos);
        console.log("첫번째 지갑의", utxoLedger.getBalance(wallet01.account));
        // 보낼 금액
        const sendValue = 20;
        const txInput = {
            txId: utxos[0].txId,
            outputIndex: utxos[0].outputIndex
        };
        // 출력에 따른 계산 출력값 계산
        // 
        const tx = new transaction_1.Transaction([txInput], [{
                address: wallet01.account, amount: 30
            }, {
                address: wallet02.account, amount: 20
            }]);
        // 서명 생성 내가 한일이 맞아 나는 이사람한테 송금할꺼야
        tx.signInputs(wallet01); // 수수료가 발생하지만 우리는 없어
        console.log("서명 검증", tx.verifyInputs());
        mempool.addTransaction(tx);
        // 우선순위 
        // 트랜잭션 가져와 mempool
        const block = blockChain.addBlock([JSON.stringify(mempool.transactions[0])]);
        console.log(block);
        utxoLedger.updateTransaction(mempool.transactions[0]);
        mempool.removeTransaction(mempool.transactions[0].id);
        console.log("젓 번재 지갑의 잔액은", utxoLedger.getBalance(wallet01.account));
        console.log("두 번재 지갑의 잔액은", utxoLedger.getBalance(wallet02.account));
    });
});
