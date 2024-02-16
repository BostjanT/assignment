import { z } from 'zod'

export const FormDataSchema = z.object({
    email: z.string().min(3, 'Email is required').email('Invalid email address'),
    llcOrCompany: z
        .string()
        .min(1, { message: 'Please select a card' })
        .refine((data) => data.trim() == '', { message: 'Please select a card' }),

    directors: z.array(
        z.object({
            firstName: z.string().min(2, { message: 'Please enter first name' }),
            lastName: z.string().min(2, { message: 'Please enter last name' }),
        }),
    ),
})
