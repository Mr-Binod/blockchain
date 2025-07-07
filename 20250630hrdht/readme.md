# Hardhat

> Hardhat 는 스마트 컨트랙트 개발에 사용되는 프레임워크 도구 (truffle, hardhat)(focus on tests and distribution), pounderi(focus for tests)
> Harthat 노믹 파운데이션 비영리 단체에서 만든 오픈소스 프레임워크 트러플 보다 가볍고 사용이 편하게 되었다

> 이더 워커스 개발자의 커뮤니티에서 부터 시작된 프로젝트
> 수익은 따로 없지만 파트너쉽 등을 제공받고 사회에 기여하고 있다
> 오픈 제플린 알케미 등등 기업에서 파트너쉽 하고있다.
> chain link 스폰서 

### hardhat 사용하는 목적
> 이더리움 스마트 컨트랙트 개발에서 필요한 테스트코드 혹은 배포 환경을 구축하는데 사용할수 있다
> 프레임워크 형태로 제공한다
> hardhat network 로컬에서 가상의 이더리움 노드를 실행시켜서 메모리에 잠시 블록 생성을 하는 테스트 로직을 제공한다. 가스비가 들지 않는 테스트가 가능하다 하지만 로컬에서만 
> 배포 스크립트를 작성해서 배포로직을 추상화 시킬수 있다.
> 플러그인 사용가능 web3나 ethers 같은 플러그인을 사용할수 있다.
> 테스트 환경이 기본을 ㅗ제공되어서 스마트 컨트랙트 함수의 로직을 작성해서 단위 테스트를 진행할수 있다

(모카) + (차이) 환경을 제공한다
> 모카 (mocha): 자바스크립트로 작성된 비동기 테스트 러너를 제공한다. describe and it 등 구문으로 테스트 블록 작성 가능
> 차이 (chai): 테스트 어서션 라이브러리 expect 비교할때 베서드 제공

```js
descrbe("block test", () => {
    it("create block", () => {

    })
})

```


### Hardhat install

```sh
mkdir hardhat
npm i -D hardhat
npm i -D @nomicfoundation/hardhat-toolbox
npx hardhat

```


### Folder 구조
> contracts : 컨트랙트 파일 작성 폴더
> iginition/modules : 모듈식 배포 코드 컨트랙트의 내용의 abi bin 컴파일해서 만든 내용을 가지고 배포 로직을 실행하는 모듈 시스템 환경의 코드 작성
> test : 테스트 컨트랙트 테스트 코드 작성 가상의 네트워크 환경에서 테스트 로직 실행가능

### 컨트랙트 내용 작성
> 우리는 이전에 배운 erc20 표준 토큰을 내가 작성하는 컨트랙트에 상속 시켜서 로직을 작성할것
> 사용자가 이 erc 20 를 상속 받은 컨트랙트에 이더를 보내면 비율에 맞게 토큰을 발급하도록 작성할것
> 사용자간에 토큰을 전송할수 있는 컨트랙트



### Infura RPC 엔드포인트 제공
> infura 는 블록체인 네트워크 중에서 이더리움 ipfs 등의 접근 rest api 를 제공한다.
> Json-Rpc api 를 제공한다. AWS 에서 클라우드 호스팅 서비스 이용하던것처럼 node 호스팅 서비스를 제공한다. 우리가 노드를 실행하지 않아도 infura 에서 제공하는 호스팅 노드를 통해서 네트워크 전파를 할수 있다. 즉 인퓨라는 우리의 네트워크 배포나 rpc 호출 로직에서 중간 계층


### 특징
1. 자체 노드 운영 : 호스팅을 제공한다
2. 고가용성 API를 구축 : infura 를 사용할때 인프라가 잘 구성되어있어서 속도가 빠르다. 웹소켓 제공 https 방식 지원
3. 메타마스크도 사용하는 엔드포인트 : 우리가 이전에 사용한 메타마스크 엔드포인트로 인퓨라를 사용
4. infura 는 풀노드 api를 제공 : 우리가 설치를 받지 않아도 풀노드를 사용할수 있다.

> 기업에게 수익을 얻는 구조 아니면 유료 사용자

### Hardhat compiler 컴파일 및 배포
> compile :  npx hardhat compile
// 최신 문법
// --network sepolia it indicates network containing sepolia will be executed
> compile and distribution : 
```sh
npx hardhat ignition deploy ignition/modules/BingModule.js --network sepolia
```
> BingModule.js 에서 내보낸 모듈을 가져와서 컴파일 이후
> contract("BingToken", ["BingToken", "BTK"]); 
> wlwjdgks spxmdnjzmdp dyvjdgotj qovhfm wlsgod
> 터미널에 콘솔로 배포한 컨트랙트 주소 출력

### 폴더 구조
1. deployments/<네트워크 아이디> : 어떤 네트워크의 빌드 파일인지
2. artifacts : 배포한 컨트랙트의 abi와 메타데이터를 포함한 json 파일를 
3. build-info : 배포된 컨트랙트의 이름과 주소를 크값으로 저장
4. journal.jsonl : 배포가 진행되고 로그를 확인할수 있는 기록 각 배포과정의 이벤트를 표현하고 실패 원인이나 디버깅을 할수 있는 로그를 저장한다


web3 상호작용 : 


### test 코드 작성 (ethers) 스크립트 (web3)
> test 코드는 로컬에 이더리움 가상 네트워크를 가지고 사용하는 형태로 테스트 코드 작성
> script 라는 폴더에 프론트에서 작업하는 것처럼 퍼블릭 네트워크에 요청 보내서 로직 작업 ethers
> web3 는 기포의 내용이 많이 포함된 라이브러리 
> ethers는 모던한 내용의 라이브러리
> web3 는 철학이 라이브러리 모든 기능을 대형의 라이브러릴 구조로 작성 내용이 무겁다
> ethers는 철학이 작고 가볍게 개발자가 사용할때 최대한을 의존성을(dependency) 제공한다
> 