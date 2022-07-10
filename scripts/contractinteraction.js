const argumentsClass = ".arguments";
const outputClass = ".outputs";
const functionsId = "function";
const destinationAddress = "destination";
const abiField = ".abi";
const sendButton = "btn_send";

let parsedABI;
let parsedAbiFuncs;

document.getElementById("btn_parse").onclick = () => {
	var abi = document.querySelector(abiField).value
	parsedABI = parse(abi)
	parsedAbiFuncs = parsedABI.funcs
	clearFunctions()
	addFunction(["function..."])
	addFunction(parsedABI.names)
}

document.getElementById(functionsId).addEventListener('change', function () {
	clear()
	updateButton(this.value)
	addArgument(this.value)
	addOutput(this.value)
});

document.getElementById("btn_send").onclick = async () => {
	var funcName = document.getElementById(functionsId).value;
    var destination = document.getElementById(destinationAddress).value;
	var func = parsedAbiFuncs[funcName];
    var values = getParams(func.inputs);
    
    var data = encode({
        name: funcName,
        type: 'function',
        inputs: func.inputs
    }, values);

	var output;
	if (func.type == 'view') {
		var response = await call(destination, data);
		output = parseResponse(response, func.outputs);
	} else {
		var txid = await send(destination, data);
		console.log("Tx Hash:", txid);
	}
	
	console.log(output);
	setOutput(output, func.outputs);
}

const addFunction = function(names) {
	const select = document.getElementById(functionsId);
	names.map(e => {
		const option = select.appendChild(document.createElement('option'))
		option.value = e;
		option.text = e
	})
}

const addArgument = function(funcName) {
	var func = parsedAbiFuncs[funcName]
	func.inputs.map(e => {
		let li = document.createElement('li');
		li.className = 'address_list'
		li.innerHTML = `<span>${e.name}</span>
		<input type='text' id='${e.name}' class='var' placeholder='${e.type}'>`


		document.querySelector(argumentsClass).appendChild(li)
	})
}

const addOutput = function(funcName) {
	var func = parsedAbiFuncs[funcName];
	func.outputs.map(e => {
		let li = document.createElement('li');
		li.className = 'output_list'
		li.innerHTML = `<span>${e.name}</span><span id='${e.name}'></span>`;

		document.querySelector(argumentsClass).appendChild(li)
	})
}

const clear = function() {
	document.querySelector(argumentsClass).innerHTML = "";
	document.querySelector(outputClass).innerHTML = "";
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

const updateButton = function(funcName) {
	const func = parsedAbiFuncs[funcName];
	var btn = document.getElementById(sendButton);
	if (func.type == 'view') {
		btn.textContent = "Call";
	} else {
		btn.textContent = "Send";
	}

	btn.style.visibility = 'visible';
}

const setOutput = function(outputs, abioutputs) {
	for (let i = 0; i < abioutputs.length; i++) {
		var name = abioutputs[i].name;
		document.getElementById(name).textContent = outputs[i];
	}
}