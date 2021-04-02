// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;

contract SimpleStorage {
  uint256 data;
  bytes hash;

  event DataSet(address from, uint256 data);
  event HashSet(address from, bytes hash);

  function set(uint256 x) public {
    data = x;
    emit DataSet(msg.sender, x);
  }

  function get() public view returns (uint256) {
    return data;
  }

  function setHash(bytes memory x) public {
    hash = x;
    emit HashSet(msg.sender, x);
  }

  function getHash() public view returns (bytes memory) {
    return hash;
  }
}