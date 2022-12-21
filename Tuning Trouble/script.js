import { stringData } from "./data.js";

function isUnique (tempString, buffer, offset) {
	const uniqueSequence = new Set(tempString)

	return uniqueSequence.size === offset
}

function findUniqueSequence (buffer, offset) {
	if (buffer.length < offset) {
		return null;
	}

	let tempString = buffer.slice(0, offset);

	for (let i = offset; i < buffer.length; i++) {
		if (isUnique(tempString, buffer, offset)) {
			return buffer.indexOf(tempString) + offset
		}

		tempString = tempString.slice(1) + buffer[i]
	}

	return null;
}

console.log(findUniqueSequence(stringData, 14));
