import { User } from '../schemas/mongodb/user.ts'

export class UserModel {
  static async register (input: { email: string; password: string }) {

    const userExists = await User.findOne({ email: input.email })
    if (userExists) throw Error('This email has already been registered')

    const user = new User(input)
    const { _id: insertedId } = await user.save()

    return { id: insertedId }
  }

  static async update (id: string, input: { email?: string, password?: string }) {
    const user = await User.findOne({ _id: id })
    if (!user) throw Error('User not found')

    await user.updateOne(input)

    return input
  }

  static async delete (id) {
    const user = await User.findOne({ _id: id })
    if (!user) throw Error('User not found')

    await user.deleteOne()

    return {}
  }
}
