import { IBlockbody } from "../interface";
import { Block } from "./block";
import { IBlockDto } from "./dto/block.dto";

export class Chain {
    blocks : Block[] = []

    constructor() {

    }

    // 인스턴스에 포함되어있어야하면서 외부에서 호출이 되어야하는 메서드
    getLatestBlock() : Block {
        return this.blocks[this.blocks.length - 1];
    }
    genereateblock (blockbody : IBlockbody) {
        const previousBlock = this.getLatestBlock();
        const blockDto : IBlockDto = {
            version: "1.0.0",
            height: previousBlock.height + 1,
            timestamp: Math.floor(Date.now()/ 1000),
            previousHash: previousBlock.hash,
            difficulty: this.adjustDifficulty()
        }
        const newBlock = new Block(blockDto, blockbody)
        this.blocks.push(newBlock)
        return newBlock
    }

    // 인스턴스 내부에서만 호출되어야하는 메서드
    private adjustDifficulty () : number {
        const latestBlock = this.getLatestBlock();
        const prevAdjustBlock = this.blocks[latestBlock.height - 10];
        // 블록 생성 목표 시간
        const timeExpected = 600 * 10 * 10;  // 60000 60 초
        // 이전 블록에서 걸린 시간
        if(!prevAdjustBlock) return latestBlock.difficulty;
        const timeTaken = latestBlock.timestamp - prevAdjustBlock.timestamp
        if(timeTaken < timeExpected / 2) {
            return prevAdjustBlock.difficulty + 1
        }  else if(timeTaken > timeExpected * 2) {
            return prevAdjustBlock.difficulty - 1;
        }else {
            latestBlock.difficulty
        }
    }
}