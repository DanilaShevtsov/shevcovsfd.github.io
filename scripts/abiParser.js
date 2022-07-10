const parse = function (abi) {
	var jsonABI = JSON.parse(abi);
	jsonABI = findFuncs(jsonABI);
	const names = onlyNames(jsonABI);
	const funcs = parseFuncs(jsonABI);

	return { names, funcs }
}

const findFuncs = function (abi) {
	var funcs = [];
	for (let i = 0; i < abi.length; i++) {
		var obj = abi[i];
		if (obj["type"] == 'function') {
			funcs.push(obj)
		}
	}

	return funcs
}

const onlyNames = function (abi) {
	var names = []
	
	for (let i = 0; i < abi.length; i++) {
		var obj = abi[i];
		names.push(obj["name"]);
	}

	return names;
}

const parseFuncs = function (abi) {
	var funcs = {}
	
	for (let i = 0; i < abi.length; i++) {
		var obj = abi[i];
		var name = obj["name"];
		var inputs = obj["inputs"];
		var outputs = obj["outputs"]
		var type = obj["stateMutability"];
		
		for (let argId = 0; argId < inputs.length; argId++) {
			if (inputs[argId].name == "") {
				inputs[argId].name = "input"
			}
		}

		for (let argId = 0; argId < outputs.length; argId++) {
			if (outputs[argId].name == "") {
				outputs[argId].name = "output"
			}
		}

		var func = {inputs: inputs, type: type, outputs: outputs}
		funcs[name] = func
	}
	
	return funcs
}