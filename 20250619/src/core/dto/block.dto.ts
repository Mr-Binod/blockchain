
// 블록 생성핡때 전달할 데이터 형태
export interface IBlockDto {
    version : string;
    height: number;
    timestamp: number;
    previousHash: string;
    difficulty: number;

}