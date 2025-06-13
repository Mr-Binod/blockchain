import { Block } from "../block";
import { Genesis, Version } from "../contents";
import { IChain } from "../interface/chain.interface";

export class BlockChain implements IChain {
    chain: Block[]; // 블록의 배열의 형태 (체인)
    blockGenerateInterval: number; // 목표 시간
    blockAdjustmentInterval: number; // 난이도 조절 주기

    constructor() {
        this.chain = [this.createGenesisBlock()]; // 최조의 블록 즉 제네시스
        this.blockGenerateInterval = 600; 
        this.blockAdjustmentInterval = 10; // 10블록마다 난이도 조절
    }

    createGenesisBlock () : Block {
        return new Block(
            Genesis.version,
            Genesis.height,
            Genesis.timestamp,
            Genesis.previousHash,
            Genesis.difficulty,
            Genesis.data
        )
    }

    // 체인에서 가장 마지막 블록 반환
    // 내가 마이닝할때 
    // 내가 체인에 블록을 추가하기위해서 이전블록은 체인에 가장 마지막 블록
    // 난이도 조정을 하기위해서 마지막 블록과 마지막 블록의 이전 10 번쨰 블ㄹ곡을 계산해서 난이도 조정
    getLatestBlock() : Block {
        // returning the last block in chain array
        return this.chain[this.chain.length - 1]
    }

    // 새로운 블록을 체인에 저장
    addBlock(data : string[]) : Block | null {
        const previousBlock = this.getLatestBlock();
        const newBlock = new Block(
            Version,
            previousBlock.height + 1,
            Math.floor(Date.now() / 1000),
            previousBlock.hash,
            // 블록의 생성 시간에 따라서 난이도가 조정이되어야한다
            // previousBlock.difficulty, 
            1000000000,
            data
        )

        // 마이닝해서 
        newBlock.mine();
        // 블록 유효성 검사
        if(Block.isValidBlock(newBlock, previousBlock)){
            this.chain.push(newBlock)
            console.log(this.chain)
            return newBlock
        }
        else {
            return null;
        }
    }

    // 난이도 저정
    // 최근 블록 생성 시간과 목표 생성시간을 비교해서 난이도를 변경
    adjustDifficulty() : number {
        const latestBlock = this.getLatestBlock();
        // 마지막 블록 이전 10번째
        const prevAdjustmentBlock = this.chain[latestBlock.height - this.blockAdjustmentInterval]
        // 10  블록 생성된 목표시간
        const timeExpected = this.blockGenerateInterval * this.blockAdjustmentInterval;
        // 이전 10 번쨰 블록 부터 걸린 시간
        if(!prevAdjustmentBlock) return latestBlock.difficulty;
        const timeTaken = latestBlock.timestamp - prevAdjustmentBlock.timestamp; // 차이값
        // 생성 시간보다 빨리 생성되면 난이도를 증가
        // 난이도가 샌성시간보다 빠른지 계산하는 공식
        if(timeTaken < timeExpected / 2) {
            return prevAdjustmentBlock.difficulty + 1
        }
        else if(timeTaken < timeExpected * 2) {
            // 생성 예상 시간보다 느리다면 난이도 감소 
            // 공식 예상 시간보다 총 목표시간 두배의 시간보다 걸리면 난이도 감소
            return prevAdjustmentBlock.difficulty - 1;
        }else {
            return prevAdjustmentBlock.difficulty
        }
    }

    // 체인의 유효성 검사
    static isValidChain (chain : Block[]) : boolean {
        for (let i = 0; i < chain.length; i++) {
            if(!Block.isValidBlock(chain[i], chain[i - 1])) {
                return false
            }
        }
        return true
    }

    replaceChain (newChain : Block[]) : boolean {
        const isValid = BlockChain.isValidChain(newChain); // 유효한 검증
        const isLong = newChain.length > this.chain.length; // 길이가 더 긴 체인인지 검증
        if(isValid && isLong) {
            this.chain = newChain;
            return true;
        }else {
            // 내 체인 교체 X
            return false;
        }
        
    }

}

