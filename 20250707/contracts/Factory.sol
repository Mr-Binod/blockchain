// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./DAO.sol";

contract Factory {
    DAO[] private DAOs;
    function createContract() external {
        DAOs.push(new DAO(msg.sender));
    }

    // 몇번쨰 조직을 호출
    // 조직의 인덱스가 있는지 검증
    modifier checkLength(uint index, DAO[] memory _daos) {
        require(index < _daos.length, "index error");
        _;
    }

    function getContract(
        uint index
    ) external view checkLength(index, DAOs) returns (DAO) {
        return DAOs[index];
    }
}
