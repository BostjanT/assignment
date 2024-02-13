'use client'
import React, { useState } from 'react'
import { FormDataSchema } from './schema'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import LeftSideBar from './LeftSideBar'

type Inputs = z.infer<typeof FormDataSchema>
type FieldName = keyof Inputs
export const steps = [
    {
        id: 'Step 1',
        name: 'Start your business now',
        fields: ['email'],
    },
    {
        id: 'Step 2',
        name: 'Choose the type of company',
        fields: ['llc', 'company'],
    },
    {
        id: 'Step 3',
        name: 'Board of directors',
        fields: ['directors'],
    },
    {
        id: 'Step 4',
        name: 'Thank you',
    },
]

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(0)

    const {
        register,
        handleSubmit,
        reset,
        trigger,
        control,
        getValues,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(FormDataSchema) })

    const { fields, append, remove } = useFieldArray({
        name: 'directors',
        control: control,
    })

    const processForm: SubmitHandler<Inputs> = (data) => {
        console.log('Form submitted', data)
        reset()
    }

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return
        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await handleSubmit(processForm)()
            }
            setCurrentStep((step) => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep((step) => step - 1)
        }
    }

    return (
        <section className='relative mx-auto grid min-h-80 w-full grid-cols-4'>
            <LeftSideBar currentStep={currentStep} />
            {/*part for form */}
            <div className='col-span-3 flex items-center justify-center bg-slate-200'>
                <div className='w-2/>3'>
                    <form onSubmit={handleSubmit(processForm)} className='my-12'>
                        {currentStep === 0 && (
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

                                            <button
                                                type='submit'
                                                onClick={next}
                                                className='w-1/4 rounded-lg  bg-blue-700  text-sm font-medium text-white hover:bg-blue-800 focus:ring-2 focus:ring-blue-300'>
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
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default MultiStepForm
