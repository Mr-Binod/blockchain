export interface IBlockHeader {
    version : string;
    height : number;
    timestamp : number;
    previousHash : string;
    merkleRoot : string;
    hash : string;
    nonce : number;
    difficulty: number;
}

// header

// body
export interface IBlock extends IBlockHeader {
    
    data : string[];
}

// data : IBockHeader {
    
// }

// data : string 
// data = '1'


// string number
// {name : }