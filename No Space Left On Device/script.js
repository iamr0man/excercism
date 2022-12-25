import { stringData, testData } from "./data.js";
const rows = stringData.replace(/\$ /g, '').split(/\n/g)

const getCurrentPath = (directory, secondArgument) => {
	return directory.name === '/' ? directory.name += secondArgument : directory.name += '/' + secondArgument
}

const recursivelyCount = (directory, fileSize) => {
	directory.size += +fileSize

	if (directory.parent !== null) {
		recursivelyCount(directory.parent, fileSize)
	}
}

const fs = rows.reduce((fs, command, index) => {
	const [firstArgument, secondArgument] = command.split(' ')

	if (firstArgument === 'ls' || firstArgument === 'dir') {
		return fs
	}

	if (firstArgument === 'cd') {
		if (secondArgument === '/') {
			const root = {
				name: '/',
				parent: null,
				size: 0
			}
			return {
				...fs,
				['/']: root,
				currentDirectory: root
			}
		}
		if (secondArgument === '..') {
			return {
				...fs,
				currentDirectory: fs.currentDirectory.parent
			}
		}

		const currentPath = getCurrentPath(fs.currentDirectory, secondArgument)
		const newPathObject = {
			name: currentPath,
			parent: fs.currentDirectory,
			size: 0
		}

		return {
			...fs,
			[currentPath]: newPathObject,
			currentDirectory: newPathObject
		}
	}
	const file = firstArgument.match(/\d+/g)
	const isFile = file.length > 0

	if (isFile) {
		recursivelyCount(fs.currentDirectory, file)
	}
	return fs
}, {})

// first
const directoriesGreaterThen100k = Object.values(fs).reduce((acc, curr) => {
	if (curr.size > 100000) {
		return acc
	}
	return acc + curr.size
} ,0)

// second
const availableDiskSpace = 70000000
const freeSpace = availableDiskSpace - fs['/'].size
const minimumRequiredUpdate = 30000000
const spaceToDelete = minimumRequiredUpdate - freeSpace

const sortedBigDirs = Object.values(fs).filter(node => node.size > spaceToDelete).sort((a, b) => a.size - b.size)

console.log(sortedBigDirs[0].size);
