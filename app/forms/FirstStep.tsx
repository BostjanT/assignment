import React from 'react'
import { Inputs } from '../components/MultiStepForm'
import { FormDataSchema } from '../components/schema'
import { zodResolver } from '@hookform/resolvers/zod'

type FirstAepProps = {
    useForm: any
    next: () => void
}
const FirstStep = ({ useForm, next }: FirstAepProps) => {
    const {
        register,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(FormDataSchema) })

    return (
        <div>
            <h1 className='mb-6 text-3xl font-semibold leading-6 text-gray-900'>
                Start your business now
            </h1>
            <p className='tracing-wider text-gray-500'>
                Creating your company in US is just few steps away
            </p>
            <p className='mb-8 tracking-wider text-gray-500'>
                Enter your email address to continue
            </p>
            <div>
                <label htmlFor='email'>Enter email</label>
                <div className='relative flex flex-col justify-center'>
                    <div className='flex gap-3 '>
                        <input
                            type='email'
                            id='email'
                            {...register('email')}
                            className='input w-2/3'
                        />

                        <button type='submit' onClick={next} className='btn w-1/4'>
                            Get started
                        </button>
                    </div>
                    {errors.email?.message && (
                        <p className='absolute top-12 text-sm text-red-400'>
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FirstStep
