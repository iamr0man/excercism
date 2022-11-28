/// <reference path="./global.d.ts" />
// @ts-check

/**
 * Implement the functions needed to solve the exercise here.
 * Do not forget to export them so they are available for the
 * tests. Here an example of the syntax as reminder:
 *
 * export function yourFunction(...) {
 *   ...
 * }
 */

export function cookingStatus(remainingTime) {
	switch (remainingTime) {
		case 0:
			return 'Lasagna is done.'
		case undefined:
			return 'You forgot to set the timer.'
		default:
			return 'Not done, please wait.'
	}
}

export function preparationTime(layers, averagePreperation = 2) {
	return layers.length * averagePreperation
}

function quantityReducer(acc, currentLayer) {
	const relationLayerToQuantity = {
		noodles: 50,
		sauce: 0.2
	}

	const extraQuantity = relationLayerToQuantity[currentLayer]
	if (!extraQuantity) {
		return acc
	}
	const currentLayerQuantity = acc[currentLayer]

	return {
		...acc,
		[currentLayer]: currentLayerQuantity + extraQuantity
	}
}

export function quantities(layers) {
	const baseObject = {
		noodles: 0,
		sauce: 0,
	}
	return layers.reduce(quantityReducer, baseObject)
}

export function addSecretIngredient(friendsList, myList) {
	const lastElementIndex = friendsList.length - 1
	myList.push(friendsList[lastElementIndex])
}

export function scaleRecipe(recipe, portions) {
	return Object.entries(recipe).reduce((acc, currentOption) => {
		const [key, value] = currentOption
		const coefficient = portions / 2
		return {
			...acc,
			[key]: value * coefficient
		}
	}, recipe)
}
