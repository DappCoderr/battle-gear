require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.10",
  networks: {
		mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/7CMoiyHv1MEKHx_2wxB40VSsnQHnqhKd",
      accounts: ["4b3c724e4cf20aa37be229f17f8eb6a94275284b9653bf804f9f4861210a07d1"],
		}
  }
};

