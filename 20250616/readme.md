# 블록, 체인, 디지털 서명 (지갑)

## 블록
- 헤더 바디

### 블록 헤더
- 버전
- 높이
- 해시
- 이전 블록 해시
- 머클루트
- 논스
- 난이도

### 블록 바디
- 데이터 (트랜잭션)


## 블록 체인 
> 블록의 이전 블록해시에 이전에 생성된 블록의 해시 할당되어있기 떄문에 이전 블록의 값이 변조되면 이후 블록부터의 연결성이 끈긴다 => 정답 체인이 될수 없다

### 지갑
> 블록에 기록되는 데이터 즉 트랜잭션을 생성할수 있는 개인키와 공개키를 가지고 있는 사용자 (타원곡선 알고리즘) 을 사용해서 서명을 만들고 서명을 포함한 트랜잭션 내용을 검증 이후에 블록에 기록한다.


### 트랜잭션 
> 거래 내용을 객체의 형태로 정의한다.(비트코인) 
> 거래 내용을 mempool 이라는 트랜잭션 대기중 상태를 담는 공산에 담아놓는다.
> 블록의 생성 권한을 누군가 얻고 그 블록에 처리할 트랜잭션 내용들이 담긴다. 블록이 합의가 끝나고 샌성 되고 트랜잭션득이 블록에 포함되게 되면 트랜잭션 처리 완료
> UTXO 라는 잔액을 관리하는 공간에 잔액 객체들을 담아놓는다. => 잔액의 량을 관리하는 미사용 객체


### 트랜잭션

1. 트랜잭션은 ?
2. 비트코인의 트랜잭션
3. 미사용 객체의 모델
4. mempool


#### 트랜잭션은

> 트랜잭션은 블록체인에서 상태의 변화 즉 거래내용의 변화
> 누군가 누구에세 얼마를 송금했다라는 기록의 의미
> 누가 누구에게 송금한 내용과 서명의 내용 (내가 직접 한일이 맞다.) 이후 반환되는 결과의 잔액값ㅇ르 가지고 있다.
> 블록체인에서 트랜잭션은 불변성을 의미하는것. 위변조 될수없는 거애의 내용을 가지고 있다.
> 모든 트랜잭션은 네트워크에 분산 저장시켜서 관리 (장부를 여러개로 체인의 형태로 모든 노드가 가지고 있다. 롱기스트 체인 룰 합의 알고리즘을 사용해서 하나의 장부를 만드는 역활) 암호회된 디지털 서명을 가지고 위변조 검증

#### 비트코인의 트랜잭션
> 백서 기준으로 사토시 나카모토가 백서에서 p2p 디지털 캐시
> 제 3 자인 은행이 없는 상황에서 송슴이 가능하려면 이전 거래의 소유권이 필요하다. 트랜잭션의 내용에 누군가 소유권을 표현하기 위해 txout 트랜잭션의 결과값을 UTXO 에 저장했다

```js
const tx = {
    version : 1 ,
    input : {
        txID : "0xasbvkkjaos123812lkjhakbdjquw012n"  // 거래를 조회할때
        voutIndex : 1 , // 이전에 트랜잭션 결과 중에 결과에 대한 잔액 어떤 이전 트랜잭션을 가지고 사용했냐?
        sign : "서명의 값",
        sender : "0xklajslfo234i9034p1023jdaslkf"
        receiver : "0xjkladhofahufhsa0983owehfr9p1"
        amount : 30,
        fee : 0.02
        }
    output : {
        values : [
            {
            account : "지갑 주소",
            value : 10
            },
            {
            account : "지갑 주소",
            value : 20
            },
            ]
        }
    }
```


#### UTXO 모델 (계정 모델)
> 비트코인의 잔액을 관리하는 모델
> UTXO의 잔액은 트랜잭션의 입출력을 기반으로 잔액의 객체를저장하는 공간
> 사용하지않은 트랜잭션 즉 output의 값을 합이해서 저장한다
> Unspent Transaction Output의 약어 미사용 트랜잭션 출력값
> 거래를 처리할때 사용된 객체는 제거시키고 새로운 출력값의 객체를 저장한다
> 해서 미사용 객체만 관리하는 공간

> 한줄 요약 트랜잭션의 input 을 참조해서 출력값을 저장하는공간


#### mempool 
> 블록에 저장되기 전에 거래 내용들이 처리중에 있다.
> 거래가 처리되는 순간은 블록에 기록이 되고 체인에 추가되었을대 (합의 끝났을때)
> 트랜잭션 즉 거래 내용들이 mempool에 대기중으로 쌓여있다가
> 블록을 생성할때 일부분의 트랜잭션을 포함시켜서 채굴을 한다.   
> 트랜잭션 유효성 검증이나 수수료에 대한 우선순위를 정하고 블록 생성자에세 우선순위가 높은 트랜잭션을 전달.

> 브트코인에서 mempool의 수수료 byte 기준으로 정렬
> 제한된 크기를 초과하면 낮은 수수료는 트랜젝션에서 제거
> 우선순위에서 밀리면 다음 블록에 추가


### 서로 노드가 되어서 p2p 
> 같은 와이파이 상에 v4 주소로 접근해서 서로 피어를 주고받아서 채굴을 해볼것.

