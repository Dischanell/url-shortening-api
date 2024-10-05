import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})

export const User = mongoose.model('User', UserSchema)