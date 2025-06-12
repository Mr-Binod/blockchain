

// 테스트의 그릅
// describe 테스트의 그룹 정의

import { BlockChain } from "../chain";

// 관련된 테스트의 내용을 묶여주는 역활
describe("block chain 동작 테스트", () => {
    // 생성할 블록의 갯수
    const CreateBlockNum = 10;
    let blockchain : BlockChain;

    // beforeEach 각 테스트의 사전에 호출되는 함수
    // 각 테스트마다 먼저 호출되어야하는 로직
    beforeEach(() => {
        // 제네시스 블록이 하나 생성되어 있는 chain 인스턴스
        blockchain = new BlockChain(); 
    })

    test(`블록 샌성 테스트 ${CreateBlockNum} 개 체인 추가 검증`, () => {
        for (let i = 0; i < CreateBlockNum; i++) {
            const data = [`block num ${i} tx`]
            console.time("block create...");

            // 블록 생성하고 마이닝 하고 유효성 검사 통과하면 
            const block = blockchain.addBlock(data); 

            console.timeEnd("block created");
            if(block) {
                console.log(`블록 ${block.height} 번 / 난이도 ${block.difficulty} / nonce ${block.nonce}`);
            }
        }
    })
})