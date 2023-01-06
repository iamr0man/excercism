import { data, testData } from './data.js'

const matrix = data.split(/\n/g).map(row => row.split('').map(stringNumber => +stringNumber))

const getHighestScenic = (cell, row, col) => {
	const leftHandler = () => {
		for (let j = col - 1; j >= 0; j--) {
			if (matrix[row][j] >= cell) {
				return col - j
			}
		}
		return col
	}
	const rightHandler = () => {
		for (let j = col + 1; j < matrix.length; j++) {
			if (matrix[row][j] >= cell) {
				return j - col
			}
		}
		return matrix.length - 1 - col
	}
	const topHandler = () => {
		for (let i = row - 1; i >= 0; i--) {
			if (matrix[i][col] >= cell) {
				return row - i
			}
		}
		return row
	}
	const bottomHandler = () => {
		for (let i = row + 1; i < matrix.length; i++) {
			if (matrix[i][col] >= cell) {
				return i - row
			}
		}
		return matrix.length - 1 - row
	}

	const directionHandlers = [leftHandler, topHandler, rightHandler, bottomHandler]
	const treeDistance = directionHandlers.map(handler => handler())

	return treeDistance.reduce((acc, curr) => acc * curr, 1)
}

let array = []
for (let i = 0; i < matrix.length; i++) {
	for (let j = 0; j < matrix[i].length; j++) {
		array = [...array, getHighestScenic(matrix[i][j], i, j)]
	}
}

console.log(Math.max(...array));