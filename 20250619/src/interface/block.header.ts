export interface IBlockheader {
    version : string;
    height : number;
    timestamp : number;
    previousHash : string;
    difficulty : number;
    merkleRoot : string;
    nonce : number;
}