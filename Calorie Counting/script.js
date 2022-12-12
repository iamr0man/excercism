import { data } from "./data.js";

const elfs = data.split(/\n\n/g)

const countSum = (acc, curr) => acc + parseInt(curr)

const countSumOfArray = (array) => array.reduce(countSum, 0)

const rating = elfs.reduce((acc, stringCalories) => {
	const caloriesArray = stringCalories.split(/\n/g)
	const filteredCaloriesArray = caloriesArray.filter(caloric => caloric !== '')
	const sum = countSumOfArray(filteredCaloriesArray)

	return [...acc, sum]
}, [])

const topRating = rating.sort((a, b) => b - a)
const resultOfTopThree = topRating.slice(0, 3).reduce(countSum, 0)
console.log(resultOfTopThree);



