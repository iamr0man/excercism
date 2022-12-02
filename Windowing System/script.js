// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined, so they are available for the tests.
 */

export class Size {
	width = 80
	height = 60

	constructor(width, height) {
		if (width) {
			this.width = width
		}
		if (height) {
			this.height = height
		}
	}

	resize(newWidth, newHeight) {
		if (newWidth) {
			this.width = newWidth
		}
		if (newHeight) {
			this.height = newHeight
		}
	}
}

export class Position {
	x = 0
	y = 0

	constructor(x, y) {
		if (x) {
			this.x = x
		}
		if (y) {
			this.y = y
		}
	}

	move (x, y) {
		if (x) {
			this.x = x
		}
		if (y) {
			this.y = y
		}
	}
}

export class ProgramWindow {
	screenSize = new Size(800, 600)
	size = new Size()
	position = new Position()

	constructor() {}

	isCoordinatesOutOfBoundaries (newCoordinates) {
		return this.screenSize.width < newCoordinates.x || this.screenSize.height < newCoordinates.y
	}

	isSizeOutOfBoundaries (newSize) {
		return this.screenSize.width < newSize.width || this.screenSize.height < newSize.height
	}

	move (position) {
		if (this.isCoordinatesOutOfBoundaries(position)) {
			this.position = new Position(this.screenSize.width - this.size.width, this.screenSize.height - this.size.height)
			return this
		}
		if (position.x < 1 || position.y < 1) {
			this.position = new Position(0, 0)
			return this
		}

		this.position = position
		return this
	}

	resize (newSize) {
		if (this.isSizeOutOfBoundaries(newSize)) {
			this.size = new Size(this.screenSize.width - this.position.x, this.screenSize.height - this.position.y)
			return this
		}

		if (newSize.width < 1 || newSize.height < 1) {
			this.size = new Size(1, 1)
			return this
		}

		this.size = newSize
		return this
	}
}

export function changeWindow (programWindow) {
	return programWindow.resize(new Size(400, 300)).move(new Position(100, 150))
}
