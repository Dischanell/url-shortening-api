import { UserModel } from '../models/user.ts'
import { validateUser, validatePartialUser } from '../schemas/zod/user.ts'

export class UserController {
  static async register (req, res) {

    const validatedInput = validateUser(req.body)
    if (!validatedInput.success) return res.status(400).json({ error: JSON.parse(validatedInput.error.message) })

    try {
      const response = await UserModel.register(validatedInput.data)
      res.status(201).json(response)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  static async update (req, res) {
    const { id } = req.params

    const validatedInput = validatePartialUser(req.body)
    if (!validatedInput.success) return res.status(400).json({ error: JSON.parse(validatedInput.error.message) })

    try {
      const response = await UserModel.update(id, validatedInput.data)
      res.status(200).json(response)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }

  static async delete (req, res) {
    const { id } = req.params

    try {
      const response = await UserModel.delete(id)
      res.status(204).json(response)
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }
}
