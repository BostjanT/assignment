'use client'
import React, { useState } from 'react'
import { FormDataSchema } from './schema'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { ZodError, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import LeftSideBar from './LeftSideBar'
import FormButtons from './FormButtons'
import FirstStep from '../forms/FirstStep'

export type Inputs = z.infer<typeof FormDataSchema>
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
    const [checked, setChecked] = useState(false)

    const check = () => {
        setChecked((prev) => !prev)
    }

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

    function validateStep(): boolean {
        let stepHasErrors = false
        const fields = steps[currentStep]
        for (let index = 0; index < steps.length; index++) {
            const key = steps[currentStep][index]
            try {
                FormDataSchema[key].parse(formData[key].value)
            } catch (error) {
                if (error instanceof ZodError) {
                    error.errors.forEach((err) => {
                        if (key && key in formData) {
                            stepHasErrors = true
                        }
                    })
                }
            }
        }
        return stepHasErrors ? false : true
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
                            /*  <div>
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
                                                className='btn w-1/4'>
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
                            </div> */
                            <FirstStep useForm={useForm} next={next} />
                        )}
                        {currentStep === 1 && (
                            <div>
                                <h1 className='mb-6 text-2xl font-semibold leading-6 text-gray-900'>
                                    Choose the type of company
                                </h1>
                                <p className='text-grey-900 tracking-wider'>
                                    Creating your company in US is just few steps away.
                                </p>
                                <p className='text-grey-900 mt-8 tracking-wider'>
                                    Enter your email address to continue
                                </p>
                                <div>
                                    <div className='my-4 max-w-80' onClick={check}>
                                        <input
                                            type='radio'
                                            id='llc'
                                            className='peer hidden'
                                            value={'llc'}
                                            {...register('llcOrCompany', { required: true })}
                                        />
                                        <label
                                            htmlFor='llc'
                                            className='flex cursor-pointer gap-5 rounded-md border-2 bg-white p-4 shadow-md peer-checked:border-blue-400 peer-checked:bg-blue-200'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='black'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='currentColor'
                                                className='h-12 w-12 self-center bg-blue-500 p-3'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
                                                />
                                            </svg>
                                            <div className='flex flex-col'>
                                                <p className='text-xs font-semibold uppercase'>
                                                    LLC
                                                </p>
                                                <p className='mt-2 text-xs '>
                                                    Owned by individuals
                                                </p>
                                            </div>
                                            <div className='mx-auto my-auto'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    strokeWidth={1.5}
                                                    stroke='blue'
                                                    className=' h-6 w-6'>
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                                                    />
                                                </svg>
                                            </div>
                                        </label>
                                    </div>
                                    <div className='my-4 max-w-80'>
                                        <input
                                            type='radio'
                                            value='company'
                                            id='company'
                                            className='peer hidden'
                                            {...register('llcOrCompany', { required: true })}
                                        />
                                        <label
                                            htmlFor='company'
                                            className='flex cursor-pointer gap-5 rounded-md border-2 bg-white p-4 shadow-md peer-checked:border-blue-400 peer-checked:bg-blue-200'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='black'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='currentColor'
                                                className='h-12 w-12 self-center bg-blue-500 p-3'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z'
                                                />
                                            </svg>
                                            <div className='flex flex-col'>
                                                <p className='text-xs font-semibold uppercase'>
                                                    CORPORATION
                                                </p>
                                                <p className='mt-2 text-xs '>
                                                    Owned by Stockholders
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div>
                                <h1 className='mb-6 text-2xl font-semibold leading-6 text-gray-900'>
                                    Board of Directors
                                </h1>
                                <p className='tracking-wider text-gray-500'>
                                    Creating your company in US is just few steps away
                                </p>
                                <p className='mb-8 tracking-wider text-gray-500'>
                                    Enter your information to continue
                                </p>
                                {fields.map((field, index) => (
                                    <div key={field.id} className='flex w-full flex-wrap gap-2'>
                                        <div className='w-2/5'>
                                            <label htmlFor='firstName'>First Name</label>
                                            <input
                                                type='text'
                                                className='input'
                                                id='firstName'
                                                required
                                                {...register(`directors.${index}.firstName`)}
                                            />
                                            {errors.directors?.message && (
                                                <p className='mt-2 text-sm text-red-400'>
                                                    {errors.directors.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className='w-2/5'>
                                            <label htmlFor='lastName'>Last Name</label>
                                            <input
                                                type='text'
                                                className='input'
                                                id='lastName'
                                                required
                                                {...register(`directors.${index}.lastName`)}
                                            />
                                            {errors.directors?.message && (
                                                <p className='mt-2 text-sm text-red-400'>
                                                    {errors.directors.message}
                                                </p>
                                            )}
                                        </div>
                                        {index > 0 && (
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='red'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='red'
                                                className='hover:pointer mt-8 h-6 w-6'
                                                onClick={() => remove(index)}>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M6 18 18 6M6 6l12 12'
                                                />
                                            </svg>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type='button'
                                    className='px-3 py-2 text-blue-700'
                                    onClick={() => append({ firstName: '', lastName: '' })}>
                                    + Add director
                                </button>
                            </div>
                        )}
                        {currentStep === 3 && (
                            <>
                                <h2 className='text-base font-semibold leading-7 text-gray-950'>
                                    Form Complete
                                </h2>
                                <p className='mt-2 text-sm leading-6 text-gray-500'>
                                    Thank you for your submission
                                </p>
                                <button
                                    className='px-3 py-2 text-blue-700'
                                    onClick={() => setCurrentStep(0)}>
                                    Try again
                                </button>
                            </>
                        )}
                    </form>
                    <FormButtons currentStep={currentStep} prev={prev} next={next} steps={steps} />
                </div>
            </div>
        </section>
    )
}

export default MultiStepForm
