import { SHA256 } from "crypto-js";
import { IBlockhashDto } from "../core/dto";


export const createBlockHash = (BlockhashDto : IBlockhashDto) => {
    let Blockhash = "";
    for(const key in BlockhashDto){
        Blockhash += BlockhashDto[key]
    }
    return SHA256(Blockhash).toString();
}