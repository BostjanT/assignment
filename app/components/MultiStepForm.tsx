import React, { useState } from 'react'
import { FormDataSchema } from './schema'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(FormDataSchema) })

    const { fields, append, remove } = useFieldArray({
        name: 'directors',
        control: control,
    })

    const processForm: SubmitHandler<Inputs> = (data) => {
        console.log(data)
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

    return <div>MultiStepForm</div>
}

export default MultiStepForm
