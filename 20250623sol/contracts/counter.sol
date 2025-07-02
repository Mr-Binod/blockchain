// SPDX-License-Identifier: MIT

pragma solidity 0.8.30;

contract Counter {
    uint value;

    constructor() {
        value = 0;
    }
    function setValue(uint _value) public {
        value += _value;
    }

    function getValue() public view returns (uint) {
        return value;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract Newname {
    string[] private firstSyllables;
    string[] private secondSyllables;
    string[] private Lastname;
    constructor() {
        Lastname = [
            unicode"김",
            unicode"이",
            unicode"박",
            unicode"최",
            unicode"정",
            unicode"강",
            unicode"조",
            unicode"윤",
            unicode"장",
            unicode"임"
        ];

        firstSyllables = [
            unicode"민",
            unicode"서",
            unicode"지",
            unicode"윤",
            unicode"준",
            unicode"하",
            unicode"예",
            unicode"도",
            unicode"수",
            unicode"태",
            unicode"은",
            unicode"나",
            unicode"희",
            unicode"채",
            unicode"슬"
        ];

        secondSyllables = [
            unicode"영",
            unicode"우",
            unicode"진",
            unicode"현",
            unicode"아",
            unicode"훈",
            unicode"율",
            unicode"빈",
            unicode"경",
            unicode"림",
            unicode"찬",
            unicode"민",
            unicode"연",
            unicode"슬",
            unicode"정"
        ];
    }

    function getName() external {
        random = uint(
            keccak256(
                abi.encodePacked(block.timestamp, block.coinbase, block.number)
            )
        );

        Lastname = (random % Lastname.length);
        firstSyllables = (random % Lastname.length);
        secondSyllables = (random % Lastname.length);
        return (randomLast, firstSyllables, secondSyllables);
    }
}
