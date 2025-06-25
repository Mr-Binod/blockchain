# 솔리디티 코드 작성

## SPDC-License_Identifier:MIT
> 스마트 컨트랙트의 신뢰성
> 저작권 문제 방지를 위해서 코드의 상단에 주석으로 표현

## pragma
> 컴파일러가 읽고 버전에 맞는 문법의 내용을 멐파일을 진행하기 떄문에
> 솔리디티 작성한 버전을 명시

## contract 
> 객체 지향 자바스크립트로는 class 문법과 유사
> contractd의 내부에 코드를 작성하고 바이트 코드로 변화해서 탈중앙화 데이터를 저장한다.
> 상태변수 조회 혹은 변경을 하기위한 계약의 코드 내용을 작성한다


### 상태변수 
> 컨트랙트의 내부에 선언된 변수
> CA의 storageRoot에서 검증한다

1. storage : 블록체인 탈중앙화 데이터를 영구적으로 기록하는 데티터
2. memory : 함수가 실행되는 동안만 값ㅇ르 메모리에 기억하고 동작이 끝나면 해제시킨다

### 상태변수의 자료형 

### 상태변수의 자효형

- 정수형
    1. uint : 음수로 떨어지지 않는 양수 최대 256 비트의 범위를 사용한다
        - uint4, uint8, uint16 : 이런 식으로 작성하는 형태는 메모리의 크기를 지정할수 있다

        uint8
        uint8

    2. int : 음수 양수 다 포함되는 정수형 타입 - 부호가 있는 정수형 (can contain -ve number)

- bool
    1. bool : 디폴트 값이 true 참과 거짓을 나타내는 데이터 타입
    
- 주소형
    1. address : 이더리움의 20 바이트 주소를 표현하는 자료형 EOA혹은 CA address타입에는 payable 이더를 보낼수 있다. (내부적으로 객체의 형태)

    ```js
        address wallet;
        function sendBalance (address _wallet) public payable {
            // msg : msg 보낸 사람
            // msg : 전역에 포함되어있는 객체
            // payable 의 함수에 이더리움을 보내면서 호출했다
            // msg.sender => 트랜잭션이나 메시지를 발생시킨 주소
            // msg.balance => 보낸 이더의 량
            wallet  = address(_wallet)
            wallet.sender
            // transfer() : 이더를 보내는 메서드도 포함이 되어있다.
        }

- 문자형 
    1. string : "" '' 으로 표현, 가변적인 길이의 문자열을 포함할수 있는 데이터 타입 "안녕" 인코딩. 가스비용이 바이트 타입과 비교해서 높다.

    2. bytes : 문자열보다 더 저수준의 바이트 단위 처리 가능 문자열보다는 가스비가 낮다

    ```js
        keccak256() // 문자열 비교할때는 keccak256함수를 사용해서 해시후에 비교하면 가스비 절약을 할수 있다.
    ```

- enum 
    > 상태를 표현하는 형태의 값ㅇ르 숫자로 나타낼수 있는 데이터 타입

    ```js
        enum State {
            Pending, // 0 
            Accepted, // 1
            Rejected // 2
        }

        State state === 0 // 최초에 값은 0의 값
        state = State.Accepted // 상태의 전환할때 값은 숫자형이 들어가지만 개발자의 가독성은 높일수 있다. 문자형 비교는 가스비를 많이 발생시키니까 숫자형으로 상태의 제어를 할수 있다.
    ```

3. msg
    > 전역 객체 
    > 함수를 호출할때 전달되는 정보를 가지고 있다 트랜잭션 혹은 메시지

    1. sender : 트랜잭션을 호출한 주소
    2. value : 트랜잭션을 호출한 주소가 보낸 이더의 량
    3. data : 함수 호출에 내용이 포함된 데이터의 전체 메시지
    4. sig : 호출된 함수의 식별자 (오픈 소스로 구현된 ERC (Ethereum Request for Comment) 의 메서드를 호출할때 이 값ㅇ르 비교해서 민팅 메서드 호출이라던지를 검증한다)  4 바이트 만큼 자른 함수의 이름의 식별자.

```js
    contract FOO {
        address owner; // 컨트랙트 배포자
        constructor {   // 컨트랙트 배포
            // 생성자 함수에 msg는 컨트랙트 배포자의 트랜잭션
            owner = msg.sender; // 컨트랙트 배포자의 주소
        }
        // payable  이더를 보낼수 있는 함수
        function reward () public payable {
            // 배포자 이면 if
            require(msg.sender === owner, "error")

            // 이더를 송금할때 사용할수 있는 전역 메서드 payable 키워드가 있을때
            // ether 전역으로 사용할수 있는 값
            payable(msg.sender).transfer(0.1 ether)
        }
    }

