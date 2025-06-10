
// 값의 해시화
// 비트코인과 이더리움
// sha256  방식의 해시 알고리즘을 사용한다


// sha256 블록체인에서 가장 많이 체택되고있는 암호 방식
// 256비트로 구성된 64 자리의 문자열로 암호화를 한다

const {SHA256} = require("crypto-js")

const str = "hello"

// console.log(SHA256(str))
// {
//   words: [
//      754077114,  1605411598,
//      652753706,  -977673570,
//      454434396,   531055198,
//     1929655138, -1819568092
//   ],
//   sigBytes: 32
// }

console.log(SHA256(str).toString())
// 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824

console.log(SHA256(str).toString().length)
// 머클루트에서 sha256 으로 암호화를 하고 거래내용을 암호화
// 단방향 암호화 

// 머클루트 

// 거래 내용들
// A B C D
// A (해시화) + B (해시화), C (해시화) + D (해시화), E
// AB, CD
// AB (해시화) + CD (해시화), E
// ABCD, E
// ABCD (해시화) + E (해시화)
// ABCDE   THE FINAL RESULT IS CALLED MERKROOT AND THE PROCESS IS CALLED MERKTREE


const merkle = require('merkle')

const transactions = ["A", "B", "C", "D", "E"] 

const merkleTree = merkle("sha256").sync(transactions);
console.log(merkleTree)
// {
//   root: [Function: root],
//   level: [Function: level],
//   depth: [Function: depth],
//   levels: [Function: levels],
//   nodes: [Function: nodes],
//   getProofPath: [Function: getProofPath]
// }
const root = merkleTree.root()

console.log(root)
// AE4F3A195A3CBD6A3057C205DEF94520930F03F51F73C5A540D8FDAB05163FEF


// 단방향이라면서 검증은 어떻게할거냐?
// 원본을 알아야 검증이 되는게 아니도
// 암호화를 다시 해봐
// 다시 암호화를 값이 같으면 검증 통과

// 블록의 해시 검증 또한 같아. 다시 암호화
