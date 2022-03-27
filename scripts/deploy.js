const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('BattleGear');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  let txn = await nftContract.claim(1)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #1")

  txn = await nftContract.claim(2)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #2")

  txn = await nftContract.claim(3)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #3")

  txn = await nftContract.claim(4)
  // Wait for it to be mined.
  await txn.wait()
  console.log("Minted NFT #4")
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();