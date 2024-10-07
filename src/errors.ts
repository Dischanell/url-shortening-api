export class ConnectionError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'ConnectionError'
	}
}

export class ValidationError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'ValidationError'
	}
}

export class UserNotFoundError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'UserNotFoundError'
	}
}

export class DuplicateEmailError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'DuplicateEmailError'
	}
}
