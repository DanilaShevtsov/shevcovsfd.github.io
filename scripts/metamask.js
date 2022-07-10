var web3
window.addEventListener('load', async () => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      // Accounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use MetaMask/Mist's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
});

const send = async function(destination, data) {
  var response = web3.eth.sendTransaction({
      from: account(), 
      to: destination, 
      data: data,
      gas: await estimateGas(destination, data)
  });
  return response;
}

const call = function(destination, data) {
  var response = web3.eth.call({
      from: account(), 
      to: destination, 
      data: data
  });
  return response;
}

const encode = function(func, values) {
    return web3.eth.abi.encodeFunctionCall(func, values);
}

const account = function() {
  return web3.eth.accounts.currentProvider.selectedAddress;
}

const sign = function(types, values) {
  const from = account();
  const encoded = web3.eth.abi.encodeParameters(types, values);
  const msg = web3.utils.soliditySha3(encoded).slice(2);
  const msgHash = web3.utils.sha3("\x19Ethereum Signed Message:\n" + msg.length + msg);
  return web3.eth.sign(msgHash, from);
}

const parseResponse = function(response, outputsType) {
  response = response.slice(2);
  // magic of splitting a response to several output values
  var rawOutputs = response.match(/.{1,64}/g);
  var outputs = [];
  for (let i = 0; i < rawOutputs.length; i++) {
    var output = convert('0x' + rawOutputs[i], outputsType[i].type);
    outputs.push(output);
  }

  return outputs;
}

const convert = function(hex, type) {
  type = type.includes("int") ? "number" : type;
  console.log(hex);
  
  switch (type) {
    case "bool":
      return hex.slice(-1) == '1' ? true : false;
    case "address":
      return '0x' + hex.slice(-40);
    case "string":
      return web3.utils.hexToString(hex);
    case "number":
      return web3.utils.hexToNumberString(hex);
    default:
      console.log("Unknown variable type");
  }
}

const estimateGas = async function(destination, data) {
  return web3.eth.estimateGas({
    from: account(),
    to: destination,
    data: data
  })
}