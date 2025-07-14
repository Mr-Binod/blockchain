# factory pattern and dao (decentralized autonomous organisation)

> 탈중앙화된 자율적으로 운영되는 조직
> 전통적으로 단체나 조직은 중앙의 관리자가 의사를 결정하는데
> DAO 는 모두가 자율적인 중심을 ㅗ의사를 결정한다.
> 모든 의사결정은 토큰을 기반으로 한 투표로 진행된다. (거버넌스 토큰)
> 자금을 컨트랙트로 조달해서 운영을 하는 방향성을 투표로 결정한다.


## DAO 배경과 역사
> DAO 는 조직에서 발생하는 거버넌스 문제 자산의 납용 믿을수 없다
> 기술(개념)로 해결하려고했고
> slock 팀이 이더리움 스마트 컨트랙트로 DAO 제안했고 자금을 투자받아서 누구나 투표할수 있도록 구성했다
> DAO 토큰을 구매하면 거버넌스 톸큰 즉 의사결정에 투표할수 있느 권한을 얻을수 있다
> 스마트 컨트랙트 취약점이 발생해서 6000만 달러의 이더리움 탈취가 발생했다. the DAO

## 이더리움의 해결방안
1. 하드포크 할거냐?
2. 소프트 포크 할거냐?
3. 아무것도 안할거냐?
4. DAO 에서 해결할거냐?

> 이더리움은 하드포크를 결정했다 그래서 체인이 두가지로 나뉘게 되었다.
> 이더리움 머지된 체인과 이더리움 클래식
1. 이더리움  : 사람들을 보호하는 것을 목표로 결정헀다
2. 이더리움 클래식 : 블록체인의 원칙에 절대적인 결정 지키는 것을 목적으로 결정했다.


> 이 두가지는 누가 잘못했다고 할수 없고 절대성과 협상의 내용을 가지고 DAO 의 탈중앙화는 규칙의 절대적인 적용이 아니고 커뮤니티의 합의와 규형 윤리 등을 결정하는데 성장을 헀다 
> THE DAO 의 해킹 사건은 읻더리움의 성장과 탈중앙화가 단순한 기술이 아니라 공동체의 철학 선택의 내용이 많이 포함된 역사의 큰 분기점


## DAO (ERC 4907 형태의 제안) 
> 자율성이 높은 컨트랙트이기 때문에 표준의 규칙성은 정해져있지 않다
> 컨트랙트의 내용에 자율적인 내용이 많이 포함되기때문에 표준으로 작성하지 않는다
> 컨트랙트의 내용은 자율적 
> 인정받기위한 숙제가 아직끼지 해경되지 않았다 법 관련된.

1. 토큰 
> DAO 의사결정에 참여할수 있는 권한을 거버넌스 토큰 (erc20, erc721등) 토큰을 의사 결정에 참여할 사람에게 부여해서 권한을 준다

### DAO 는 분산 자율 조직
> 중앙 집권식이 아닌 탈중앙화 조직의 규칙으로 운영되는 컨트랙트를 작성해서 컨트랙트에서 의사 결정 관리가 이루어 진다
> DAO 의 특징 4 요소 분산화, 투면성, 자율성, 저항성 등 탈중앙화의 운영의 멤버들로 구성된 투표를 규칙을 정해서 컨트랙트에서 제어한다
> 거버넌스에 참여해서 승인 또는 거부를 할수 있다.

### DAO 의 진행

- 제안
- 멤버
- 제안 (투표 시스템)
- 제안 (유예)
- 실행(닽수결, 제안을 실행)

### the DAO 사건의 취약점
- 공격 컨트랙트를 호출해서 이더를 출금하는 메서드를 재귀저긍로 요청을 통해 이더를 탈취했다. 
상태밴경이 지기전에 여러번 호출이 되어서 문제

### checks-effects-interactions 패턴
> 단계별로 코드를 작성하는 규칙을 기지고 작성해한다.
1. checks : 검증
2. effects : 상태변수 변환
3. interactions : 외부 컨트랙트 호출
> 컨트랙트의 코드를 작성하는 
> 조건문 먼저 검증 호출하고 상태 전환 하고 이후에 외부 CA에 요청을 해라
> 상태변수를 변경을 하고 나서 이더를 전송해샤한다
> 내부 컩트랙트 먼저 상태 변환 호출하고 외부 컨트랙트 상태 변환 호출 이후에 이더 전송 호출 재진입 공격을 대비핤 있다.

