import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <ul className='mx-4 flex items-center justify-between'>
            <li>
                <Link href={'/'}>Company</Link>
            </li>
            <li>
                <Link href={'/'}>
                    Need help <span className='ml-2 text-blue-400'>contact us</span>{' '}
                </Link>
            </li>
        </ul>
    )
}

export default Header
