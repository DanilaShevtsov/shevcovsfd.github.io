// import { parse } from "./abiParser.js"
// import { encode } from "./encoder.js"
// import "./metamask.js"

const argumentsClass = ".arguments"
const functionsId = "function"

let parsedABI;
let parsedAbiFuncs

document.getElementById("btn_parse").onclick = () => {
	var abi = document.querySelector(".abi").value
	parsedABI = parse(abi)
	parsedAbiFuncs = parsedABI.funcs
	clearFunctions()
	addFunction(["function..."])
	addFunction(parsedABI.names)
}

document.getElementById(functionsId).addEventListener('change', function () {
	clearArgs()
	addArgument(this.value)
});

document.getElementById("btn_send").onclick = () => {
	var funcName = document.getElementById(functionsId).value;
    var args = parsedAbiFuncs[funcName].inputs;
    var values = getParams(args);
    var destination = document.getElementById("destination").value;
    
    var data = encode({
        name: funcName,
        type: 'function',
        inputs: args
    }, values);

    send(destination, data);
}

const addFunction = function(names) {
	const select = document.getElementById(functionsId);
	names.map(e => {
		const option = select.appendChild(document.createElement('option'))
		option.value = e;
		option.text = e
	})
}

const addArgument = function(func) {
	var variables = parsedAbiFuncs[func]
	variables.inputs.map(e => {
		let li = document.createElement('li');
		li.className = 'address_list'
		li.innerHTML = `<span>${e.name}</span>
		<input type='text' id='${e.name}' class='var' placeholder='${e.type}'>`


		document.querySelector(argumentsClass).appendChild(li)
	})
}

const clearArgs = function() {
	document.querySelector(argumentsClass).innerHTML = "";
}

const clearFunctions = function() {
	var select = document.getElementById(functionsId);
	var length = select.options.length;
	for (let i = length-1; i >= 0; i--) {
		select.options[i] = null;
	}
}

const getParams = function(args) {
    var values = []
    
    for (let i = 0; i < args.length; i++) {
        var value = document.getElementById(args[i].name).value;
        values.push(value)
    }

    return values
}