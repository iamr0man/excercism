import { stringData } from "./data.js";

const rows = stringData.split(/\n/g)

const formatRange = (range) => range.split('-').map(item => parseInt(item))

const result = rows.reduce((acc, curr) => {
	const [firstRange, secondRange] = curr.split(',')

	const [startOfFirstRange, endOfFirstRange] = formatRange(firstRange)
	const [startOfSecondRange, endOfSecondRange] = formatRange(secondRange)

	if (startOfFirstRange <= startOfSecondRange && endOfFirstRange >= endOfSecondRange) {
		return acc + 1
	}
	if (startOfFirstRange >= startOfSecondRange && endOfFirstRange <= endOfSecondRange) {
		return acc + 1
	}

	return acc
}, 0)

console.log(result)