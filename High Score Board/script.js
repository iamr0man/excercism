/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Creates a new score board with an initial entry.
 *
 * @returns {Record<string, number>} new score board
 */
export function createScoreBoard() {
	return {
		'The Best Ever': 1000000
	}
}

/**
 * Adds a player to a score board.
 *
 * @param {Record<string, number>} scoreBoard
 * @param {string} player
 * @param {number} score
 * @returns {Record<string, number>} updated score board
 */
export function addPlayer(scoreBoard, player, score) {
	return {
		...scoreBoard,
		[player]: score
	}
}

/**
 * Removes a player from a score board.
 *
 * @param {Record<string, number>} scoreBoard
 * @param {string} player
 * @returns {Record<string, number>|never} updated score board
 */
export function removePlayer(scoreBoard, player) {
	if (!scoreBoard[player]) {
		throw Error('This player does not exist')
	}

	const { [player]: removedProperty, ...rest } = scoreBoard
	return rest
}

/**
 * Increases a player's score by the given amount.
 *
 * @param {Record<string, number>} scoreBoard
 * @param {string} player
 * @param {number} points
 * @returns {Record<string, number>|never} updated score board
 */
export function updateScore(scoreBoard, player, points) {
	if (!scoreBoard[player]) {
		throw Error('This player does not exist')
	}

	return addPlayer(scoreBoard, player, points)
}

/**
 * Applies 100 bonus points to all players on the board.
 *
 * @param {Record<string, number>} scoreBoard
 * @returns {Record<string, number>} updated score board
 */
export function applyMondayBonus(scoreBoard) {
	const BONUS_AMOUNT = 100
	const scoreBoardCopy = { ...scoreBoard }
	for (let key in scoreBoardCopy) {
		scoreBoardCopy[key] += BONUS_AMOUNT
	}
	return scoreBoardCopy
}

/**
 * Custom data type defining params of normalize score function
 * @typedef {Object} Params
 * @property {{ (score: number): number }} normalizeFunction - callback function
 * @property {number} score - score
 */

/**
 * @type {Params}
 */

/**
 * Normalizes a score with the provided normalization function.
 *
 * @param {Params} params the parameters for performing the normalization
 * @returns {number} normalized score
 */
export function normalizeScore(params) {
	return params.normalizeFunction(params.score)
}
