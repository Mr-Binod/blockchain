import { MAX_TARGET } from "../constant"

export const createBlockTarget = (difficulty : number) : bigint => {
    return BigInt(MAX_TARGET) / BigInt(difficulty);
}