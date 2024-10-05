import { Router } from 'express'
import { UserController } from '../controllers/user.ts'

export const userRouter = Router()

userRouter.post('/register', UserController.register)
userRouter.patch('/:id', UserController.update)
userRouter.delete('/:id', UserController.delete)
