import React from 'react'

import { UseFormRegister } from 'react-hook-form'

type CompanyProps = {
    register: UseFormRegister<{
        email: string
        llcOrCompany: 'llc' | 'company'
        directors: {
            firstName: string
            lastName: string
        }[]
    }>
    next: () => void
}
const CompanyStep = ({ register, next }: CompanyProps) => {
    return (
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
                <div className='relative my-4 max-w-80'>
                    <input
                        type='radio'
                        id='llc'
                        className='peer hidden'
                        value={'llc'}
                        defaultChecked={true}
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
                            <p className='text-xs font-semibold uppercase'>LLC</p>
                            <p className='mt-2 text-xs '>Owned by individuals</p>
                        </div>
                    </label>
                    <button
                        onClick={next}
                        className=' absolute right-8 top-1/2 mx-auto my-auto hidden -translate-y-1/2 peer-checked:block'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='blue'
                            className='h-6 w-6'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                            />
                        </svg>
                    </button>
                </div>
                <div className='relative my-4 max-w-80'>
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
                            <p className='text-xs font-semibold uppercase'>CORPORATION</p>
                            <p className='mt-2 text-xs '>Owned by Stockholders</p>
                        </div>
                    </label>
                    <button
                        onClick={next}
                        className='absolute right-8 top-1/2 mx-auto my-auto hidden -translate-y-1/2 peer-checked:block'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='blue'
                            className='h-6 w-6'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CompanyStep
