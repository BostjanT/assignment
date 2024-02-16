'use client'
import React, { useState } from 'react'
import { FormDataSchema } from './schema'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import LeftSideBar from './LeftSideBar'
import FormButtons from './FormButtons'
import CompanyStep from '../forms/CompanyStep'
import PersonalStep from '../forms/PersonalInfo'
import DirectorsStep from '../forms/DirectorsStep'
import RestartForm from '../forms/RestartForm'

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
                            <PersonalStep
                                register={register}
                                next={next}
                                errorMessage={errors.email?.message}
                            />
                        )}
                        {currentStep === 1 && <CompanyStep register={register} next={next} />}
                        {currentStep === 2 && (
                            <DirectorsStep
                                register={register}
                                errorMessage={errors.directors?.message}
                                remove={remove}
                                append={append}
                                fields={fields}
                            />
                        )}
                        {currentStep === 3 && <RestartForm restartForm={() => setCurrentStep(0)} />}
                    </form>
                    <FormButtons currentStep={currentStep} prev={prev} next={next} steps={steps} />
                </div>
            </div>
        </section>
    )
}

export default MultiStepForm
