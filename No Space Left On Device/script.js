import { FileSystem, Directory } from "./helpers.js";

import { stringData } from "./data.js";
const rows = stringData.replace(/\$ /g, '').split(/\n/g)

const fs = new FileSystem()

rows.forEach((command, index) => {
	const [firstArgument, secondArgument] = command.split(' ')

	if (firstArgument === 'ls') {
		return
	}

	if (firstArgument === 'dir') {
		fs.createDirectory(secondArgument)
		return
	}

	if (firstArgument === 'cd') {
		if (secondArgument === '/') {
			return;
		}
		if (secondArgument === '..') {
			fs.goBack()
			return;
		}
		fs.openDirectory(secondArgument)
		return;
	}

	const file = firstArgument.match(/\d+/g)
	const isFile = file.length > 0
	if (isFile) {
		fs.createFile(secondArgument, { size: +firstArgument })
	}
})

fs.setSizes()

const availableDiskSpace = 70000000
const freeSpace = availableDiskSpace - fs.root.size
const minimumRequiredUpdate = 30000000
const spaceToDelete = minimumRequiredUpdate - freeSpace

let bigDirs = []

for (let node of fs.preOrderTraversal()) {
	if (node.size > spaceToDelete && node instanceof Directory) {
		bigDirs = [...bigDirs, node]
	}
}

const sortedBigDirs = bigDirs.sort((a, b) => a.size - b.size)

console.log(sortedBigDirs[0].size);
