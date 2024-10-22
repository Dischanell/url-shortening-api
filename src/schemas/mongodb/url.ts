import mongoose, { Schema } from 'mongoose'
import { nanoid } from 'nanoid'

const UrlSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  url: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    default: () => nanoid(6)
  },
  views: {
    type: Number,
    required: true,
    default: 0
  }
})

export const Url = mongoose.model('Url', UrlSchema)
