// jest 
// 테스트코드의 단일테스트 통합테스트 'TDD'
// 바벨 타입스크립트 노드, 리엑트 등 등 에서 테스트코드를 작성할수 있게 제공해주는 라이브러리

import Block from "../core/block";
import { IBlock } from "../interface/block.interface";

// npm i @jest/types

// 설정 파일 jest.config.js
// npx jest --init 



describe("block 테스트", () => {
    let newBlock;
    const Genesis :  IBlock = {
        version : "1.0",
        height : 0,
        timestamp : new Date().getTime(),
        hash : "0".repeat(64),
        previousHash : "0".repeat(64),
        merkleRoot : "0".repeat(64),
        difficulty : 0,
        nonce : 0,
        data : ["미국 경제 위기 뉴옥 타임즈 2008 블룸버그"]
    }
    // it 테스트의 최소단위
    it("블록 추가", () => {
        const data = ["tx01", "tx02"]
        newBlock = Block.generateBlock(Genesis, data)
        console.log(newBlock)
    })
    it("블록 유호성 검증증", () => {
        const isValidBlock = Block.isValidNewBlock(newBlock, Genesis);
        if(isValidBlock.isError) {
            console.log("검증 에러")
        }
    })
})

// npx jest -t 
// npx jest