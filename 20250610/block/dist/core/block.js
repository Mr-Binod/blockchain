"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sha256_1 = __importDefault(require("crypto-js/sha256"));
const merkle_1 = __importDefault(require("merkle"));
class Block {
    constructor(_previousBlock, data) {
        this.version = "1.0";
        this.previousHash = _previousBlock.hash;
        this.timestamp = new Date().getTime();
        this.merkleRoot = Block.getMerkleRoot(data);
        this.height = _previousBlock.height + 1;
        this.nonce = 0;
        this.difficulty = 100;
        this.hash = Block.createBlockHash(this);
        this.data = data;
    }
    static createBlockHash(_block) {
        const { version, previousHash, timestamp, merkleRoot, hash, nonce, difficulty } = _block;
        const value = `${version}${previousHash}${timestamp}${merkleRoot}${nonce}${difficulty}`;
        return (0, sha256_1.default)(value).toString();
    }
    static getMerkleRoot(_data) {
        const merkleTree = (0, merkle_1.default)("sha256").sync(_data);
        return merkleTree.root();
    }
    static findBlock(generateBlock) {
        let hash;
        let nonce = 0;
        while (true) {
            nonce++;
            generateBlock.nonce = nonce;
            hash = Block.createBlockHash(generateBlock);
            const binary = Block.hashToBinary(hash);
            console.log("0".repeat(generateBlock.difficulty), '22');
            const result = binary.startsWith("0".repeat(generateBlock.difficulty));
            console.log('mining', nonce++, binary, '22', result);
            if (result) {
                generateBlock.hash = hash;
                return generateBlock;
            }
        }
    }
    static hashToBinary(hash) {
        let binary = "";
        for (let i = 0; i < hash.length; i += 2) {
            const hexByte = hash.substring(i, 2);
            if (hexByte.length < 2)
                continue;
            const dec = parseInt(hexByte);
            const binaryByte = dec.toString(2).padStart(8, "0");
            binary += binaryByte;
        }
        return binary;
    }
    static isValidNewBlock(previousBlock, newBlock) {
        if (previousBlock.height + 1 !== newBlock.height) {
            return { isError: true, value: '이전 블록 높이 비교 검증 실패' };
        }
        if (previousBlock.hash !== newBlock.previousHash) {
            return { isError: true, value: '이전 블록 해시 검증 실패' };
        }
        if (Block.createBlockHash(newBlock) !== newBlock.hash) {
            return { isError: true, value: '블록 해시 검증 실패' };
        }
    }
    static generateBlock(_previousBlock, data) {
        const generateBlock = new Block(_previousBlock, data);
        const newBlock = Block.findBlock(generateBlock);
        return newBlock;
    }
}
let newBlock;
let newBlock2;
const Genesis = {
    version: "1.0",
    height: 0,
    timestamp: new Date().getTime(),
    hash: "0".repeat(64),
    previousHash: "0".repeat(64),
    merkleRoot: "0".repeat(64),
    difficulty: 100,
    nonce: 0,
    data: ["미국 경제 위기 뉴옥 타임즈 2008 블룸버그"]
};
const data = ["tx01", "tx02"];
const data2 = ["tx02", "tx03"];
newBlock = Block.generateBlock(Genesis, data);
if (newBlock) {
    newBlock2 = Block.generateBlock(newBlock, data2);
}
console.log(newBlock, 'newblock');
console.log(newBlock2, 'newblock2');
const isValidBlock = Block.isValidNewBlock(Genesis, newBlock);
if (isValidBlock === null || isValidBlock === void 0 ? void 0 : isValidBlock.isError) {
    console.log("검증 에러", isValidBlock);
}
exports.default = Block;
