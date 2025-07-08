# 프록시 패턴
> 컨트랙트를 배포했는데
> 컨트랙트를 업데이트 하고싶지만 불변성을 가지고 있는 컨트랙트는 수정이 불가능하다
> 이더리움의 스마트 컨트랙트는 코드의 내용도 데이터다 그래서 한번 배포하면 변경이 불가능하다
> 블록 체인의 불변성의 특징을 가지고 있기때문에

## 불변성의 컨트랙트를 프록시 패턴으로 해결
> 프록시 패턴은 컨트랙트의 상태와 로직을 분리해서 로직을 교체할수 있는 컨트랙트로 만드는 가장 기본적인 업그레이드 방식
> 클라이언트 -> 프록시 컨트랙트(상태) -> (대리 호출) delegate call -> 로직 컨트랙트 (로직)


### EVM의 구조
> EVM 스택 (stack) 기반의 가상 머신 // stack last in first out
> 예를 들어서 2 3 ADD -> 3 + 2  = 5

## inline assembly 최적화 도구

> 솔리디티는 고급 언어이고 복잡하거나 최적화 즉 주소의 값이나 가스에 접근을 하기 위해서는 저수준 언어인 inline assembly를 사용해서 최적화 할수 있다

```solidity
assembly (
    let result := add(1, 2);
    mstore(0, result);
    return(0, 32);
)


```

### assembly
> 솔리디티는 고수준 언어 즉 우리가 보기 쉬운 형태의 언어다 이 코드는 컴파일되어서 EVM에서 실행이 될때 바이트코드로 변환해서 실행시킨다 
> 이런 바이트코드를 직접 사용해야하는 경우가 발생할수 있는데 이부분은 메모리의 영역을 직접 조작해야하는 경우
> 가스 최적화, 스토리지 슬롯에 메모리 영역에 직접 참조. delegate call의 저수준 대리호출 명령을 할때 

### 정리본 EVM assembly 정리
1. solidity 코드는 고수준 언어 사람이 읽고 작성하기 위한 언어
2. assembly 코드는 EVM에서 실행하는 바이트 코드 즉 저 수준 언어와 가까운 언어 컨트랙트 내에서 작성할수 있다

컨트랙트 -> opcode 나열 변환 -> 바이트코드 기계어로 변환해서 실행 

```solidity
assembly (
    // 괄호 안에 opcode 내용 작성
)

// uint 32byte 사용한다 
function getSlot() public view returns(bytes32 value) {
    assembly(
        // slots 에 있는 값 접근
        value := sload("admin_slot")
    )
}

# OpCode

// sload : 스토리지의 값ㅇ르 읽어온다
// sstore(slot, value) : 스토리지에 값ㅇ르 저장  storage (permanent)
// mstore : 메모리에 값ㅇ르 저장
// mload : 메모리에 저장된 값을 읽어온다  memory (temporary)
// calldataload : 호출 데이터의 값을 참조
// delegatecall : delegatecall 로직의 대리 호출을 사용한다
// return(ptr, size)   // ptr = pointer 특정 메모리의 영역의 값을 반환 
// revert(ptr, size) : 특정 메모리의 영역을 에러의 값으로 반환 

```


### EVM 중요성
- 블록체인의 불변성 EVM 스택 머신 즉 push -> pop 이 가능한 데이터의 구조를 가지고 있다.
> 어셈블리 코드를 작성해서 low level의 언어로 코드를 작성할수 있다
> 메모리나 스토리지에 직접 접근이 가능하다
> 가스비 절감의 장점 그리고 코드를 보는 시각이 opcode즉 EVM의 명령어 순서로 볼수 있을때 장점을 가질수 있다

### proxy 컨트랙트로 카운터를 업데이트

```solidity
contract Count {
    uint count = 0;
    function increment () public {
        count += 1;
    }
}
contract CountV2 {
    uint count = 0;
    function increment () public {
        count += 1;
    }
    function decrement() public {
        count -= 1;
    }
}

contract Proxy {
    // 대리 호출을 할 주소
    // 대리 호출할 컨트랙트의 주소 
    address public implementation;
    // version up 되어도 값이 유지된다
    uint count = 0;
    constructor (address _implementation) {
        implementation = _implementation;
    }

    // ether 전송을 받았을때
    receive() {

    }

    // fallback
    // 내가 transaction으로 함수를 호출했는데 함수내용이 없어서 실패한 경우 실행된다
    // 호출이 실패하면 함수의 내용이 없었다는 것이므로 프록시 컨트랙트에선는 fallback이 호출됬을때 대리호출을 시켜서 함수가 정상적으로 호출되면 상태 업데이트를 시키면 된다
    // returns error
    // msg.data == 0x함수이름해시값0000000000000000000 매개변수
    fallback() external payable {
        require(implementation != address(0)) 
        assembly{
            // 데이터를 복사해야하는데 어디서? 호출 내용을 calldatacopy 로 복사해서 사용
            // 데이터의 내용을 사이즈만큼 복사해서 가지고 있고
            // 이 데이터가 호출의 내용의 데이터이기때문에 이 데이터를 가지고 대리호출을 할것
            calldatacopy(0, 0, calldatasize());
            // 0 주소에 첫번째 데이터부터 마지막 데이터까지 복사 
            // 메모리에 가지고 있는다

            // 대리호출
            // 대리호출의 결과를 담을 변수
            // 인다 값의 숭서
            // 트랜잭션을 처리할수 있는 가스량
            // 로직 컨트랙트의 주소
            // 복사한 호출 데이터
            // 복사한 데이터 참조를위해서 사이즈의 값 만큼
            // 마지막으로 반환값ㅇ르 반환의 위치와 값의크기를 지정을 한다
            // 대부분 0, 0
            let result := delegatecall(gas(), implementation, 0, 
            calldatasize(), 0, 0)
            // 대리호출 성공하면 1의 값ㅇ르 반환
            // 대리호출 실패하면 값을 0
            // 성공했을때 실패했을때 
            switch result 
            case 0 {
                // 대리호출 실패 했을때
                // returndatasize 반환받은 데이터의 사이즈를 반환 오류내용으로
                revert(0, returndatasize())
            }
            default {
                // 대리호출 성공 했을때
                revert(0, returndatasize())

            }
        }
    }
    
    // count v2로 바꾼다
    function setImplementation (address _CA) external {
        implementation = _CA;
    }
}
```

1. 카운트 컨트랙트 배포
2. 프록시 컨트랙트 배포 카운트컨트랙트 주소 전달
3. 프록시 컨트랙트에 트랜잭션을 보내는데 어떻게 카운트 컨트랙트의 abi 주소를 가지고 요청 주소는 프록시 컨트랙트 (abi는 카운트 컨트랙트)
4. 프록시 컨트랙트의 상태변수가 변경된다
5. 카운트 버전 2을 배포하고
6. 프록시 컨트랙트에 카운트 버전 2의 부소를 전달
7. 카운트 버전 2 abi로 프록시 컨트랙트 주소를 가지고 마이너스 호출
