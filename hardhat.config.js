require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.10",
  networks: {
		mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/7CMoiyHv1MEKHx_2wxB40VSsnQHnqhKd",
      accounts: ["a677d46c1bc793555a68c3aff2ae0ab5025ec83ea6ec63917f87725d73822575"],
		}
  }
};

