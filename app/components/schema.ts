import { z } from 'zod'

export const FormDataSchema = z.object({
    email: z.string().min(3, 'Email is required').email('Invalid email address'),
    llcOrCompany: z.enum(['llc', 'company']),
    directors: z
        .array(
            z.object({
                firstName: z.string().min(2, { message: 'Please enter first name' }),
                lastName: z.string().min(2, { message: 'Please enter last name' }),
            }),
        )
        .min(1, 'You need to add at least one director'),
})
