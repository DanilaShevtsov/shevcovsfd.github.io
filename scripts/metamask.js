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

const send = function(destination, data) {
    var from = web3.eth.accounts.currentProvider.selectedAddress;
    web3.eth.sendTransaction({
        from: from, 
        to: destination, 
        data: data,
        gas: 85000
    });
}

const encode = function(func, values) {
    return web3.eth.abi.encodeFunctionCall(func, values);
}