import z from 'zod'

const userSchema = z.object({
  email: z.string().email({
    message: 'invalid email'
  }),
  password: z.string().min(8, {
    message: 'password must contain at least 8 characters'
  })
})

const objectIdInputSchema = z.object({
  id: z.string().length(24, {
    message: 'invalid objectId'
  })
})

export function validateUser(input) {
  return userSchema.safeParse(input)
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input)
}

export function validateObjectIdInput(input) {
  return objectIdInputSchema.safeParse(input)
}
