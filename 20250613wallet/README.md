# 디지털 서명 타원곡선 알고리즘
> 암호화폐 지갑에 사용되는 서명값

## 지갑의 구성과 역활
> 기본적으로 암호화폐를 안전하게 보관할 수 있고, 암호화폐를 전달하거나 받을 수 있다.

## RSA 은행에서 사용하는 방식
> 공개키 비밀키의 비대칭키를 가지고 암호화한다.
> 공개키 암호화 방식 (비대칭 암호)
> 대칭키와의 차이점 : 키가 2개, 비밀키, 공개키 
> 공개키는 노출이 되어도 되는 키
> 공개키는 암호화의 검증을 하기위해서 사용한다. 비밀키를 포함한 값을 전달을 하고 공개키로 검증이 가능하다.
> 누가 이일을 한게 맞는지 => 공개키로 검증이 가능하다.
> 비밀키는 내 볼펜 => 서명을 데이터를 전달 => 공개키가 내 필체를 검증하는 역활
> 핵심은 n의 값을 가지고 있는 소수 p와 q를 역으로 추정해서 역산하는것이 불가능하다.
> n의 값이 무척 크기 때문에 소인수 분해가 어렵다.
> 비트 수가 1024개

## 타원곡선 ECC Elliptic Curve Cryptography
> 비트수가 160개
> 암호화의 질이 RSA와 비슷할정도의 강도가 있는데
> 값이 짧고 속도가 빠르다.
> 타원곡선 암호학은 공개키 암호화방식의 종류중에 하나다.
> RSA의 방식보다 키의 길이가 더 짧다. 하지만 보안의 수준은 RSA와 같은 수준의 보안의 형태를 제공한다.

```sh
# y^2 = x^3 + ax + b
# a 와 b 에 어떤 값이 들어가느냐에 따라서 곡선의 형태가 변한다

```

> 하지만 브트코인에서는 유한체의 위에 타원곡선이 정의된다
> X 와 Y 측의 큰 특정한 소수의 값 P 에 대한 마너지값으로 계산을 한다.
> 모듈 연산

### 타원곡선의 점 더하기
> 타원곡선 암호학의 핵심은 타원곡선의 위에있는 점들기리 덧셈을 하는 견산이 있다.


### ECDSA Elliptic Curve Digital Signature Algorithm 타원 곡선 디지털 서명 알고리즘
> 비트코인의 개인키는 메시지 (트렌잭션) 에 서명값을 만들고 다른사람들에세 공개키를 전달해서 그서명이 진짜인지 검증을 할수 있다. 여기서 사용되는 알고리즘이 타원곡선알고리즘
> 블록체인에서 사용하는 타웜곡선 알고리즘에서 사용하는 개인키
> 사용자가 남에게 공개하지않은 본인의 값 2^256의 점

> pq are in same point p = q to get R we use 2p = R


### 개인키와 공개키의 생성 과정
> 개인키는 256 비트 크기의 임의 숫자로 표현한다. 0 ~ n - 1 사이의 정수
> 개인키는 모두가 다르게 가지고 있는 무척 큰 숫자
> 개인키를 가지고 공개키를 만드는 수식은 공개키 = 개인키 * 생성된 점 ( 모두가 알고있는 점 )  secp256k1  p 의 point 표현하는것

### 개인키가 겹칠수도 있는것 아닌가
> 옛날에 비트코인 서명 만들때 개인키랑 서명에 필요한 난수의 값이 겹친
> 키의 공간이 무척크다
> secp256k1  비밀키는 약 2^256 개의 경우의 수중에 하나.
> 우주에 있는 원자의 수만큼 엄청 확율적으로 로또를샀는데 주마다 8 번 연속 당첨될 확율

### 개인키가 진짜 확율을 뜷고 겹치면 어떻게하냐?
> 경쟁 내가 더 빨리 한정된 자원을 쓰면 승자

### 개인키의 역산이 불가능한 이유도 
> 엄청 큰수 목차별공격을 해서 해킹을 시도를 할수있는 시간을 우주의 나이만큼 걸리수 있는 현실적으로 불가능한
시간 컴퓨터 성능으로 보았을때
> 약 100 경경경경 이상의 숫자크기 
> 우주의 원자수 만큼
> 비밀키는 사실상 우부에 존재하는 원자수의 큰 수숫자 범위에서 무작위로 뽑힌다. 이게 내 개인키
> 그래서 현실적으로 컴퓨터 연산으로 무차별 공격이 불가능하다.
> 모듈연산자 ===> 이름이 어렵지 ? 나머지 연산하는것. 15 mod 1 큰수를 나머지 연산 하기 위해서 그냥 쉽게 말해서 모듈연산자를 사용하는 이유는 나머지 연산을 하기위해서

```sh
# y^2 = x^r + ax + b; a = 0; b = 7;
# y^2 = x^3 + 7; (mod p) 거대한 소수를 구하기 위해서

# secp256k1 이름의 a 0, b 7, p 큰 소수
# secp256k1 비트코인과 이더리움에서 사용하는 이유는 다름 타원곡선보다 연산이 간단하고 속도가 빠르기 때문에 사용하게 되었다

```

### 곡선의 형태 
1. 정슈형 타원곡선 secp256k1 = y^2 = x^3 + ax + b
> 타원 곡선에섯 단순한 형태를 가지고 있는 곡선이다

2. 비상귤러 곡선
> 타원 곡선이 동작할때 특수한 점의 교차점이 없어야하는조건이 있는 곡선

3. 콘코디아 곡선 

### 블록체이의 개인키와 공개키

#### 개인키
> 임의 정수 1 <= n - 1 < G  엄청 큰 수중에 하나 이 값은 x y 좌표의 하나의 점으로 표현이 된다. 스칼라 곱 (곡선의 차수)

#### 공개키 
> P = k * g (생성 점 기준점) secp256k1 모두가 알고 있는 곡선

## 요약 
> G는 유한채의 소수 모듈러 공개키와 관련이 있는 개인키가 아니다.
> 개인키는 정수 k 
> 공개키 = k * G 연산은 곡선위에서 덧셈을 반복해서 구하는 형태로 사용한다.
> 방식이 안전한 이유는 k를 역으로 알아내응게 불가능 
> 수학 이산 대수 => 타원 곡선 이산 로그 문제라고 불린다다

> 개인키가 공개되면 내 모든것이 공개된다.

### 디지털 서명을 코드로 구현현
> 타원 라이브럴리 설치
> 타원곡선 함수를 제공하는 라이브러리


```sh
npm i elliptic