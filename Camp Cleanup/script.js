import { stringData } from "./data.js";

const rows = stringData.split(/\n/g)

const formatRange = (range) => range.split('-').map(item => parseInt(item))

const result = rows.reduce((acc, curr) => {
	const [firstRange, secondRange] = curr.split(',')

	const [startOfFirstRange, endOfFirstRange] = formatRange(firstRange)
	const [startOfSecondRange, endOfSecondRange] = formatRange(secondRange)

	if (endOfFirstRange < startOfSecondRange) { //18-46,56-100
		return acc
	}
	if (startOfFirstRange > endOfSecondRange && endOfFirstRange > endOfSecondRange) {// 64-64,12-63
		return acc
	}

	return acc + 1
}, 0)

console.log(result)