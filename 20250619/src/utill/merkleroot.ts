import merkle from "merkle"

import { IBlockbody } from "../interface/block.body"


export const createMerkleRoot = ({ data }: IBlockbody): string => {
    if (data.length === 0) return ("트랜잭션의 길이 에러")
    const merkleTree = merkle("sha256").sync(data)
    return merkleTree.root()
}