// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined, so they are available for the tests.
 */

export class Size {
	width = 0
	height = 0

	constructor(width, height) {
		this.width = width
		this.height = height
	}

	resize(newWidth, newHeight) {
		if (newWidth < 1 || newHeight < 1) {
			this.width = 1
			this.height = 1
			return
		}

		this.width = newWidth
		this.height = newHeight
	}
}

export class Position {
	x = 0
	y = 0

	constructor(x, y) {
		this.x = x
		this.y = y
	}

	move (x, y) {
		if (x < 1 || y < 1) {
			this.x = 0
			this.y = 0
			return
		}

		this.x = x
		this.y = y
	}
}

export class ProgramWindow {
	screenSize = null
	size = null
	position = null

	constructor(screenSize, size, position) {
		if (screenSize) {
			this.screenSize = new Size(...screenSize)
		}
		if (size) {
			this.size = new Size(...size)
		}
		if (position) {
			this.position = new Position(...position)
		}
	}

	isCoordinatesOutOfBoundaries (newCoordinates) {
		return this.screenSize.width < (newCoordinates.x + this.size.width) || this.screenSize.height < (newCoordinates.y + this.size.height)
	}

	isSizeOutOfBoundaries (newSize) {
		return this.screenSize.width < (newSize.width + this.position.x) || this.screenSize.height < (newSize.height + this.position.y)
	}

	move (position) {
		if (!this.isCoordinatesOutOfBoundaries(position)) {
			const newX = this.screenSize.width - this.size.width
			const newY = this.screenSize.height - this.size.height
			this.position.move(newX, newY)
			return
		}

		this.position = position
	}

	resize (newSize) {
		if (this.isSizeOutOfBoundaries(newSize)) {
			const newWidth = this.screenSize.width - this.position.x
			const newHeight = this.screenSize.height - this.position.y

			this.size.resize(newWidth, newHeight)
			return
		}

		this.size = newSize
	}
}

export function changeWindow (programWindow) {
	programWindow.resize(new Size(400, 300))
	programWindow.move(new Position(100, 150))
	return programWindow
}
