import { stringData } from "./data.js";

const [emptyString, ...rows] = stringData.split(/\n/g)

const getLettersCounter = (string) => {
	return string.split('').reduce((acc, curr) => {
		const value = acc[curr]
		if (value) {
				return {
					...acc,
					[curr]: value + 1
				}
		}
		return {
			...acc,
			[curr]: 1
		}
	}, {})
}

const findRepeatElement = (firstHalfCounter, secondHalfCounter) => {
	for (let [key] of Object.entries(firstHalfCounter)) {
		const predicate = ([innerKey]) => {
			return innerKey === key
		}
		const isRepeat = Object.entries(secondHalfCounter).find(predicate)

		if (isRepeat) {
			return isRepeat[0]
		}
	}
}

const calculate = (element) => {
	const elementCharCode = element.charCodeAt(0)
	if (elementCharCode < 91) {
		return elementCharCode - 38
	}
	return elementCharCode - 96
}

const perChunk = 6
const bags = rows.reduce((resultArray, item, index) => {
	const chunkIndex = Math.floor(index / perChunk)

	if(!resultArray[chunkIndex]) {
		resultArray[chunkIndex] = []
	}

	resultArray[chunkIndex].push(item)

	return resultArray
}, [])

const findMultipleIntersections = (data,) => {
	return data.reduce((a, b) => a.filter(c => b.includes(c)));
}

const result = bags.reduce((acc, curr, index) => {
	if (curr.length === 1) {
		return acc
	}

	const firstHalf = curr.slice(0, 3).map(item => item.split(''))
	const secondHalf = curr.slice(3).map(item => item.split(''))

	const firstHalfIntersection = findMultipleIntersections(firstHalf)[0]
	const secondHalfIntersection = findMultipleIntersections(secondHalf)[0]

	const value = calculate(firstHalfIntersection) + calculate(secondHalfIntersection)

	return acc + value
}, 0)

console.log(result);
