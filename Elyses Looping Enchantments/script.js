// @ts-check

/**
 * Determine how many cards of a certain type there are in the deck
 *
 * @param {number[]} stack
 * @param {number} searchCard
 *
 * @returns {number} number of cards of a single type there are in the deck
 */
export function cardTypeCheck(stack, searchCard) {
	return stack.filter(card => card === searchCard).length
}

/**
 * Determine how many cards are odd or even
 *
 * @param {number[]} stack
 * @param {boolean} isEven the type of value to check for - odd or even
 * @returns {number} number of cards that are either odd or even (depending on `type`)
 */
export function determineOddEvenCards(stack, isEven) {
	return stack.filter(card => isEven ? card % 2 === 0 : card % 2).length
}
