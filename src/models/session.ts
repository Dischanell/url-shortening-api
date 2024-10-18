import { Session } from '../schemas/mongodb/session.ts'
import { User } from '../schemas/mongodb/user.ts'
import { InvalidLoginError, SessionNotFoundError } from '../errors.ts'

export class SessionModel {
  static async create (input) {

    const { email, password } = input

    const user = await User.findOne({ email: email })
    if (!user) throw new InvalidLoginError('incorrect email or password')

    const validPassword = await user.validatePassword(password)
    if (!validPassword) throw new InvalidLoginError('incorrect email or password')

    const { _id: sessionId } = await Session.create({ userId: user._id})

    return { sessionId }
  }

  static async delete (params) {

    const { id } = params

    const session = await Session.findOne({ _id: id })
    if (!session) throw new SessionNotFoundError('session not found')

    await session.deleteOne()
  }
}
