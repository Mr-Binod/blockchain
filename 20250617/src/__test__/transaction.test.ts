import test, { beforeEach, describe } from "node:test";
import { BlockChain } from "../chain";
import { IMempool } from "../interface/mempool.interface";
import { TxInput, TxOutput } from "../interface/transaction.interface";
import { Mempool } from "../mempool";
import { Transaction } from "../transaction";
import { Wallet } from "../wallet"
import { UTXOLedger } from "../UTXO";

describe('transaction check', () => {
  let wallet01 : Wallet;
  let wallet02 : Wallet;
  let mempool : Mempool;
  let blockChain : BlockChain;
  let utxoLedger : UTXOLedger

  test("초기화", () => {
    wallet01 = new Wallet();
    wallet02 = new Wallet();
    mempool = new Mempool();
    blockChain = new BlockChain();
    utxoLedger = new UTXOLedger();

    // UTXO 미사용 객체의 이전 트랜젯션 내용을 포함
    // 반감기 기준으로 보상이 절반씩 줄어들었고 총발행량 기준으로 총 발행량에서 보상만큼의 이전 트랜잿션
    const txInput : TxInput = {
        txId : "",
        outputIndex : 0,
        signature : "",
        publicKey : ""
    }
    // 출력 값 지갑 주소 첫번째가
    const txOutput : TxOutput = {
        address : wallet01.account,
        amount : 50
    }

    // 월래 이 트랜젝션을 mempool
    // 블록 생성했을대 첫번재 트랜잭션을 ㅗ만들어서 넣어준다
    const coinbaseTx = new Transaction([], [txOutput]);
    // 거래의 서명 생성
    coinbaseTx.signInputs(wallet01);
    // 서명검증 이후에 트랜잭션 추가
    mempool.addTransaction(coinbaseTx);
  })

  test("트랜잭션 mempool조회", () => {
    console.log(mempool, "qwe");
  })

  test("트랜잭션 처리", () => {
    // mempool.transactions[0]
    // utxo 처리
    // 이전 처리과정 블록에 트랜잭션 기록된 과정
    const block = blockChain.addBlock([JSON.stringify(mempool.transactions[0])])
    utxoLedger.updateTransaction(mempool.transactions[0])
    mempool.removeTransaction(mempool.transactions[0].id)
    console.log(utxoLedger.utxos, "ww")
    // 미사용 객체 생성
    // 트랜잭션의 처리과정에서
    console.log(blockChain.chain);
  })

  test("지갑에서 사토시 이체", () => {
    // UTXO 조회해서 잔액 가져오기
    const utxos = utxoLedger.getUtxoAddress(wallet01.account)
    console.log("잔액 : ", utxos);
    console.log("첫번째 지갑의",utxoLedger.getBalance(wallet01.account) )
    // 보낼 금액
    const sendValue = 20;

    const txInput : TxInput = {
      txId : utxos[0].txId,
      outputIndex : utxos[0].outputIndex
    }
    // 출력에 따른 계산 출력값 계산
    // 
    const tx = new Transaction([txInput], [{
      address : wallet01.account, amount : 30
    }, {
      address : wallet02.account, amount : 20
    }])
    // 서명 생성 내가 한일이 맞아 나는 이사람한테 송금할꺼야
    tx.signInputs(wallet01); // 수수료가 발생하지만 우리는 없어
    console.log("서명 검증", tx.verifyInputs())
    mempool.addTransaction(tx);

    // 우선순위 
    // 트랜잭션 가져와 mempool
    const block = blockChain.addBlock([JSON.stringify(mempool.transactions[0])]);
    console.log(block);

    utxoLedger.updateTransaction(mempool.transactions[0]);
    mempool.removeTransaction(mempool.transactions[0].id)
    console.log("젓 번재 지갑의 잔액은", utxoLedger.getBalance(wallet01.account))
    console.log("두 번재 지갑의 잔액은", utxoLedger.getBalance(wallet02.account))
  })

})
