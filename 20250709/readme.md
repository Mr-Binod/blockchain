# 계정 추상화 ERC4337 의 가스 리스
> 계정 추상화 ERI의 내용이 지금까지 추상화 혹은 트랜잭션의 구조 서명의 구조


## EIP 2771 가스 리스 대납의 내용
- 기존 트랜잭셩 구조를 유지하면서 상위 트랜잭션의 풀을 하나더 만들었다

- front -> backend 
- eoa -> bundler(transaction pool) -> (contract) entry point -> evm

- gas paymaster


### user Operatins (프론트에서 보내는 객체의 형태 혹은 컨트랙트에서도 가능하다)
> EIP 2718 미래의 거래 유형을 위해서 새로운 트랜잭션 풀의 유형을 정의한다
> 기존의 트랜잭션을 수정하지 않기 위해서 
> 기존 트랜잭션을 수정하면 안되는 이유. 이전 버전과 호환되지 않을수 있다
> 새로운 트랜잭션 pool을 요청을 보내면 객체가 쌓인다 번들러에 처리되지 않은 userops 내용
> 번들러가 새로운 트랜잭션 풀을 가지고 있다 그냥 단순히 특별한 트랜잭션 풀이라기보다는 작업 데이터를 나열시켜놓는 메모리 영역
> Dapp의 환경에서 새로운 작업을 즉 트랜잭션을 보내기 위한 객체의 형태를 정의해서 요청(메시지)를 보내서 처리하는것

### Bundlers
> entity의 역활 객체(userOps)들을 가지고 있고 서명을 검증을 해서
> user operations 객체들을 pool에 수집하고 다중 서명 검증을 통해서 검증된 객체의 내용을 수집한 DTO의 데이터 핸여로 하나로 붂어서 컨트랙트 즉 ENTRYpOINT로 요청을 보낸다.

### Entry Point
> Bundlers 에서 요펑한 트랜잭션의 내용을 EVM의 트랜잭션 풀로 보내준다.


### 가스비의 대납 paymaster
> 사용자는 web3의 상태계를 모른다. 지갑도 모르고 가스비도 모른다
> 웹사이트를 이용하는데 web3의 사용감을 주기 위해서 가스비의 개념을 대신 처리해주는것
> web3 를 모르는 사용자들에게 가스비를 대신 내주고 이후에 BM모델을 구축

### 서명
> 서명의 로직도 우리가 암호학을 작성해서 여러가지의 서명도 겁증방식으로 추가해서 사용할수있다
> 상위 인프라에서 서명을 검증하는 암호학 로직을 추가할수 있다.


### 메타 트랜잭션
> EIP 2771 
> 사용자가 가스비가 없어도 트랜잭션을 처리할수 있도록 대신 트랜잭션 발생
> forwarder : 사용자가 서명한 트랜잭션을 중개해서 대납자가 대신 트랜잭션을 요청
> paymaster : 사용자의 가스비를 대신 지불하는 컨트랙트

1. 사용자가 지갑을 생성 => 비밀키 생성 혹은 4337 CA
2. 백엔드에 개인키로 서명한 서명값과 영수증 (작업 메시지) + 공개키 수집 검증
3. Bundler 트랜잭션 풀에 담아놓은 작업들을 하나의 트랜잭션의 형태로 만등러서 
4. paymaster가 트랜잭션을 발생시키면서 가스비 지불 => entry Point에서 서명을 검증하고
5. 트랜잭션 처리 완료


```sh
npx create-react-app dapp
```

### 메타 트랜잭션 가스 대납자
> erc20 토큰 발행의 가스비를 대납

fbc1960a886986637345636605e54f7f7e54d1b36f92ee1ec44c77820c444a17
test2 = 
8007cc0b255abbfef30119b64e9eff1f51f894762350d565738063c477ae6b4a
test3 = 1b9831dc1da105331a69206fed2be006b0987870d61edb791d71547bc755db58