import { Url } from '../schemas/mongodb/url.ts'
import { Session } from '../schemas/mongodb/session.ts'
import { User } from '../schemas/mongodb/user.ts'
import { SessionNotFoundError, UserNotFoundError, UrlNotFoundError } from '../errors.ts'

export class UrlModel {
  static async getAll (params) {
    const { sessionId } = params

    const session = await Session.findById(sessionId)
    if (!session) throw new SessionNotFoundError('session not found')

    const user = await User.findById(session.userId)
    if (!user) throw new UserNotFoundError('user not found')

    const urls = await Url.find({ userId: user._id })

    return urls 
  }

  static async create (input) {

    const { url, sessionId } = input

    const session = await Session.findById(sessionId)
    const userId = session? session.userId : null

    const insertedUrl = await Url.create({ userId, url })

    return insertedUrl.shortId
  }

  static async delete (params) {

    const { id } = params

    const url = await Url.findOne({ _id: id })
    if (!url) throw new UrlNotFoundError('url not found')

    await url.deleteOne()
  }

  static async getUrl (params) {

    const { shortId } = params

    const url = await Url.findOne({ shortId: shortId })
    if (!url) throw new UrlNotFoundError('url not found')

    url.views ++
    url.save()

    return url.url
  }
}
