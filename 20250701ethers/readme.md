# ethers, erc20 만들수 있는 컨트랙트 erc721 선행 학습 

### ethers의 개발 목적
> 비트코인이 2008년에 제안되고 이후 2015년에 이더리움이 네트워크가 제안되었고 Dapp 을 개발할때 즉 플랫품 상호작용을 하기 위한 라이브러리 RPC 통신과 지갑의 서명을 다루는 라이브러리
> 초창기에는 web3 가 유일한 라이브러리였다. 불안정했고 업데이트가 느리다 유지보수가 좋지않다.
> 공식 이더리움 제단에서 관리를 하는 라이브러릴 코드의 최적화 부분에서도 좋지 않았다


### ethers 라는 라이브러리를 개발
> ethers 개발한 암호학자 richard moore
> web3를 사용하다가 불편한 점을 생각해서 직접 라이브러리를 개발
> ethers 개발할때 목표는 가볍고 안전하고 정리가 잘되어있는 라이브러리

1. 웹앱에서 라이브러릴의 사용이 가볍도록 제작
2. 문서가 정말 잘정리되어 있다.
3. 트랜잭션 서명등 민감한 내용은 오픈소스로 코드를 공개해서 안전하게 검증
4. 명확한 메서드 명 상ㅇ자가 읽기에 쉬운 명명규칙 

> 컨트랙트 개발자 커뮤니티에서 ethers의 인기가 상승하고 web3 보다 버그 혹은 직관적인 명명규칙
> 다른 라이브러리와 호환이 좋았다.

> 현제는 노믹 파운데이션에서 솔리디티 공식 문서를 관리하는 닽체
> 수익구조는 없고 기부 기여자 중심으로 생태계 활성화를 위한 단체 비영리 단체

### ethers
> 이더리움 네트워크와 상호작용 할수 있는 자바스크립트 라이브러리
1. 지갑 계정 생성
2. 스마트 컨트랙트 호출
3. 이벤트 감지
4. 블록 계정 잔고 확인


- 3 가지로 간단하게 나누면
1. 공급자  // new web3 하는거 저럼  (Provider)
2. 서명자   // wallet   
3. 컨트랙트   // abi ca new web3.eth.Coontract(abi, ca) 과 비슷다

1. 공급자
```js
const ethers = require("ethers");


// web3 할때 메타마스크 커낵션 객체
// 인퓨라 엔드포인드 커낵션 객체
new Web3(window.ethereum)
new web3("http:........")

const provider = new ethers.JsonRpcProvider() // endpoint 전달할수 있는 
const provider2 = new ethers.BrowserProvider(window.ethereum)  // browser metamask 연결
```

2. 서명자
```js
// 새로운 지갑을 생성
// 공개키 개인키
const wallet = ethers.Wallet.createRandom()  

wallet.address
wallet.privateKey

// 지갑을 생성이후에 안전하게 개인키를 저장하고 있다가
// 개인키로 지갑 생성을 하게 되면
const wallet = new ethers.Wallet("개인키", "공급자")
// wallet 객체에 추상화 공급자를 통해서 전달하고 RPC 요청을 보낼수 있는 메서드가 포함된 객체
// 서명자 객체로 트랜잭션 발생
const transaction = await wallet.sendTransaction({
    to : "받는 계정 주소",
    value : "보내는 이더량"
})
// 블록에 트랜잭션이 기록되어서 트랜잭션 처리
// transaction 비동기 처리의 메서드가 제공된다
await transaction.wait();
```

3. 컨트랙트

```js
const contract = new ethers.Contract("CA", "ABI", "서명자(wallet)");
// 개인키 서명자 공급자의 엔드포인트 컨트랙트의 함수의 내용
const name = await contract.name(); // 조회 함수 
// 토큰 전송
const transaction = await contract.transfer("받는 사람 주소", "토큰 량");
// msg.sender 부분은 곡급자의 공개키로 포함된다.
// 이벤트 내용 조회
// on 이벤트를 구독 즉 이벤트 호출마다 전달한 콜백함수를 호출시킨다
contract.on("이벤트 이름", (from, to, amount) => {
    console.log(from, to, amount)
})
```


### Random 디지몬 뽑기

> erc20 토큰을 디지몬을 뽑을수 있다.

> 디지몬의 구조를 정의해서 사용할것. => 구조체 객체의 형태를 정의
> 이미지 경로 url, 디지몬의  이름 name

{
    url
    name
}
ipfs 분산 p2p 저장소에 저장된것을 사용

> 디지몬을 하나 구매하는데 토큰의 가격
> 10 개 토큰을 지불하면 디지몬 뽑기 할수 있다.

> 상품의 리스트 => 사람들에세 UI적으로 표현할수 있고 상품이 뭐가 있는지 랜덤한 인덱스를 뽑아서 어떤 상품을 사용자의 소유권으로 줘야하는지 데이터

> 랜덤 뽑기를 했을 때 소유권을 저장해줄 상태변수
{ 
    address : [{
        url 
        name    
    }, {
        url 
        name    
    }
    ]
}

조회 용도의 이벤트
{
    address
    name
    url
}

```sh
npx hardhat ignition deploy ignition/modules/DigimonModule.js --network sepolia

react frontend folder 안에 들어가서
npm i ethers
```

fladramon
https://digimon.net/cimages/digimon/fladramon.jpg

xiquemon
https://digimon.net/cimages/digimon/xiquemon.jpg

Vmon
https://digimon.net/cimages/digimon/v-mon.jpg

shiramon
https://i.namu.wiki/i/BTSk62d449lfxCkaK5yBN6a2-JjVvwvMRJimR_EAu4Ng_FwRJLNg2fbZaZCNgoYTJ7_b0ipO9Eko1q42iXTpCw.webp




> 뽑은 다지몬을 다른사람에게 소유권을 전달
> 필터기능 내 이력만 보이는것 그리고 상태방 이력들 전부 보이는거
> 다른 사용자가 유입 됬을때 토큰이 없러서 디지몬을 못뽑는다. => 다른 계정들이 컨트랙트에 이더를 송금하면 토큰을 발행 ERC20
> 컨트랙트 배포자는 쌓여있는 이더를 다시 출금 가능