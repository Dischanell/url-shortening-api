import { Router } from 'express'
import { userRouter } from './user.ts'
import { urlRouter } from './url.ts'
import { UrlController } from '../controllers/url.ts'

export const router = Router()

router.use('/users', userRouter)
router.use('/urls', urlRouter)

router.get('/:short_id', UrlController.redirect)
