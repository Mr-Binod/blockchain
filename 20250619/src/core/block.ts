import { IBlockbody } from "../interface/block.body";
import { createMerkleRoot } from "../utill";
import { createBlockHash } from "../utill/blockhash";
import { createBlockTarget } from "../utill/blocktarget";
import { IBlockDto, IBlockhashDto } from "./dto";

export class Block {
    version: string;
    height: number;
    timestamp: number;
    previousHash: string;
    difficulty: number;
    merkleRoot: string;
    nonce: number;
    hash : string;
    data : string[];
    constructor(headers : IBlockDto, body :IBlockbody) {
        this.version = headers.version,
        this.height = headers.height,
        this.timestamp = headers.timestamp,
        this.previousHash = headers.previousHash,
        this.difficulty = headers.difficulty,
        this.data = body.data,
        this.nonce = 0

        this.setMerkleRoot(body)
        this.setHash()
    }
    
    private setMerkleRoot(body : IBlockbody) {
        // 머클루트의 기능 utill 에 뺴놓기
        this.merkleRoot = createMerkleRoot(body)
    }

    // 본인 인스턴스의 해시를 만들때
    // 마이닝
    private setHash() {
        // 해시를 만드는 기능을 utill
        // 목표값 블록의 채굴 생성권한을 얻는 목표값
        // 목표값보다 낮은 해시값을 구하는것
        const target = createBlockTarget(this.difficulty);
        // 블록 생성 
        const createHashDto : IBlockhashDto = {
            version : this.version,
            height : this.height,
            timestamp : this.timestamp,
            previousHash : this.previousHash,
            difficulty : this.difficulty,
            merkleRoot : this.merkleRoot,
            nonce : this.nonce
        }

        while (true) {
            // block 해시 생성
            const Currenthash = createBlockHash(createHashDto)
            this.hash = Currenthash
            this.nonce ++
            if(BigInt("0x" + Currenthash) <= BigInt(target)) break;
        }
    }

}