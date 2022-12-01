// @ts-check

/**
 * Double every card in the deck.
 *
 * @param {number[]} deck
 *
 * @returns {number[]} deck with every card doubled
 */
export function seeingDouble(deck) {
	return deck.map(card => card * 2)
}

/**
 *  Creates triplicates of every 3 found in the deck.
 *
 * @param {number[]} deck
 *
 * @returns {number[]} deck with triplicate 3s
 */
export function threeOfEachThree(deck) {
	return deck.reduce((acc, curr) => {
		if (curr === 3) {
			const triplicateArray = [3,3,3]
			return [...acc, ...triplicateArray]
		}
		acc.push(curr)
		return acc
	}, [])
}

/**
 * Extracts the middle two cards from a deck.
 * Assumes a deck is always 10 cards.
 *
 * @param {number[]} deck of 10 cards
 *
 * @returns {number[]} deck with only two middle cards
 */
export function middleTwo(deck) {
	const halfLength = deck.length / 2
	return deck.slice(halfLength - 1, halfLength + 1)
}

function removeItemAtBottom (cards) {
	const [_, ...rest] = cards
	return rest
}

function removeItemFromTop(cards) {
	const lastElementIndex = cards.length - 1
	return cards.filter((card, index) => index !== lastElementIndex)
}

/**
 * Moves the outside two cards to the middle.
 *
 * @param {number[]} deck with even number of cards
 *
 * @returns {number[]} transformed deck
 */

export function sandwichTrick(deck) {
	const firstCard = deck[0]
	const lastCard = deck[deck.length - 1]

	let deckCopy = removeItemAtBottom(removeItemFromTop([...deck]))

	const reverseOrderCards = [lastCard, firstCard]
	const halfLength = deckCopy.length / 2

	const firstPart = deckCopy.slice(0, halfLength)
	const lastPart = deckCopy.slice(halfLength)

	return [...firstPart, ...reverseOrderCards, ...lastPart]
}

/**
 * Removes every card from the deck except 2s.
 *
 * @param {number[]} deck
 *
 * @returns {number[]} deck with only 2s
 */
export function twoIsSpecial(deck) {
	return deck.filter(card => card === 2)
}

/**
 * Returns a perfectly order deck from lowest to highest.
 *
 * @param {number[]} deck shuffled deck
 *
 * @returns {number[]} ordered deck
 */
export function perfectlyOrdered(deck) {
	return deck.sort((a, b) => a - b)
}

/**
 * Reorders the deck so that the top card ends up at the bottom.
 *
 * @param {number[]} deck
 *
 * @returns {number[]} reordered deck
 */
export function reorder(deck) {
	return deck.reverse()
}
