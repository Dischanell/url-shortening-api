export class ConnectionError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'ConnectionError'
	}
}

export class UserNotFoundError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'UserNotFoundError'
	}
}

export class SessionNotFoundError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'SessionNotFoundError'
	}
}

export class InvalidLoginError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'InvalidLoginError'
	}
}

export class DuplicateEmailError extends Error {
	constructor(message: string | undefined) {
		super(message)
		this.name = 'DuplicateEmailError'
	}
}
