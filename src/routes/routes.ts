import { Router } from 'express'
import { userRouter } from './user.ts'
import { sessionRouter } from './session.ts'
import { urlRouter } from './url.ts'
import { UrlController } from '../controllers/url.ts'

export const router = Router()

router.use('/users', userRouter)
router.use('/sessions', sessionRouter)
router.use('/urls', urlRouter)

router.get('/:shortId', UrlController.redirect)
