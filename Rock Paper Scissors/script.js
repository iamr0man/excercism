import { stringData } from "./data.js";

const gameRows = stringData.split(/\n/g)

const ROCK = 'Rock'
const PAPER = 'Paper'
const SCISSORS = 'Scissors'

const WIN = 'WIN'
const LOSE = 'LOSE'
const DRAW = 'DRAW'

const opponentEncryptMap = new Map()
opponentEncryptMap.set('A', ROCK)
opponentEncryptMap.set('B', PAPER)
opponentEncryptMap.set('C', SCISSORS)

const ownEncryptMap = new Map()
ownEncryptMap.set('X', ROCK)
ownEncryptMap.set('Y', PAPER)
ownEncryptMap.set('Z', SCISSORS)

const winRelation = new Map()
winRelation.set(ROCK, SCISSORS)
winRelation.set(SCISSORS, PAPER)
winRelation.set(PAPER, ROCK)

const pointsPerGameStatusMap = new Map()
pointsPerGameStatusMap.set(WIN, 6)
pointsPerGameStatusMap.set(LOSE, 0)
pointsPerGameStatusMap.set(DRAW, 3)

const pointsPerShapeMap = new Map()
pointsPerShapeMap.set(ROCK, 1)
pointsPerShapeMap.set(PAPER, 2)
pointsPerShapeMap.set(SCISSORS, 3)

const contractWinMap = new Map()
contractWinMap.set('X', LOSE)
contractWinMap.set('Y', DRAW)
contractWinMap.set('Z', WIN)

const getEncryptedChoose = (opponentEncrypt, ownEncrypt) => {
	const opponent = opponentEncryptMap.get(opponentEncrypt)
	const own = ownEncryptMap.get(ownEncrypt)
	return [opponent, own]
}

const checkWinner = (opponent, own) => {
	const isWin = winRelation.get(own) === opponent
	if (isWin) {
		return WIN
	}

	const isDraw = opponent === own
	if (isDraw) {
		return DRAW
	}

	const isLose = winRelation.get(opponent) === own
	if (isLose) {
		return LOSE
	}
}

const findStrongShape = (shape) => {
	for (let [key, value] of winRelation.entries()){
		if (value === shape) {
			return key
		}
	}
}

const getOwnShape = (status, opponent, own) => {
	switch (status) {
		case LOSE:
			return winRelation.get(opponent)
		case DRAW:
			return opponent
		case WIN:
			return findStrongShape(opponent)
	}
}

const result = gameRows.reduce((acc, curr) => {
	if (!curr) {
		return acc
	}

	const [opponentEncrypt, ownEncrypt] = curr.split(' ')
	const [opponent, own] = getEncryptedChoose(opponentEncrypt, ownEncrypt)

	const status = contractWinMap.get(ownEncrypt)
	const pointsPerGame = pointsPerGameStatusMap.get(status)

	const ownShape = getOwnShape(status, opponent, own)
	const pointsPerShape = pointsPerShapeMap.get(ownShape)

	return acc + pointsPerGame + pointsPerShape
}, 0)

console.log(result);




