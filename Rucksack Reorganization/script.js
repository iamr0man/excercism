import { stringData } from "./data.js";

const bags = stringData.split(/\n/g)

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

const result = bags.reduce((acc, curr) => {
	if (!curr) {
		return acc
	}
	const half = Math.ceil(curr.length / 2)

	const firstHalf = curr.slice(0, half)
	const secondHalf = curr.slice(half)

	const firstHalfCounter = getLettersCounter(firstHalf)
	const secondHalfCounter = getLettersCounter(secondHalf)

	const element = findRepeatElement(firstHalfCounter, secondHalfCounter)

	const calculateValue = calculate(element)
	return acc + calculateValue
}, 0)

console.log(result);