import { User } from '../schemas/mongodb/user.ts'
import { UserNotFoundError, DuplicateEmailError } from '../errors.ts'

export class UserModel {
  static async register (input: { email: string; password: string }) {

    const emailExists = await User.findOne({ email: input.email })
    if (emailExists) throw new DuplicateEmailError('duplicate email')

    const user = new User(input)
    const { _id: insertedId } = await user.save()

    return { id: insertedId }
  }

  static async update (id: string, input: { email?: string, password?: string }) {

    const user = await User.findOne({ _id: id })
    if (!user) throw new UserNotFoundError('user not found')

    const emailExists = await User.findOne({ email: input.email })
    if (emailExists) throw new DuplicateEmailError('duplicate email')

    if (input.email) user.email = input.email
    if (input.password) user.password = input.password

    await user.save()
  }

  static async delete (id) {

    const user = await User.findOne({ _id: id })
    if (!user) throw new UserNotFoundError('user not found')

    await user.deleteOne()
  }
}
