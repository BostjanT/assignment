import React from 'react'

type RestartFormPros = {
    restartForm: () => void
}
const RestartForm = ({ restartForm }: RestartFormPros) => {
    return (
        <>
            <h2 className='text-base font-semibold leading-7 text-gray-950'>Form Complete</h2>
            <p className='mt-2 text-sm leading-6 text-gray-500'>Thank you for your submission</p>
            <button className='px-3 py-2 text-blue-700' onClick={restartForm}>
                Try again
            </button>
        </>
    )
}

export default RestartForm
