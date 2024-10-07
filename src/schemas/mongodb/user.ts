import mongoose, { Schema } from 'mongoose'
import { hash, compare } from 'bcrypt'

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

UserSchema.pre('save', async function(next){
    const hashedPassword = await hash(this.password, 12)
    this.password = hashedPassword

    next()
})

UserSchema.method('validatePassword', async function (password: string): Promise<boolean> {
    return await compare(password, this.password)
})

export const User = mongoose.model('User', UserSchema)
