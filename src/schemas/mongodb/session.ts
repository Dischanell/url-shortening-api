import mongoose, { Schema } from 'mongoose'

const SessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        required: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    userIp: String,
    userAgent: String
})

export const Session = mongoose.model('Session', SessionSchema)
