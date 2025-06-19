
// hash 값 만들때 필요한 데이터 전달 형태
export interface IBlockhashDto {
    version: string;
    height: number;
    timestamp: number;
    previousHash: string;
    difficulty: number;
    merkleRoot: string;
    nonce: number;
}