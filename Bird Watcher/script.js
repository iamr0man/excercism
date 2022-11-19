// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Calculates the total bird count.
 *
 * @param {number[]} birdsPerDay
 * @returns {number} total bird count
 */
export function totalBirdCount(birdsPerDay) {
	return birdsPerDay.reduce((acc, curr) => acc + curr, 0)
}

/**
 * Calculates the total number of birds seen in a specific week.
 *
 * @param {number[]} birdsPerDay
 * @param {number} week
 * @returns {number} birds counted in the given week
 */
export function birdsInWeek(birdsPerDay, week) {
	return totalBirdCount(birdsPerDay.slice((week - 1) * 7, (week * 7)))
}

/**
 * Fixes the counting mistake by increasing the bird count
 * by one for every second day.
 *
 * @param {number[]} birdsPerDay
 * @returns {number[]} corrected bird count data
 */
export function fixBirdCountLog(birdsPerDay) {
	if (birdsPerDay.length % 2 !== 0) {
		return birdsPerDay
	}

	return birdsPerDay.reduce((result, birdCount, index) => {
		const fixCount = index % 2 === 0 ? 1 : 0
		return [...result, birdCount + fixCount]
	}, [])
}
