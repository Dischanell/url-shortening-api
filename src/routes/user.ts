import { Router } from 'express'
import { UserController } from '../controllers/user.ts'

export const userRouter = Router()

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.post('/logout', UserController.logout)
userRouter.patch('/:id', UserController.update)
userRouter.delete('/:id', UserController.delete)
