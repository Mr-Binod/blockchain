"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chain = void 0;
const block_1 = require("./block");
class Chain {
    constructor() {
        this.blocks = [];
    }
    // 인스턴스에 포함되어있어야하면서 외부에서 호출이 되어야하는 메서드
    getLatestBlock() {
        return this.blocks[this.blocks.length - 1];
    }
    genereateblock(blockbody) {
        const previousBlock = this.getLatestBlock();
        const blockDto = {
            version: "1.0.0",
            height: previousBlock.height + 1,
            timestamp: Math.floor(Date.now() / 1000),
            previousHash: previousBlock.hash,
            difficulty: this.adjustDifficulty()
        };
        const newBlock = new block_1.Block(blockDto, blockbody);
        this.blocks.push(newBlock);
        return newBlock;
    }
    // 인스턴스 내부에서만 호출되어야하는 메서드
    adjustDifficulty() {
        const latestBlock = this.getLatestBlock();
        const prevAdjustBlock = this.blocks[latestBlock.height - 10];
        // 블록 생성 목표 시간
        const timeExpected = 600 * 10 * 10; // 60000 60 초
        // 이전 블록에서 걸린 시간
        if (!prevAdjustBlock)
            return latestBlock.difficulty;
        const timeTaken = latestBlock.timestamp - prevAdjustBlock.timestamp;
        if (timeTaken < timeExpected / 2) {
            return prevAdjustBlock.difficulty + 1;
        }
        else if (timeTaken > timeExpected * 2) {
            return prevAdjustBlock.difficulty - 1;
        }
        else {
            latestBlock.difficulty;
        }
    }
}
exports.Chain = Chain;
