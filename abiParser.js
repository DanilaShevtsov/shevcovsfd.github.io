let parsedABI;
let parsedAbiFuncs

document.getElementById("btn_parse").onclick = () => {
	abi = document.querySelector(".abi").value
	parsedABI = parse(abi)
	parsedAbiFuncs = parsedABI.funcs
	console.log(parse(abi));
	addFunction(parsedABI.names)

}

let select = document.getElementById("function").addEventListener('change', function () {
	clearArgs()
	addArgument(this.value)
});



const parse = function (abi) {
	const jsonABI = JSON.parse(abi);
	const funcObjs = takeFunctions(jsonABI);
	const names = onlyNames(funcObjs);
	const funcs = parseFuncs(funcObjs);

	return { names, funcs }
}

const takeFunctions = function (abi) {
	var funcs = [];
	for (i = 0; i < abi.length; i++) {
		obj = abi[i];
		if (obj["type"] == 'function') {
			funcs.push(obj)
		}
	}

	return funcs
}

const onlyNames = function (abi) {
	var names = []

	for (i = 0; i < abi.length; i++) {
		obj = abi[i];
		names.push(obj["name"]);
	}

	return names;
}

const parseFuncs = function (abi) {
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

const addFunction = function(names) {
	const select = document.getElementById('function');
	names.map(e => {
		const option = select.appendChild(document.createElement('option'))
		option.value = e;
		option.text = e
	}
	)
}

const addArgument = function(func) {
	variables = parsedAbiFuncs[func]
	variables.inputs.map(e => {
		let li = document.createElement('li');
		li.className = 'address_list'
		li.innerHTML = `<span>${e.name}</span>
		<input type='text' class='var' placeholder='${e.type}'>`


		document.querySelector('.arguments').appendChild(li)
	})
}

const clearArgs = function() {
	document.querySelector('.arguments').innerHTML = "";
}