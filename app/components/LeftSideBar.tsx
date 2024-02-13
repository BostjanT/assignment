import React from 'react'
import { steps } from './MultiStepForm'
import Image from 'next/image'
import billboard from '../../public/billboard.png'

type LeftMenuProps = {
    currentStep: number
}

const LeftSideBar = ({ currentStep }: LeftMenuProps) => {
    return (
        <div className={`'col-span-1 ${currentStep >= 2 ? 'bg-white' : 'bg-blue-700'}`}>
            <nav aria-label='Progress'>
                {currentStep >= 2 ? (
                    <ol role='list' className='my-3 flex flex-col space-y-4'>
                        {steps.map((step, index) => (
                            <li key={step.name}>
                                {currentStep > index ? (
                                    <div className='translate-colors group flex w-full items-center p-6'>
                                        <span className='translate-colors text-sm font-medium text-black'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='green'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='white'
                                                className='mr-2 h-6 w-6'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                                />
                                            </svg>
                                        </span>
                                        <span className='text-sm font-light'>{step.name}</span>
                                    </div>
                                ) : currentStep === index ? (
                                    <div
                                        className='flex w-full items-center py-4'
                                        aria-current='step'>
                                        <span className='text-sm font-medium'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='black'
                                                className='h-6 w-6'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                                />
                                            </svg>
                                        </span>
                                        <span className='text-sm font-light'>{step.name}</span>
                                    </div>
                                ) : (
                                    <div className='group flex w-full flex-col items-center border-gray-200 py-4 pl-4 transition-colors'>
                                        <span className='text-sm font-medium text-gray-500 transition-colors'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                strokeWidth={1.5}
                                                stroke='grey'
                                                className='h-6 w-6'>
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                                                />
                                            </svg>
                                        </span>
                                        <span className='text-sm font-light'>{step.name}</span>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <div className='mt-20 px-8 text-left'>
                        <h1 className='text-bold text-2xl text-white'>
                            A few clicks away from creating your company
                        </h1>
                        <div className='mt-8'>
                            <p className='text-slate-300'>Start your company in minutes</p>
                        </div>
                        <Image src={billboard} alt={''} className='mb-2 ml-auto mt-12 h-60 w-40' />
                    </div>
                )}
            </nav>
        </div>
    )
}

export default LeftSideBar
