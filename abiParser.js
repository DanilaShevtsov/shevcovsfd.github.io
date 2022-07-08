
abi=document.querySelector.


const parse = function(abi) {
    const jsonABI = JSON.parse(abi);
    const funcObjs = takeFunctions(jsonABI);
    const names = onlyNames(funcObjs);
    const funcs = parseFuncs(funcObjs);

    return { names, funcs }
}

const takeFunctions = function(abi) {
    var funcs = [];
    for (i = 0; i < abi.length; i++) {
        obj = abi[i];
        if (obj["type"] == 'function') {
            funcs.push(obj)
        }
    }
    
    return funcs 
}

const onlyNames = function(abi) {
    var names = []

    for (i = 0; i < abi.length; i++) {
        obj = abi[i];
        names.push(obj["name"]);
    }

    return names;
}

const parseFuncs = function(abi) {
    var funcs = {}
    
    for (i = 0; i < abi.length; i++) {
        var obj = abi[i];
        var name = obj["name"];
        var inputs = obj["inputs"];
        var type = obj["stateMutability"];

        var func = {
            inputs: inputs,
            type: type
        }

        funcs[name] = func
    }

    return funcs
}

// abi = '[ { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "bytes32", "name": "_part", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "_account", "type": "address" } ], "name": "Blacklisted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "account", "type": "address" } ], "name": "BlacklisterAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "newBlacklister", "type": "address" } ], "name": "BlacklisterChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "account", "type": "address" } ], "name": "BlacklisterRemoved", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Claim", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "duration", "type": "uint256" } ], "name": "Delegate", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint8", "name": "version", "type": "uint8" } ], "name": "Initialized", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "account", "type": "address" } ], "name": "SignerAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "account", "type": "address" } ], "name": "SignerRemoved", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "bytes32", "name": "_part", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "_account", "type": "address" } ], "name": "UnBlacklisted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "account", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "Undelegate", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "addBlacklister", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "addSigner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_part", "type": "bytes32" }, { "internalType": "address", "name": "_account", "type": "address" } ], "name": "blacklist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_delegatedAmount", "type": "uint256" }, { "internalType": "uint256", "name": "_rate", "type": "uint256" }, { "internalType": "uint256", "name": "_delegationInterest", "type": "uint256" } ], "name": "calculate", "outputs": [ { "internalType": "uint256", "name": "yield", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_rate", "type": "uint256" } ], "name": "calculateMe", "outputs": [ { "internalType": "uint256", "name": "yield", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_rate", "type": "uint256" }, { "internalType": "uint256", "name": "_aliveUntil", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" } ], "name": "delegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "delegatedToken", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "delegation", "outputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_delegatedToken", "type": "address" }, { "internalType": "address", "name": "_rewardedToken", "type": "address" }, { "internalType": "uint256[]", "name": "_durations", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "_interests", "type": "uint256[]" } ], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "interest", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_part", "type": "bytes32" }, { "internalType": "address", "name": "_account", "type": "address" } ], "name": "isBlacklisted", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "isBlacklister", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "isSigner", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "removeBlacklister", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "removeSigner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceSigner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rewardedToken", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_token", "type": "address" } ], "name": "setDelegatedToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "_interest", "type": "uint256" } ], "name": "setInterest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_token", "type": "address" } ], "name": "setRewardedToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "totalStake", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_part", "type": "bytes32" }, { "internalType": "address", "name": "_account", "type": "address" } ], "name": "unBlacklist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "undelegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]'
// var parsedABI = parse(abi);
// console.log(parsedABI.funcs[parsedABI.names[0]])