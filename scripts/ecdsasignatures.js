const argumentsClass = ".arguments"

document.getElementById('addArgument').onclick = () => {
    addArgument();
}

document.getElementById('btnSign').onclick = async () => {
    const ul = document.querySelectorAll(`${argumentsClass} li`);
    const types = typelistFromUl(ul);
    const values = valueslistFromUl(ul);

    const signature = await sign(types, values);
    setResponse(signature);
}

const initArgument = function() {
    const selector = '<select name="Type" class="type" id=""><option selected>address</option><option>address[]</option><option>string</option><option>bool</option><option>bool[]</option><option>uint256</option><option>uint128</option><option>uint64</option><option>uint32</option><option>uint16</option><option>uint8</option><option>int256</option><option>int128</option><option>int64</option><option>int32</option><option>int16</option><option>int8</option><option>uint256[]</option><option>uint128[]</option><option>uint64[]</option><option>uint32[]</option><option>uint16[]</option><option>uint8[]</option><option>int256[]</option><option>int128[]</option><option>int64[]</option><option>int32[]</option><option>int16[]</option><option>int8[]</option></select><input type="text" class="var">';
    
    let li = document.createElement('li');
    li.innerHTML = selector;
    document.querySelector(argumentsClass).appendChild(li);
}

const addArgument = function() {
    const cross = '<svg width="30" height="30" viewBox="10 10 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" onclick=remove(this)> <path d="M26.1313 52.8687L52.8688 26.1313" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> <path d="M26.1313 26.1313L52.8688 52.8687" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const selector = '<select name="Type" class="type" id=""><option selected>address</option><option>address[]</option><option>string</option><option>bool</option><option>bool[]</option><option>uint256</option><option>uint128</option><option>uint64</option><option>uint32</option><option>uint16</option><option>uint8</option><option>int256</option><option>int128</option><option>int64</option><option>int32</option><option>int16</option><option>int8</option><option>uint256[]</option><option>uint128[]</option><option>uint64[]</option><option>uint32[]</option><option>uint16[]</option><option>uint8[]</option><option>int256[]</option><option>int128[]</option><option>int64[]</option><option>int32[]</option><option>int16[]</option><option>int8[]</option></select><input type="text" class="var">' + cross;
    
    let li = document.createElement('li');
    li.innerHTML = selector;
    document.querySelector(argumentsClass).appendChild(li);
}


const typelistFromUl = function(ul) {
    var types = [];
    for (let i = 0; i < ul.length; i++) {
        var li = ul.item(i);
        var type = li.children[0].value;
        types.push(type)
    }
    
    return types
}

const valueslistFromUl = function(ul) {
    var values = [];
    for (let i = 0; i < ul.length; i++) {
        var li = ul.item(i);
        var type = li.children[1].value;
        values.push(type)
    }
    
    return values
}

const setResponse = function(signature) {
    const v = '0x' + signature.slice(-2);
    const r = '0x' + signature.slice(2, 66);
    const s = '0x' + signature.slice(66, 130);

    document.getElementById('v').textContent = v;
    document.getElementById('r').textContent = r;
    document.getElementById('s').textContent = s;
    document.getElementById('signature').textContent = signature;
}

window.onload = initArgument;

const remove = function(el) {
    el.parentElement.remove();
}