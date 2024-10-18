import { DuplicateEmailError, UserNotFoundError } from '../errors.ts'
import { UserModel } from '../models/user.ts'
import { validateUser, validatePartialUser } from '../schemas/zod/userInput.ts'

export class UserController {
  static async register (req, res) {

    const validatedInput = validateUser(req.body)
    if (!validatedInput.success) return res.status(400).json({ error: JSON.parse(validatedInput.error.message) })

    try {
      const response = await UserModel.register(validatedInput.data)

      res.status(201).json(response)
    } catch (e) {
      if (e instanceof DuplicateEmailError) {
        res.status(409).json({ error: e.message })
      } else {
        res.status(500).json({ error: e.message })
      }
    }
  }

  static async update (req, res) {

    const { id } = req.params

    const validatedInput = validatePartialUser(req.body)
    if (!validatedInput.success) return res.status(400).json({ error: JSON.parse(validatedInput.error.message) })

    try {
      await UserModel.update(id, validatedInput.data)
      res.status(204).send()
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        res.status(404).json({ error: e.message })
      } else if (e instanceof DuplicateEmailError) {
        res.status(409).json({ error: e.message })
      } else {
        res.status(500).json({ error: e.message })
      } 
    }
  }

  static async delete (req, res) {
    
    const { id } = req.params

    try {
      await UserModel.delete(id)
      res.status(204).send()
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        res.status(404).json({ error: e.message });
      } else {
        res.status(500).json({ error: e.message });
      }
    }
  }
}
