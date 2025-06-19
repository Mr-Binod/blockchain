import { Block } from "./core/block";
import { IBlockbody, IBlockheader } from "./interface";


const Genesisheader : IBlockheader = {
    version: "1.0.0",
    height: 0,
    timestamp: 1231006505000,
    previousHash: "0".repeat(64),
    difficulty: 0,
    merkleRoot: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
    nonce: 2083236893
}


const Genesisbody : IBlockbody = {
    data: ["The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"]
}



const Genesisblock = new Block(Genesisheader, Genesisbody)
console.log(Genesisblock);