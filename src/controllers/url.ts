import { UrlModel } from '../models/url.ts'
import { validateSessionIdInput, validateUrlInput, validateShortIdInput, validateObjectIdInput } from '../schemas/zod/userInput.ts'
import { SessionNotFoundError, UserNotFoundError, UrlNotFoundError } from '../errors.ts'

export class UrlController {
  static async getAll (req, res) {

    const validatedInput = validateSessionIdInput(req.cookies)
    if (!validatedInput.success) return res.status(400).json({ error: JSON.parse(validatedInput.error.message) })

    try {
      const urls = await UrlModel.getAll(validatedInput.data)

      res.status(200).json(urls)
    } catch (e) {
      if (e instanceof SessionNotFoundError || e instanceof UserNotFoundError) {
        res.status(404).json({ error: e.message });
      } else {
        res.status(500).json({ error: e.message });
      }
    }
  }

  static async create (req, res) {

    const validatedUrlInput = validateUrlInput(req.body)
    if (!validatedUrlInput.success) return res.status(400).json({ error: JSON.parse(validatedUrlInput.error.message) })

    const validatedSessionIdInput = validateSessionIdInput(req.cookies)

    const input = {
      url: validatedUrlInput.data.url,
      sessionId: validatedSessionIdInput.success ? validatedSessionIdInput.data.sessionId : null
    }

    try {
      const url = await UrlModel.create(input)

      res.status(201).json(url)
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async delete (req, res) {

    const validatedInput = validateObjectIdInput(req.params)
    if (!validatedInput.success) return res.status(400).json({ error: JSON.parse(validatedInput.error.message) })

    try {
      await UrlModel.delete(validatedInput.data)

      res.status(204).send()
    } catch (e) {
      if (e instanceof UrlNotFoundError) {
        res.status(404).json({ error: e.message });
      } else {
        res.status(500).json({ error: e.message });
      }
    }
  }

  static async redirect (req, res) {

    const validatedInput = validateShortIdInput(req.params)
    if (!validatedInput.success) return res.status(400).json({ error: JSON.parse(validatedInput.error.message) })

    try {
      const url = await UrlModel.getUrl(validatedInput.data)

      res.redirect(url)
    } catch (e) {
      if (e instanceof UrlNotFoundError) {
        res.status(404).json({ error: e.message });
      } else {
        res.status(500).json({ error: e.message });
      }
    }
  }
}
