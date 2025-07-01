// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Digimon is ERC20 {
    uint private constant TOKEN_PRICE = 10 ether;
    // 디지몬 객체 형태
    struct Dig {
        string name;
        string url;
    }

    // 상품 나열할 상태변수
    Dig[] private Digimons;

    // 소유권을 표현할 상태변수
    mapping(address => Dig[]) private userDigimons;

    // 사용자가 디지몬을 뽑으면 이벤트 로그 기록
    event DigimonEvent(address indexed buyer, string name, string url);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100 * 10 ** decimals());
        Digimons.push(
            Dig(
                "fladramon",
                "https://digimon.net/cimages/digimon/fladramon.jpg"
            )
        );
        Digimons.push(
            Dig("xiquemon", "https://digimon.net/cimages/digimon/xiquemon.jpg")
        );
        Digimons.push(
            Dig("Vmon", "https://digimon.net/cimages/digimon/v-mon.jpg")
        );
    }

    // 내가 가지고 있는 디지몬 조회
    function getMyDigimons() external view returns (Dig[] memory) {
        return userDigimons[msg.sender];
    }

    // 전체 디지몬 종류
    function getDigimons() external view returns (Dig[] memory) {
        return Digimons;
    }

    // 디지몬 뽑기
    function buyDigimon() external {
        require(balanceOf(msg.sender) > TOKEN_PRICE);

        // 토큰 소각
        _update(msg.sender, address(0), TOKEN_PRICE);

        // 인덱스 가져오고 상태변수를 값복사 메모리
        uint index = _random();
        // 뽑은 디지몬 변수
        // memory is similar to ... spread function used while copying the values
        Dig memory digimon = Digimons[index];

        // 객체에 sqbracket 사용해서 키 생성하고 할당 할수 있다
        // {123 : 0}
        // userDigimons["123"] = 0
        userDigimons[msg.sender].push(digimon);

        emit DigimonEvent(msg.sender, digimon.name, digimon.url);
    }

    // create Random index
    function _random() internal view returns (uint) {
        // block.prevrandao 작업 증명 관련된 랜덤 난수 생성
        // 예측을 할수 없는 난수를 생성학때 효과적은 값ㅇ르 제공한다
        // 검증자 선택 등등의 값ㅇ르 제공

        // 해시값을 uint 로 변환하면 엄청 큰수
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.prevrandao,
                        block.gaslimit
                    )
                )
            ) % Digimons.length;
    }

    function sendDigi(address to, uint index) external {
        userDigimons[to].push(userDigimons[msg.sender][index]);
        for (uint256 i = index; i < userDigimons[msg.sender].length - 1; i++) {
            userDigimons[msg.sender][i] = userDigimons[msg.sender][i + 1];
            emit DigimonEvent(to, userDigimons[msg.sender][i].name, userDigimons[msg.sender][i].url);
        }
        userDigimons[msg.sender].pop();
    }
}
