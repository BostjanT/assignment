import React from 'react'
type FormButtonProps = {
    currentStep: number
    prev: () => void
    next: () => void
    steps: {}[]
}
const FormButtons = ({ currentStep, prev, next, steps }: FormButtonProps) => {
    return (
        <div className='flex justify-between'>
            {currentStep >= 2 && currentStep < steps.length - 1 && (
                <button
                    className='rounded-lg   text-sm font-medium text-black focus:ring-2 focus:ring-blue-300'
                    onClick={prev}>
                    PREVIOUS STEP
                </button>
            )}
            {currentStep >= 1 && currentStep < steps.length - 1 && (
                <button
                    className='rounded-xs ml-auto flex gap-1 items-center bg-blue-700 px-4 py-1  text-sm font-medium text-white hover:bg-blue-800 focus:ring-2 focus:ring-blue-300'
                    onClick={next}>
                    NEXT
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='white'
                        className='h-3 w-3'>
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                        />
                    </svg>
                </button>
            )}
        </div>
    )
}

export default FormButtons
