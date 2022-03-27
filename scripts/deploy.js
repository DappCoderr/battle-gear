async function deployContract() {
  const BattleGearNFT = await ethers.getContractFactory("BattleGear")
  const BattleGearContract = await BattleGearNFT.deploy()
  await BattleGearContract.deployed()
  
  const txHash = BattleGearContract.deployTransaction.hash
  const txReceipt = await ethers.provider.waitForTransaction(txHash)
  const contractAddress = txReceipt.contractAddress
  console.log("Contract deployed to address:", contractAddress)
 }
 
 deployContract()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });