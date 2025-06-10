import { IBlock } from "../interface/block.interface";
import SHA256 from "crypto-js/sha256"
import merkle from "merkle";

// crypto-js module type install
// merkle type install
// $ npm i @types/crypto-js @types/merkle
class Block implements IBlock {
    version: string;
    hash: string;
    merkleRoot: string;
    nonce: number;
    difficulty: number;
    height: number;
    previousHash: string;
    timestamp: number;
    data: string[];
    constructor(_previousBlock: Block, data: string[]) {
        this.version = "1.0";
        this.previousHash = _previousBlock.hash;
        this.timestamp = new Date().getTime();
        this.merkleRoot = Block.getMerkleRoot<string>(data);
        this.height = _previousBlock.height + 1;
        this.nonce = 0; // 블록의 연산 횟수
        this.difficulty = 100;
        this.hash = Block.createBlockHash(this);
        this.data = data;
    }
    //  현재 블록의 해시를 구하는 메서드
    // static 전역 메서드 인스턴슬에 포함되지 않고 인스턴스를 생성하지 않아고 호출할수 있는 메서드
    static createBlockHash(_block: Block): string {
        const { version, previousHash, timestamp, merkleRoot, hash, nonce, difficulty } = _block;
        const value: string = `${version}${previousHash}${timestamp}${merkleRoot}${nonce}${difficulty}`
        // console.log(SHA256(value).toString(),'ss')
        return SHA256(value).toString()
    }

    // 머클루트 구하는 메서드
    static getMerkleRoot<T>(_data: T[]) {
        const merkleTree = merkle("sha256").sync(_data);
        return merkleTree.root();
    }

    // 블록 생성
    // 블록의 검증 메서드
    // 마이닝 => 블록 생성의 권한을 얻기위해서 난이도에 맞는 답을 구하는 연산
    static findBlock(generateBlock: Block) {
        let hash: string;
        // 연산의 횟수
        let nonce: number = 0;

        // 루프 반복
        while (true) {
            nonce++; // 연산 반복 시작작
            generateBlock.nonce = nonce;
            hash = Block.createBlockHash(generateBlock)
            // 16 진수를 -> 진수로 변환해서
            // 문자열 앞에 값이 0의 갯수가 난이도 만큼 있는지
            // 00001000101110
            // 문자열 앞에 0의 갯수가 얼마나 포함되는지
            const binary = Block.hashToBinary(hash)
            // repeat 문자열을 반복 시켜서 문자열을 반환
            // "0" 을 difficulty 만큼 반복된 문자열을 만들어준다 "0000"
            const result: boolean = binary.startsWith("0".repeat(generateBlock.difficulty))
            if (result) {
                // 전답을 맞췄다
                // 블록을 추가할 권한을 얻은것
                generateBlock.hash = hash;
                return generateBlock;
            }
            console.log('mining', nonce++)
        }
    }
    static hashToBinary(hash: string) {
        let binary: string = "";

        for (let i = 0; i < hash.length; i += 2) {
            // 16진수를 -> 2 진수
            // 자리수 잘라서 10 진수로 변환한뒤에 2 짐수로로
            // 반복문에서 현재 인덱스에서 2 자리씩
            const hexByte = hash.substring(i, 2);
            if (hexByte.length < 2) continue;
            // 10 진수로 변경
            const dec = parseInt(hexByte);

            // 2진수로 변경
            // 8자리 고정의 8자리만큼 자리를 가지고 있어야한다
            // dec.toString(2) 이진수 문자열로 변환
            // padStart 고정문 문자열 길이를 가지고 남은 부분은 start메서드는 앞부분부터 채워준다
            const binaryByte = dec.toString(2).padStart(8, "0")

            binary += binaryByte;
        }
        return binary;
    }

    // 블록이 유호한지 검증하는 메서드
    static isValidNewBlock(previousBlock: Block, newBlock: Block) {
        if (previousBlock.height + 1 !== newBlock.height) {
            return { isError: true, value: '이전 블록 높이 비교 검증 실패' }
        }
        if (previousBlock.hash !== newBlock.previousHash) {
            return { isError: true, value: '이전 블록 해시 검증 실패' }
        }
        if (Block.createBlockHash(newBlock) !== newBlock.hash) {
            return { isError: true, value: '블록 해시 검증 실패' }
        }
        // 신뢰를 검증하기 위해서 블록 유효성(effectiveness) 검사 통과 
    }

    // 블록 추가 
    static generateBlock(_previousBlock: Block, data: string[]): Block {
        const generateBlock = new Block(_previousBlock, data);
        const newBlock = Block.findBlock(generateBlock)
        // 블록 생성 권한
        // 정답 찾았어
        return newBlock;
    }
}

let newBlock;
let newBlock2;
const Genesis: IBlock = {
    version: "1.0",
    height: 0,
    timestamp: new Date().getTime(),
    hash: "0".repeat(64),
    previousHash: "0".repeat(64),
    merkleRoot: "0".repeat(64),
    difficulty: 0,
    nonce: 0,
    data: ["미국 경제 위기 뉴옥 타임즈 2008 블룸버그"]
}
const data = ["tx01", "tx02"]
const data2 = ["tx02", "tx03"]
newBlock = Block.generateBlock(Genesis, data)


if (newBlock) {
    newBlock2 = Block.generateBlock(newBlock, data2)
}
console.log(newBlock, 'newblock')
console.log(newBlock2, 'newblock2')


const isValidBlock = Block.isValidNewBlock(Genesis, newBlock);
if (isValidBlock?.isError) {
    console.log("검증 에러", isValidBlock)
}


export default Block;



// npx tsc
// node dist/core/block.js