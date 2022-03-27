import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from "ethers";
import contractABI from './utils/contractABI.json';
import polygonLogo from './assets/polygonlogo.png';
import ethLogo from './assets/ethlogo.png';
import { networks } from './utils/networks';

// Constants
const TWITTER_HANDLE = 'dappcoder_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const CONTRACT_ADDRESS = "0xa3CC77D493744C5a5Ea03F89b46EB6cfF942d49c";
const count = 1;

const App = () => {
	const [currentAccount, setCurrentAccount] = useState('');
  const [network, setNetwork] = useState('');


  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }
			
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  // Add this function anywhere in your component (maybe after the mint function)


// This will run any time currentAccount or network are changed
useEffect(() => {
	if (network === 'Polygon Mumbai Testnet') {
	}
}, [currentAccount, network]);

  const switchNetwork = async () => {
	if (window.ethereum) {
		try {
			// Try to switch to the Mumbai testnet
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
			});
		} catch (error) {
			// This error code means that the chain we want has not been added to MetaMask
			// In this case we ask the user to add it to their MetaMask
			if (error.code === 4902) {
				try {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{	
								chainId: '0x13881',
								chainName: 'Polygon Mumbai Testnet',
								rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
								nativeCurrency: {
										name: "Mumbai Matic",
										symbol: "MATIC",
										decimals: 18
								},
								blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
							},
						],
					});
				} catch (error) {
					console.log(error);
				}
			}
			console.log(error);
		}
	} else {
		// If window.ethereum is not found then MetaMask is not installed
		alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
	} 
}

  const checkIfWalletIsConnected = async () => {
	const { ethereum } = window;

	if (!ethereum) {
		console.log('Make sure you have metamask!');
		return;
	} else {
		console.log('We have the ethereum object', ethereum);
	}
	
	const accounts = await ethereum.request({ method: 'eth_accounts' });

	if (accounts.length !== 0) {
		const account = accounts[0];
		console.log('Found an authorized account:', account);
		setCurrentAccount(account);
	} else {
		console.log('No authorized account found');
	}
	
	// This is the new part, we check the user's network chain ID
	const chainId = await ethereum.request({ method: 'eth_chainId' });
	setNetwork(networks[chainId]);

	ethereum.on('chainChanged', handleChainChanged);
	
	// Reload the page when they change networks
	function handleChainChanged(_chainId) {
		window.location.reload();
	}
};

const mintNFT = async () => {

  const count = 1;

  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

      console.log("Going to pop wallet now to pay gas...")
      let nftTxn = await connectedContract.claim(count);
      count +=1;

      console.log("Mining...please wait.")
      await nftTxn.wait();
      
      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}
	


	// Render methods
	const renderNotConnectedContainer = () => (
		<div className="connect-wallet-container">
			<button onClick={connectWallet} className="cta-button connect-wallet-button">
				Connect Wallet
			</button>
		</div>
	);


	
	const renderInputForm = () =>{
	if (network !== 'Polygon Mumbai Testnet') {
		return (
			<div className="connect-wallet-container">
				<h2>Please switch to Polygon Mumbai Testnet</h2>
				<button className='cta-button mint-button' onClick={switchNetwork}>Click here to switch</button>
			</div>
		);
	}
	return (
		<div className="form-container">
					<button className='cta-button mint-button' onClick={mintNFT}>
						Mint
					</button>  
		</div>
	);
	}
  
	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return (
		<div className="App">
			<div className="container">
			<div className="header-container">
	<header>
		<div className="left">
			<p className="title">BATTLE GEAR</p>
			<p className="subtitle">Get Ready For War</p>
		</div>
		{/* Display a logo and wallet connection status*/}
		<div className="right">
			<img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} />
			{ currentAccount ? <p> Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p> : <p> Not connected </p> }
		</div>
	</header>
</div>
				
				{!currentAccount && renderNotConnectedContainer()}
				{/* Render the input form if an account is connected */}
				{currentAccount && renderInputForm()}
				
				<div className="footer-container">
					<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`build by @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;