import { Block } from "../block";

export interface IChain {
    chain : Block[];
    blockGenerateInterval : number; 
    // 목표시간 ㅣㅂ트코인은 블록 생성당 10 분 을 목표시간
    blockAdjustmentInterval : number; 
    // 몇개의 블록마다 난이도 조절을 할지 2016 개마다 난이도 조절한다
}