//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8 ;

import "hardhat/console.sol"; //using this you can write javascript inside contract , use for debug

contract Token{
    
    string public name = "HardHat Token" ;
    string public symbol  = "HHT";
    
    uint public totalSupply = 10000;

    address public owner;

    mapping (address => uint) userData;

    constructor(){
        userData[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transferToken( address to , uint amount) external  {


        console.log("sender is" , msg.sender);

        require( userData[msg.sender] >= amount , "sorry , you have insufficient token");

        userData[msg.sender] = userData[msg.sender] - amount;

        userData[to] += amount;
    } 

    function userBalance( address  userAddress) view external returns( uint){

        return userData[userAddress];

    }

}

