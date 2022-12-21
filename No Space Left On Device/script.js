import { stringData, testData } from "./data.js";

let currentDirectory = '';
let directories = {};

function processLine(line) {
	let isCommand = line.indexOf('$') === 0;

	if (isCommand) {
		processCommand(line);
		return;
	}

	processEntry(line);
}

function getParentDirectory (currentDirectory, path) {
	return currentDirectory
		.split('/')
		.slice(0, path.length - 1)
		.join('/')
}

function processCommand(command) {
	const directoryCommand = '$ cd ';

	if (command.indexOf(directoryCommand) < 0) {
		return;
	}

	let targetDirectory = command.replace(directoryCommand, '');

	if (targetDirectory === '/') {
		currentDirectory = '/';
		return;
	}

	if (targetDirectory === '..') {
		const path = currentDirectory.split('/')
		currentDirectory = getParentDirectory(currentDirectory, path) || '/';

		return;
	}

	const prefix = currentDirectory === '/' ? '' : '/'
	currentDirectory += prefix + targetDirectory;
}

function processEntry(entry) {
	if (entry.indexOf('dir') === 0) {
		return;
	}

	let [size] = entry.split(' ');
	size = parseInt(size);

	currentDirectory
		.replace(/\//g, ' / ')
		.split(' ')
		.reverse()
		.reduce((path, directory, index) => {
			if (!path || (directory === '/' && path !== '/')) {
				return (getParentDirectory(path, currentDirectory)) || '/';
			}

			if (currentDirectory === '/' && index) {
				return '/';
			}

			if (!directories[path]) {
				directories[path] = {
					size: 0,
				};
			}

			directories[path].size += size;

			return path.replace(`/${directory}`, '');
		}, currentDirectory);
}

stringData.split('\n').forEach(processLine);

let answer1 = Object.keys(directories)
	.filter(directory => directories[directory].size <= 100000)
	.reduce((sizeSum, directory) => sizeSum + directories[directory].size, 0);

const availableDiskSpace = 70000000
const freeSpace = availableDiskSpace - directories['/'].size
const minimumRequiredUpdate = 30000000
const spaceToDelete = minimumRequiredUpdate - freeSpace

let answer2 = Math.min(
	...Object.keys(directories)
		.filter(directory => directories[directory].size >= spaceToDelete)
		.map(directory => directories[directory].size)
);

console.log(answer1, answer2);
