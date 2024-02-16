import React from 'react'

import {
    FieldArrayWithId,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFormRegister,
} from 'react-hook-form'

type CompanyProps = {
    register: UseFormRegister<{
        email: string
        llcOrCompany: 'llc' | 'company'
        directors: {
            firstName: string
            lastName: string
        }[]
    }>
    errorMessage: string | undefined
    remove: UseFieldArrayRemove
    append: UseFieldArrayAppend<
        {
            email: string
            llcOrCompany: 'llc' | 'company'
            directors: {
                firstName: string
                lastName: string
            }[]
        },
        'directors'
    >

    fields: FieldArrayWithId<
        {
            email: string
            llcOrCompany: 'llc' | 'company'
            directors: {
                firstName: string
                lastName: string
            }[]
        },
        'directors',
        'id'
    >[]
}
const DirectorsStep = ({ register, errorMessage, fields, remove, append }: CompanyProps) => {
    return (
        <div>
            <h1 className='mb-6 text-2xl font-semibold leading-6 text-gray-900'>
                Board of Directors
            </h1>
            <p className='tracking-wider text-gray-500'>
                Creating your company in US is just few steps away
            </p>
            <p className='mb-8 tracking-wider text-gray-500'>Enter your information to continue</p>
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
            {errorMessage && <p className='mt-2 text-sm text-red-400'>{errorMessage}</p>}
            <button
                type='button'
                className='px-3 py-2 text-blue-700'
                onClick={() => append({ firstName: '', lastName: '' })}>
                + Add director
            </button>
        </div>
    )
}

export default DirectorsStep
