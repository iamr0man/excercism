import { data } from "./data.js";

const elfs = data.split(/\n\n/g)

const countSum = (array) => {
	return array.reduce((acc, curr) => acc + parseInt(curr), 0)
}

let maxValue = 0

elfs.forEach((stringCalories) => {
	const caloriesArray = stringCalories.split(/\n/g)
	const filteredCaloriesArray = caloriesArray.filter(caloric => caloric !== '')
	const sum = countSum(filteredCaloriesArray)

	maxValue = Math.max(sum, maxValue)
}, [])



