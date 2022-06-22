const { expect } = require("chai");
// const { ethers } = require("ethers");

const { ethers } = require("hardhat");


// describe("contract testing using hooks", function(){

// let Token;
// let hardhatToken;
// let owner;
// let add1;
// let add2;

// beforeEach(async function(){
//     Token = await ethers.getContractFactory("Token");
//     [owner, add1, add2 ] = await ethers.getSigners();
//     hardhatToken= await Token.deploy()
// })



describe("my first hardhat token program", function () {
    it("diployment should assign the total supply of takensto the owner", async function () {
        const [owner] = await ethers.getSigners();
        // console.log("Signers object is", owner)
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();
        // console.log(await hardhatToken.userBalance(owner.address))
        const ownerBalance = await hardhatToken.userBalance(owner.address);
        // console.log("owner address",owner.address)

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);


    })



    it("transfer token between account", async function () {
        const [owner, add1, add2] = await ethers.getSigners();
        // console.log(add1)
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();

        //transfer 10 token from owner to add1

        await hardhatToken.transferToken(add1.address, 10);

        expect(await hardhatToken.userBalance(add1.address)).to.equal(10);

        await hardhatToken.connect(add1).transferToken(add2.address, 2);

        expect(await hardhatToken.userBalance(add2.address)).to.equal(2);

        // console.log(await hardhatToken.userBalance(add1.address))
        


    })


    it("sender doesnot have inough token" , async function(){

        const [owner, add1, add2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");

        const hardhatToken = await Token.deploy();

        console.log( await hardhatToken.userBalance(owner.address))

        await hardhatToken.transferToken(add1.address ,10);

        console.log( await hardhatToken.userBalance(owner.address))

        await hardhatToken.connect(add1).transferToken(owner.address, 7)

        console.log( await hardhatToken.userBalance(owner.address))

        console.log( await hardhatToken.userBalance(add1.address))

        

        await expect( hardhatToken.connect(add1).transferToken(owner.address, 5)).to.be.revertedWith("sorry , you have insufficient token")


    })

   

})


// })

