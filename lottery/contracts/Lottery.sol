// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.16;

contract Lotery {

    address payable public manager;
    address payable[] public players;

    constructor() {
        manager = payable(msg.sender);
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0);
    }

    function getPlayers() public view returns (address payable[] memory){
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager);
        //The underscore and semicolon es equivalent at the code in the function that we add the modifier
        _;
    }

}