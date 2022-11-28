// @ts-check

/**
 * Calculates the sum of the two input arrays.
 *
 * @param {number[]} array1
 * @param {number[]} array2
 * @returns {number} sum of the two arrays
 */
export function twoSum(array1, array2) {
	return Number(array1.join('')) + Number(array2.join(''))
}

/**
 * Checks whether a number is a palindrome.
 *
 * @param {number} value
 * @returns {boolean} whether the number is a palindrome or not
 */
export function luckyNumber(value) {
	const stringValue = value.toString()

	const reverse = (word) => {
		return word.split('').reverse().join('')
	}

	const getLeftHalf = () => stringValue.slice(0, stringValue.length / 2)
	const getRightHalf = (extraShift = 0) => stringValue.slice(stringValue.length / 2 + extraShift)

	const checkOddLength = () => {
		return getLeftHalf() === reverse(getRightHalf(1))
	}

	const checkEvenLength = () => {
		return getLeftHalf() === reverse(getRightHalf())
	}

	return stringValue.length % 2 === 0 ? checkEvenLength() : checkOddLength()
}

function palindrome(number) {
	let remain, temp, final = 0;

	temp = number;
	while (number > 0) {
		remain = number % 10;
		number = parseInt(number / 10);
		final = final * 10 + remain;
	}
	return final === temp
}

/**
 * Determines the error message that should be shown to the user
 * for the given input value.
 *
 * @param {string|null|undefined} input
 * @returns {string} error message
 */
export function errorMessage(input) {
	if (!input) {
		return 'Required field'
	}
	const number = Number(input)
	return isNaN(number) || number === 0 ? 'Must be a number besides 0' : ''
}