```

### 저금통
> 저금통 주인이 있고 주인이 다른 사람들이 송금해서 저금하면
> 사용자가 한번에 출금할수 있는 량을 정할수 있도록 입금 내용은 로그로 관리


- address 심화 
    > 주소의 형태가 맞는지 검증과 주소의 타입을 ㅗ변환할수 있는 탕입
    > 주소의 크기는 20 바이트의 크기로 자료형이 계정의 주소를저장할때 사용하는 타입
    > 컨트랙트의 주소를 저장을 할수도 있고 배포자의 주소를 저장을 할수도 있는 변수를 선언할때 사용한다.
    > EOA (Externally Owned Account) 에서 -> transaction -> CA (contract account)-> 메시지 -> CA

- 배열 타입
    string[] strArr = ["1","2","3"]; // 등적 배열 선언
    string[2] strArr2 = ["1","2","3"] // 정적 배역 선언 길이가 고정된 배열

- 객체의 타입을 정의하는 타입
    struct Boo {
        string name;
        uint age;
    }

    Boo("name", 123) // 타입에 맞는 객체를 생성하기위해서 DTO

- 객체 생성 mapping
    > mapping 데이터를 잘 활용하면 가스비 절약을 할수있다.
    > 많은 데이터는 mapping에 설계를 잘해서 보관을하고 가스비를 절략

    mapping(address => uint) token; // 콜백함수 전달하는것처럼 
    // mapping {address : uint} similar to this
    // token 는 소유자를 표현하고싶다
    token = {
        address : 10
        address2 : 20
        address3 : 30
    }

    mapping(address => mapping(address => uint))

    token[address1] === 10

- 글로벌 변수 
    - block // 전역 변수
    // 블록에 포함되는 데이터의 내용을 호출할수 있다
    // 트랜잿견 처리가 됬을때 기록되는 블록의 내용을 포함하고 있는 전역 변수
    block.coinbase // 채굴한 사람의 주소 
    block.difficulty // 현재 블록의 난이도
    block.gaslimit // 현재 블록에 사용 가능한 가스 최대 값 블록에 한정된 데이터를 기록할수 있는데 그 기록에 포한되는 가스 최대량
    block.number // 블록 높이
    block.timestamp // 블록 생성 시간

    // block 에 있는 값을 활용해서 랜덤값을 구할떄도 사용할수 있다.

    msg.sender // 호출 계정
    msg.value // 트랜잭션으로 전달받은 이더량
    msg.data // 전제 메시지 내용
    msg.sig // 메서드의 이름 부분만 자른 해시 문자열 4 바이트 

### 함수

```js
// function name (type paramname) is this public or only for view and returns(uint type)
function Foo (uint index) public or view returns(uint) {

}
```

### 접근 제어자
1. public : 외부호출과 내부호출 둘다 가능한 함수 (내부 호출할때 사용)
2. external : 외부 호출만 되는 함수 => public처럼 못써요? (this 붙여서 사용할수 있는데 이게 gasfee가 더 들어요) (외부에서 호출할때 사용)
3. private : 현재 컨트랙트 내부에서만 호출이 가능하다. 상속에서는 호출할수 없다 X
4. internal : 내부에서 함수를 호출할수 있고 상속 받은 경우에도 호출 가능하다. (CA => CA로 호출은 X) (CA 에서 CA를 상속받은 경우에는 상속받은 CA의 internal 함수를 호출할수 있다)



### 수정자
1. view : 조회의 목적을 가진 상태변수의 접근을 할수 있지만 수정은 불가능하다. 가스비가 발생사지 않는다
2. pure : 상태변수에 접근할수 없다. 순수함수 매개변수로 전달받는 값 혹은 함수 내부에 선언한 값 혹은 전역 객체를 사용해서 반환하는 함수 순수함수 (web2 => random) pure ㅈ듀3 에서 랜덤값ㅇ르 구해서 보여주거나
3. payable : 이더를 보내거나 받을때 제어를 해주는 예약어 결제를 처리할수 있는 수정자. 이 속성이 있어야 이더를 보낼수 있다

### 조건문
// require
    함수의 형태 require(조건문, 에러로그) 조건문이 맞지 않으면 가스비는 반환된다
    조건문이 잘 통과하면 밑에 코드를 실행한다. 조건에서 에러가 발생하면 사용되는 가스비느 반환되고 에러로그를 출력

### 저금통 주인이 있는 저금통 => 은행의 구조

1. 지갑의 관리자 주소 은행 주인이 한명 있어야한다. => DAO 지갑들의 자산을 가져가는건 아니고 지갑이 입금하면 출금할때 얼마씩 출금할수 있는지.

2. 각 주소의 잔액을 나타낼 객체 mapping 주소와 잔액을 표현하면 되겠다

3. 각각의 사용자의 잔액을 전부 표현할 상태변수? [] 상태변수로 배결을 선언해서 이벤트 로그 로그가 찍히는데 console.log() 디버그 로그 로그가 네트워크에 기록외는 로그를 사용해서 보녀주면 더 최적화가 된다.

4. 컨트랙트가 배포되면 실행되는 생성자에서 돤리자 주소를 할당

5. 이더 입금 함수 외부 => 이더 제어 payable 속성을 가지고 있어야 한다

6. 이더 출금 함수 외부 호출 => 이더 제어 payable 속성을 가지고 있어야 한다

7. 관리자 계정을 접속했을때 출금한도 조정 함수 외부 === 관리자 계정인지 체크하는 로직

8. 입금자의 잔액을 표현할 함수 외부 호출 view 속성을 가지고 있다

9. 출금 한도를 조회하는 함수 외부 view 속성

10. 은행의 전체 잔액을 표현하는 함수 이더를 얼마나 가지고 있는지 외부 view 속성 가지고 있고


for project purpose
# truffle,  hardhat, 

for test purpose
# remix


"0xcdf55642a1649918b571baa08e684ccaa47b08d8"

blockHash
: 
"0x2c98c7c25b8ca29668e23f5b9cf7bb787d9f23ad3d9ae5ced8dc3a85858c4b9e"
blockNumber
: 
8623771n
contractAddress
: 
"0xa49c30b9fc55a4fb1f70ecc08038af0276c87da7"
cumulativeGasUsed
: 
1647785n
effectiveGasPrice
: 
2514679589n
from
: 
"0xd093954425a10f2dec1dca52eca245b72288a3cd"
gasUsed
: 
390042n
logs
: 
[]
logsBloom
: 
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
status
: 
1n
transactionHash
: 
"0x846de8f28d1443244881dad6ced7bbc722aa2e579583e215e56c0e4b4e715c72"
transactionIndex
: 
6n
type
: 
2n