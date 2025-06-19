"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const utill_1 = require("../utill");
const blockhash_1 = require("../utill/blockhash");
const blocktarget_1 = require("../utill/blocktarget");
class Block {
    constructor(headers, body) {
        this.version = headers.version,
            this.height = headers.height,
            this.timestamp = headers.timestamp,
            this.previousHash = headers.previousHash,
            this.difficulty = headers.difficulty,
            this.data = body.data,
            this.nonce = 0;
        this.setMerkleRoot(body);
        this.setHash();
    }
    setMerkleRoot(body) {
        // 머클루트의 기능 utill 에 뺴놓기
        this.merkleRoot = (0, utill_1.createMerkleRoot)(body);
    }
    // 본인 인스턴스의 해시를 만들때
    // 마이닝
    setHash() {
        // 해시를 만드는 기능을 utill
        // 목표값 블록의 채굴 생성권한을 얻는 목표값
        // 목표값보다 낮은 해시값을 구하는것
        const target = (0, blocktarget_1.createBlockTarget)(this.difficulty);
        // 블록 생성 
        const createHashDto = {
            version: this.version,
            height: this.height,
            timestamp: this.timestamp,
            previousHash: this.previousHash,
            difficulty: this.difficulty,
            merkleRoot: this.merkleRoot,
            nonce: this.nonce
        };
        while (true) {
            // block 해시 생성
            const Currenthash = (0, blockhash_1.createBlockHash)(createHashDto);
            this.hash = Currenthash;
            this.nonce++;
            if (BigInt("0x" + Currenthash) <= BigInt(target))
                break;
        }
    }
}
exports.Block = Block;
