import { stringData, testData } from "./data.js";
const rows = stringData.replace(/\$ /g, '').split(/\n/g)

let currentDirectory = null

const tree = {}

rows.forEach((command, index) => {
	const [firstArgument, secondArgument] = command.split(' ')

	if (firstArgument === 'ls' || firstArgument === 'dir') {
		return;
	}

	if (firstArgument === 'cd') {
		if (secondArgument === '/') {
			tree[secondArgument] = {
				children: [],
				parent: null,
				size: 0
			}
			currentDirectory = tree[secondArgument]
			return
		}
		if (secondArgument === '..') {
			currentDirectory = currentDirectory.parent
			return;
		}
 		currentDirectory.children.push({
			name: secondArgument,
			parent: currentDirectory,
			children: [],
			size: 0
		})
		currentDirectory = currentDirectory.children.find(file => file.name === secondArgument)
		return;
	}

	const file = firstArgument.match(/\d+/g)
	const isFile = file.length > 0

	if (isFile) {
		currentDirectory.children.push({
			name: secondArgument,
			parent: currentDirectory,
			size: +file
		})
	}
})

console.log(tree);

function *postOrderTraversal(node) {
	if (node.children && node.children) {
		for (let child of node.children.values()) {
			yield* postOrderTraversal(child);
		}
	}

	yield node;
}

const root = tree['/']

// first
for (let node of postOrderTraversal(root)) {
	if (!!node.parent) {
		node.parent.size += node.size
	}
}

function *preOrderTraversal (node) {
	yield node;

	if (node.children && node.children) {
		for (let child of node.children.values()) {
			yield* preOrderTraversal(child);
		}
	}
}

// second
const availableDiskSpace = 70000000
const freeSpace = availableDiskSpace - root.size
const minimumRequiredUpdate = 30000000
const spaceToDelete = minimumRequiredUpdate - freeSpace

let bigDirs = []

for (let node of preOrderTraversal(root)) {
	if (node.size > spaceToDelete && node.children) {
		bigDirs = [...bigDirs, node]
	}
}

const sortedBigDirs = bigDirs.sort((a, b) => a.size - b.size)

console.log(sortedBigDirs[0].size);
