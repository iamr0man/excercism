import { stringData } from "./data.js";

const stepRows = stringData.split(/\n/g)

// [P]     [C]         [M]
// [D]     [P] [B]     [V] [S]
// [Q] [V] [R] [V]     [G] [B]
// [R] [W] [G] [J]     [T] [M]     [V]
// [V] [Q] [Q] [F] [C] [N] [V]     [W]
// [B] [Z] [Z] [H] [L] [P] [L] [J] [N]
// [H] [D] [L] [D] [W] [R] [R] [P] [C]
// [F] [L] [H] [R] [Z] [J] [J] [D] [D]

const arrayData = [
	[ 'P', 'D', 'Q', 'R', 'V', 'B', 'H', 'F', ],
	[ 'V', 'W', 'Q', 'Z', 'D', 'L'],
	[ 'C', 'P', 'R', 'G', 'Q', 'Z', 'L', 'H'],
	[ 'B', 'V', 'J', 'F', 'H', 'D', 'R' ],
	[ 'C', 'L', 'W', 'Z'],
	[ 'M', 'V', 'G', 'T', 'N', 'P', 'R', 'J' ],
	[ 'S', 'B', 'M', 'V', 'L', 'R', 'J' ],
	[ 'J', 'P', 'D' ],
	[ 'V', 'W', 'N', 'C', 'D'],
]

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

}, [...arrayData])

console.log(result.map(v => v[0]).join(''));
