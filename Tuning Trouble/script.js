import { stringData } from "./data.js";

function isUnique (tempString, buffer, offset) {
	const uniqueSequence = new Set(tempString)

	return uniqueSequence.size === offset
}

function findUniqueSequence (buffer, offset = 4) {
	if (buffer.length < offset) {
		return null;
	}

	const startIndex = 3
	let tempString = buffer.slice(startIndex, offset + startIndex);

	for (let i = offset; i < buffer.length; i++) {
		if (isUnique(tempString, buffer, offset)) {
			return buffer.indexOf(tempString) + offset
		}

		tempString = tempString.slice(1) + buffer[i]
	}

	return null;
}

console.log(findUniqueSequence(stringData, 4));
