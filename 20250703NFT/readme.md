# NFT (Non-fungible-token) 대체 불가능 토큰

> erc20 대체 가능한 토큰 수량
> erc721 nft는 대체가 불가능한 토큰
> nft 수량이 이니고 각각의 고유한 값ㅇ르 식별자로 가지고있는 토큰이다
> 토큰은 각각의 고유한 속성을 가지고 있어서 대체가 불가능하다 token id

{
    name : nft name 
    uri : ipfs 경로 => nft의 컨텐츠의 경로
    desc : description
    att : NFT DNA
}

### nft 를 사용한 목적성
> 플랫품에서 사용하는 용도나 상징성 들에 따라서 목적이 달라지겠지만
> 블록체인 네트워크에서 id를 식별자를 부여해서 그 식별자에 맞는 nft 즉 디지털 데이터가 원본이다
> 컨텐츠의 내용은 복사가 가능하다. 하지만 원본을 추구하는 방향성은 배포자 그리고 토큰 아이디를 통해서 신뢰는 주는 형태를 목적성을 가지고 있었다.

> 아이유 nft 를 만들었어 개인이 만들었다. 아이유 엘범을 올리고 판매

> 아이유가 속해있는 회사에서 nft를 만들고 굿즈로 발행 신뢰성을 얻을수 있고 토큰의 식별자로 대체가 불가능한 형태를 검증할수 있다 0 ~ 1000
> 게임을 좋아했다. sword 0 sword 1
> 게임을 좋아했다. 검 0 {설명 : "누구누구의 검"} 검 1

> 돈 투자 기술 개념 (상태계의 아름다움으로 봐야한다)

### NFT 의 동작
> erc721 표준의 형태로 안전한 오픈소스를 사용해서 컨트랙트로 작성
> EVM가상 머신을 가지고 있는 네트워크의 컨트랙트에서 개발이 가능하다
```json
    address : 100
    {
        "tokenId" : 1, // 각각의 nft의 식별자 역활과 대체 불가능하다는것을 표현하는 속성
        "owner" : "address", // nft 의 소유자 
        "metadata" : { // data containing the detail 
            "name" : "name",
            "image" : "ipfs 주소 or 데이터베이스 이미지 주소",  // 컨텐츠의 경로를 표현하는 속성
            "description" : "설명",
            "attributes" : ["필요한 속성값을 정의할때 사용한다"]  // 디폴트 값을 설정할때는 trait_type 과 value를 사용하면 된다.
        }
    }
```

### nft 의 가치는 있냐?

> 막연히 만든다고 가치가 매겨지는 것은 없다.
> 가치보다는 블록에 기로되는 데이터 검증된 데이털이고
> 어디에서 누가 발행을 하는가 사용성의 대한 보상이 있는가?
> 저작권을 표현하는 방식은 저작권이 복사를 뜨면 애매하다. 대체불가능한 값ㅇ르 가지고 있는 nft로 표현발행하는 컨트랙트도 중요


### ipfs(interPlanetary file system) 거의 약자이다
> 중앙화된 서버 없이 파일을 공유할수 있는 탈중앙 파일 시스템
> 핀 고정을 하고 노드도 호스팅 할수 있는 pinata
> 클라우드 기반 ipfs 핀닝(pining) 서비스다
> ipfs의 분산 저장 시스템을 사용하느 오래된 내용ㅇ의 피일들은 순서대로 사라진다. 영구적인 데이터의 저장이 어렵다 저장한 파일의 핀닝(고정) 을 해두면 오래되어도 데이터가 사라지지않기때문에 영구적인 데이터를 표현할수 있다. 노드 

### pinata
> ipfs 자장소의 공급자 (provider) 역활 
1. 파일을 업로드 : ipfs에 파일 업로드
2. 핀 관리 : 업로드한 파일을 지속시키는 역활
3. api 문서 제공 : 내부 api 의 문서를 제공하고 기능을 제공 

### pinata 문서

> 파일 저장을 시키면 블록의 단위로 분할해서 저장한다. ipfs는 큰용량의 파일은 256kb씩 나눠서 블록으로 표현 고유 식별자 CID

[파일]
 V
[블록] [블록] [블록]
파일의 쪼개져서 저장을 하도
 V 해시화 
CID0 CID1 CID2
 V 머클트리를 사용해서 만든 값이
CID => 파일의 내용을 가지고 만든 주소 => 해시값의 형태를 가지고 있는 주소
/main/content
> 파일이 내용이 변하면 주소도 변경된다.
> 머클 트리의 구조를 사용

> 루트 해시값으로 요청을 보냈다
root CID
V
CID0, CID1, CID2
(블록) (블록) (블록) 

> CID로 저장된 블록의 위치를 찾아서 파일을 응답받는 형식의 데티터베이스
> DHT (distributed Hash Tables) 분산 저장된 블록의 내용을 노드에게 요청해서 하나하나 블록을 조회해서 블록 조회해서 블록을 조합한 파일


### 피나타 업로드
> 피나타웹에서 파일을 업로드했다 이름을 클릭해보면 피나타에서 제공하는 ipfs 조회 api 
> 표준화가 되어있자 않다. 피나타에서 조회를 하지않고
> ipfs 에서 조회를 할수 있다. http://gateway.pinata.cloud/ipfs/bafybeigkiuth2whxn2ekng56nog2uwhterkpxzfelmtdft2favi7hnm2hy


### 피나타 이미지 파일 업로드 json 업로드
### 만들어진 경로를 가지고 ㅇmint erc721 표준으로 (erc721 컨트랙트 작성)
### 오픈씨에서 확인

내일 우리 리액트에 UI로 표현을 하면서 판매 로직을 컨트랙트를 만든다


### erc721 표준

```js
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.1.0) (token/ERC721/ERC721.sol)

pragma solidity ^0.8.20;

import {IERC721} from "./IERC721.sol";
import {IERC721Metadata} from "./extensions/IERC721Metadata.sol";
import {ERC721Utils} from "./utils/ERC721Utils.sol";
import {Context} from "../../utils/Context.sol";
import {Strings} from "../../utils/Strings.sol";
import {IERC165, ERC165} from "../../utils/introspection/ERC165.sol";
import {IERC721Errors} from "../../interfaces/draft-IERC6093.sol";

/**
 * @dev Implementation of https://eips.ethereum.org/EIPS/eip-721[ERC-721] Non-Fungible Token Standard, including
 * the Metadata extension, but not including the Enumerable extension, which is available separately as
 * {ERC721Enumerable}.
 */
abstract contract ERC721 is Context, ERC165, IERC721, IERC721Metadata, IERC721Errors {
    using Strings for uint256;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    mapping(uint256 tokenId => address) private _owners;

    // how many nft do i have nft balance
    mapping(address owner => uint256) private _balances;

    mapping(uint256 tokenId => address) private _tokenApprovals;

    mapping(address owner => mapping(address operator => bool)) private _operatorApprovals;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }





QmTAVE4MusBgTpkWWfy1itwugv2ZzipNsxMwk84yzrhY4v
QmPC5kQeQdG9ReuQjtnZrfy8F4ZuM9Arf4pEFXF3h3gP9j