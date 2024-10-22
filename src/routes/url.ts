import { Router } from 'express'
import { UrlController } from '../controllers/url.ts'

export const urlRouter = Router()

urlRouter.get('/', UrlController.getAll)
urlRouter.post('/', UrlController.create)
urlRouter.delete('/:id', UrlController.delete)
