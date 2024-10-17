import { Router } from 'express'
import { SessionController } from '../controllers/session.ts'

export const sessionRouter = Router()

sessionRouter.post('/', SessionController.create)
sessionRouter.delete('/:id', SessionController.delete)
