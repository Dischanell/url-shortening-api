import { SessionModel } from '../models/session.ts'
import { validateUser, validateObjectIdInput } from '../schemas/zod/userInput.ts'
import { InvalidLoginError, SessionNotFoundError } from '../errors.ts'

export class SessionController {
  static async create (req, res) {

    const validatedInput = validateUser(req.body)
    if (!validatedInput.success) return res.status(400).json({ error: JSON.parse(validatedInput.error.message) })

    try {
      const response = await SessionModel.create(validatedInput.data)

      res.cookie('sessionId', response.sessionId.toString())

      res.status(201).json(response)
    } catch (e) {
      if (e instanceof InvalidLoginError) res.status(401).json({ error: e.message })
      res.status(500).json({ error: e.message })
    }
  }

  static async delete (req, res) {

    const validatedInput = validateObjectIdInput(req.params)
    if (!validatedInput.success) return res.status(400).json({ error: JSON.parse(validatedInput.error.message) })

    try {
      await SessionModel.delete(validatedInput.data)

      res.clearCookie('sessionId')

      res.status(204).send()
    } catch (e) {
      if (e instanceof SessionNotFoundError) res.status(404).json({ error: e.message })
      res.status(500).json({ error: e.message })
    }
  }
}