```solidity
import "./_myInterset";
contract myBank {
    mapping(address => uint) balances;
    myIntrest = _myIntrest;
    constructor(address _CA) {
        _myIntrest = myIntrest(_CA)
    }

    receive() payable {
        balances[msg.sender] += msg.value;
        _myIntrest.setIntrest(msg.sender, msg.value);
    }
    function withdrawl(uint amount) payable {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        _myintrest.getIntrest(msg.sender, amount);
        address payable(owner).transfer(amount)
    }
}

// 인행 컨트랙트이니까 이자를 줘야겠다
contract myIntrest {
    mapping(address => uint) balances;
    // 이자를주기 위해서 누가 얼마를 입금했는지 기록
    function setIntrest(address owner, uint _balance) external {
        balances[owner] += _balance;
    }   
    // 이자가 쌓이는 시간 

    function getIntrest(address owner, uint _balance) external {
        // 이자를 주는 량
        uint intrest = balances[owner] / 10;
        balances[msg.sender] -= _balance;
        address payable(owner).transfer(intrest);
    }
}

```

### 목적
> 외부 컨트랙트를 호출해서 재진입 공격을 할때 방지하기 위해서 사용하는 패턴
> 검증 -> 내부컨트랙트 (상태변수 변경 완료) -> 외부 컨트랙트 호출

### 뮤택스 패턴 (재진입 공격 방지를 위한 가드)
- 재진입 공격은 상태변수 변경전에 메서드를 재귀저그올 호출해서 문제가 생겼던 것
- 방지할 값ㅇ르 하나 만들어서 실앻중이면 메서드를 호출할수 없게 만드는것



```solidity
import "./_myInterset";
contract myBank {
    mapping(address => uint) balances;
    // 잠금 장치 가드의 값
    bool private lock;
    constructor() {
        // 가드가 풀렸다
        lock = false;
    }

    function withdrawl(uint amount) payable {
        require(!lock);
        // 줄금 검증 로직 겁증

        // 가드 활성화
        lock = true;

        // 상태 변수 변경


        // 이더 전송
        // 호출이 모두 정상저그올 진행되면 가드 비활성화
        lock = false;
    }
}


```

### 컨트랙트의 가스비 절약을 위해서
### 조건 논리 제어자
- 조건분으 재사용성을 높일수 있다.

```solidity
// modifier 조건 논리 제어자
modifier onlyOwner() {
    require(msg.sender == owner);
    _; // 본문 위치를 정해서 표시하는 구문은 _;
}

// 조건식에 대한 가스비가 절감
function ownerMint() public onlyOwner {
    _mint();
}

//--------------with parameter

// modifier 조건 논리 제어자
modifier onlyOwner(address _owner) {
    require(_owner_ == owner);
    _; // 본문 위치를 정해서 표시하는 구문은 _;
}
 
function ownerMint() public onlyOwner(msg.sender) {
    _mint();
}

```


### factory pattern
> 스마트 컨트랙트에서 컨트랙트를 배포하는 로직을 작성하는 컨트랙트
> 공장 컨트랙트 인스턴스를 생성하는 컨트랙트

> 조직을 여러개를 생성할수 있는 컨트랙트
> DAO 컨트랙트를 팩토리 컨트랙트로 인스턴스 생성해서 
> 커뮤니티 생성

```solidity
import"./ERC721.sol";
contract FactoryNFT {
    ERC721[] Nfts = [];
    mapping(address => ERC721[]) Nfts;
    function createContract(string memory _name, string memory _symbol) {
        // 있는 컨트랙트 update
        ERC721 newNFT = ERC721(address);

        // 컨트랙트 생성 새로운 CA 생긴다
        ERC721 newNFT = new ERC721(_name, _symbol);
        Nfts[msg.sender].push(newNFT)
    }
}
```


### 우리가 만들 DAO 컨트랙트
> 여러개의 DAO 조직을 만들수 있고
> 그 조직에 참여할수 있는 참여자를 등록해서 
> 투표에 참여
> 투표 종료후 승인 거부 여부를 체크

### 리믹스 ID
> 이더리움 계열의 컨트랙트를 작성하고 배포 디버깅 할수 있는 웹 기반
개발환경을 제공한
> VS챙ㄷ 의 작업 환경이 호환된다 즉 작업환경의 내용을 요청으로 보내서 커넥션 상태에서 작업을 진행핤 있다.
> 저렴한 테스트환경 즉 빠르게 작업할때 필효한 테스트환경을 제공한다

> 간단하고 빠른 테스트를 제공한는 웹기반 개발 환경

remixd -s <path-to-the-shared-folder> -u <remix-ide-instance-URL>
remixd -s . -u https://remix.ethereum.org