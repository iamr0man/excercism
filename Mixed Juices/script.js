// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Determines how long it takes to prepare a certain juice.
 *
 * @param {string} name
 * @returns {number} time in minutes
 */
export function timeToMixJuice(name) {
	switch (name) {
		case 'Pure Strawberry Joy':
			return 0.5
		case 'Energizer':
		case 'Green Garden':
			return 1.5
		case 'Tropical Island':
			return 3
		case 'All or Nothing':
			return 5
		default:
			return 2.5
	}
}

/**
 * Calculates the number of limes that need to be cut
 * to reach a certain supply.
 *
 * @param {number} wedgesNeeded
 * @param {string[]} limes
 * @returns {number} number of limes cut
 */
export function limesToCut(wedgesNeeded, limes) {
	const relationSizeToWadges = {
		small: 6,
		medium: 8,
		large: 10,
	}

	let limeCount = 0
	let generalCountOfWedges = 0

	const isNotEndOfLimes = limeCount !== limes.length
	const needMoreWedges = generalCountOfWedges <= wedgesNeeded

	while (needMoreWedges && isNotEndOfLimes && wedgesNeeded) {
		generalCountOfWedges += relationSizeToWadges[limes[limeCount]]
		limeCount++
	}

	return limeCount
}

/**
 * Determines which juices still need to be prepared after the end of the shift.
 *
 * @param {number} timeLeft
 * @param {string[]} orders
 * @returns {string[]} remaining orders after the time is up
 */
export function remainingOrders(timeLeft, orders) {
	let limeCount = 0
	let generalCountOfMinutes = 0

	while (generalCountOfMinutes < timeLeft) {
		generalCountOfMinutes += timeToMixJuice(orders[limeCount])
		limeCount++
	}

	return orders.slice(limeCount)
}