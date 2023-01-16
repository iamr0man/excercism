import { stringData, stack } from "./data.js";

const spaceParser = (cell) => {
	switch (cell.length) {
		case 5:
			return [' ', ' ', ' ']
		case 8:
			return [' ', ' ', ' ', ' ',]
		case 9:
			return [' ', ' ', ' ', ' ', ' ']
		case 12:
			return [' ', ' ', ' ', ' ', ' ', ' ',]
		default:
			return [cell]
	}
}

const rows = stack.split(/\n/g)
const uglyMatrix = rows.reduce((newMatrix, row, index) => {
	const uglyRow = row.match(/(\[[\w]]| +)/g)
	const normalizedRow = uglyRow.map(letter => letter.replace(/\[(\w)]/g, '$1'))

	const newRow = normalizedRow.reduce((acc, letter) => {
		return [...acc,...spaceParser(letter)]
	}, [])
	return [...newMatrix, newRow]
}, [])

const slicedMatrix = uglyMatrix.slice(0, uglyMatrix.length - 1)
const matrix = slicedMatrix[0].map((val, index) => slicedMatrix.map(row => row[index]))
const clearMatrix = matrix.reduce((acc, row) => {
	const updatedRow = row.filter(cell => cell !== ' ')

	if (updatedRow.length > 0) {
		return [
			...acc,
			[...updatedRow]
		]
	}
	return acc
}, [])

const stepRows = stringData.split(/\n/g)

const result = stepRows.reduce((acc, curr) => {
	const [move, from, to] = curr.match(/\d+/g)

	const moveNumber = parseInt(move)
	const toIndex = parseInt(to) - 1
	const fromIndex = parseInt(from) - 1

	// slice by instruction array and get exist elements
	const sliceArray = acc[fromIndex].slice(0, moveNumber)
	const returnCol = acc[fromIndex].slice(moveNumber)

	// create column with newElements
	const updatedCol = [...sliceArray, ...acc[to - 1]]

	// set updated columns
	return acc.map((row, index) => {
		if (index === toIndex) {
			return updatedCol
		}
		if (index === fromIndex) {
			return returnCol
		}
		return row
	})

}, [...clearMatrix])

console.log(result.map(v => v[0]).join(''));
