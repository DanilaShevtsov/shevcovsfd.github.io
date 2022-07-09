var web3
window.addEventListener('load', async () => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        return web3
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
})

// const encode = function(func) {    
//     console.log(func)
//     return web3.eth.abi.encodeFunctionSignature(func);
// }

// export { encode }