
const parse = function (abi) {
	const jsonABI = JSON.parse(abi);
	const funcObjs = takeFunctions(jsonABI);
	const names = onlyNames(funcObjs);
	const funcs = parseFuncs(funcObjs);

	return { names, funcs }
}

const takeFunctions = function (abi) {
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
		var type = obj["stateMutability"];
		
		for (let argId = 0; argId < inputs.length; argId++) {
			if (inputs[argId].name == "") {
				inputs[argId].name = "argument" + argId
			}
		}

		var func = {
			inputs: inputs,
			type: type
		}

		funcs[name] = func
	}
	
	return funcs
}