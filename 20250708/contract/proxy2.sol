// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract Proxy {
    // 컨트랙트의 슬롯 데이터 사용
    // keccak256 슬롯의 이름을 IMPL의 해시값으로 사용하기 위해서
    // IMPL_SLOT = 개발자가 개발할때 가독성
    // IMPL_SLOT 대리호출 컨트랙트 주소를 저장할 이름
    // 슬롯 영역을 해시 주소로 주소를 표현해야하기 때문에
    bytes32 public constant IMPL_SLOT = bytes32(uint(keccak256("IMPL")) - 1);
    // 슬롯의 영역은 CA를 저장해놓고 사용할것

    // 프록시 컨트랙트 배포자 슬롯에 저장
    // 주소는 음수로 떨어질수 없다 그래서 -1 로 체크
    // 주소 해시화
    bytes32 public constant ADMIN_SLOT = bytes32(uint(keccak256("ADMIN")) - 1);

    // 컨트랙트의 슬롯 메모리 영역 사용할 해시값
    constructor() {
        setOnwer(msg.sender);
    }

    function setImpl(address _CA) external {
        // Slot 슬롯의 영역에서 
        // Address 해시주소를 참조
        // getAddressSlot // 주소를 참조해서 그 주소에 값을 할당 혹은 조회
        Slot.getAddressSlot(IMPL_SLOT).value = _CA;
        /* 
            {
              스토리지 메모리영역 : {
                    IMPL_SLOT(해시값) : {
                        address value = _CA;
                    }
                }
            } 
        */
    }

    function setOnwer(address onwer) private {
        Slot.getAddressSlot(ADMIN_SLOT).value = onwer;
    }

    function getImpl() public view returns(address) {
        return Slot.getAddressSlot(IMPL_SLOT).value;
    }

    function getOnwer() public view returns(address) {
        return Slot.getAddressSlot(ADMIN_SLOT).value;
    }

    function delegate(address impl) private {
        assembly {
            // 메시지 내용 복사
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize()) // 반환된 데이터를 복사 해놓고 사용
            // 대리호출을 하고 반환된 데이터를 복사

            switch result
            case 0 {
                revert(0, returndatasize()) // 오류 발생하면 오류 출력 츌력 내용은 대리 호출로 반환받은 값
            }
            default {
                return(0, returndatasize()) // 성공하면 상태변수 변환
            }
        }
    }

    // 함수 호출에 실패하면 호출되는 함수
    fallback() external payable  {
        delegate(getImpl());
    }
}

// 데이터의 저장을 슬롯해 할수있는 라이브러리
// library 기능을 작성할 내용을 모듈화 시켜서 사용할수 있다.
// library 컨트랙트에서 재사용성이 높은 기능을 정리할수 있는 모듈화
library Slot {
    struct AddressSlot {
        address value;
    }

    // pure를 사용해서 상태변수 접근 X
    function getAddressSlot (bytes32 _slotAddress) internal pure returns(AddressSlot storage pointer) {
        assembly {
            // 주소 참조
            // 메모리의 주소를 반환 하기위해서 메모리의 주소를 참조
            // storage 스토리지 안의 메모리 영역에 접근 주소에 _slotAddress 값을 주소에 저장
            // sstore 처럼 값이 스토리지에 영구적으로 저장된다.
            pointer.slot := _slotAddress
            // 메모리 공간에 
        }
    }
}

