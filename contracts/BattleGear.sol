// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Base64 } from "./libraries/Base64.sol";
import "hardhat/console.sol";

// import "@openzeppelin/contracts/utils/introspection/IERC165.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
// import "@openzeppelin/contracts/utils/Context.sol";
// import "@openzeppelin/contracts/utils/Address.sol";
// import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";




contract BattleGear is ERC721Enumerable, ReentrancyGuard, Ownable {

    constructor() ERC721("BattleGear", "BG") Ownable() {}

    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIds;

    string[] private helmet = [
        "Null", 
        "NIJ3",   
        "PASGT", 
        "ACH", 
        "ATE", 
        "ECH"
    ];
    
    string[] private nightVision = [
        "Null",
        "NVG11"
    ];
    
    string[] private bulletproofVest = [
        "Null", 
        "BP-VI", 
        "BPV-4", 
        "BP-II"
    ];
    
    string[] private knife = [
        "Kukri", 
        "Karambit", 
        "K-M3", 
        "K-B1", 
        "K-Wing", 
        "K-Tactic", 
        "K-SMF"
    ];
    
    string[] private handGun = [
        "PA1", 
        "P-Glock", 
        "P-Beretta", 
        "Px4", 
        "P-Strom"
    ];
    
    string[] private rifles = [
        "MG3",
        "AWM", 
        "98 Kurz",
        "AKM",
        "AUG",
        "M762",
        "G36C",
        "Groza",
        "K2",
        "M16A4",
        "M416",
        "MK47",
        "SCAR-L",
        "12 Bore",
        "S47",
        "S-PK9"
    ];
    
    string[] private grenades = [
        "Null",
        "G4",
        "Cocktail",
        "Smoke-G",
        "Decoy-G4"
    ];
    
    string[] private shoes = [
        "Boots", 
        "Sneakers", 
        "Biker Boots", 
        "Loafers", 
        "Hi-top", 
        "Captain trainer", 
        "Kicks", 
        "Leather boots", 
        "Sandals", 
        "School Shoes", 
        "Spa", 
        "Working", 
        "War-zone", 
        "Zip-u"
    ];
    
    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
    
    function getHelmet(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "HELMET", helmet);
    }
    
    function getNightVision(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "NIGHTVISION", nightVision);
    }
    
    function getBulletProofVest(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "BULLLOTPROOF_VEST", bulletproofVest);
    }
    
    function getKnife(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "KNIFE", knife);
    }

    function getHandGun(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "HAND_GUN", handGun);
    }
    
    function getRifles(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "RIFLES", rifles);
    }
    
    function getGrenades(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "GRENADES", grenades);
    }
    
    function getShoes(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "SHOES", shoes);
    }
    
    function pluck(uint256 tokenId, string memory keyPrefix, string[] memory sourceArray) internal pure returns (string memory) {
        uint256 rand = random(string(abi.encodePacked(keyPrefix, toString(tokenId))));
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        string[19] memory parts;
        parts[0] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: black; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="white" /><text x="10" y="20" class="base">';

        parts[1] = getHelmet(tokenId);

        parts[2] = '</text><text x="10" y="40" class="base">';

        parts[3] = getNightVision(tokenId);

        parts[4] = '</text><text x="10" y="60" class="base">';

        parts[5] = getBulletProofVest(tokenId);

        parts[6] = '</text><text x="10" y="80" class="base">';

        parts[7] = getKnife(tokenId);

        parts[8] = '</text><text x="10" y="100" class="base">';

        parts[9] = getHandGun(tokenId);

        parts[10] = '</text><text x="10" y="120" class="base">';

        parts[11] = getRifles(tokenId);

        parts[14] = '</text><text x="10" y="140" class="base">';

        parts[15] = getGrenades(tokenId);

        parts[16] = '</text><text x="10" y="160" class="base">';

        parts[17] = getShoes(tokenId);

        parts[18] = '</text></svg>';

        string memory output = string(abi.encodePacked(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6], parts[7], parts[8]));
        output = string(abi.encodePacked(output, parts[9], parts[10], parts[11], parts[12], parts[13], parts[14], parts[15], parts[16], parts[17], parts[18]));
        console.log(output);
        
        string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name": "Gear #', toString(tokenId), '", "description": "Battle Gear is a battle game which holds different battel gear as an NFT to build one character. This project is build on polygon chain, Building For Ethernals", "image": "data:image/svg+xml;base64,', Base64.encode(bytes(output)), '"}'))));
        output = string(abi.encodePacked('data:application/json;base64,', json));

        return output;
    }

    // function claim() public nonReentrant {
    //     uint256 newItemId = _tokenIds.current();
    //     require(newItemId > 0 && newItemId < 4444, "Token ID invalid");
    //     _safeMint(msg.sender, newItemId);
    //     _tokenIds.increment();
    // }

    function claim(uint256 tokenId) public nonReentrant {
        require(tokenId > 0 && tokenId < 7778, "Token ID invalid");
        _safeMint(_msgSender(), tokenId);
    }
    
    // function ownerClaim(uint256 tokenId) public nonReentrant onlyOwner {
    //     require(tokenId > 7777 && tokenId < 8001, "Token ID invalid");
    //     _safeMint(owner(), tokenId);
    // }
    
    function toString(uint256 value) internal pure returns (string memory) {
    // Inspired by OraclizeAPI's implementation - MIT license
    // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}