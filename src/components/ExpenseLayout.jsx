import { Form, Link, Outlet } from 'react-router-dom'
import { getUser } from '../lib/token'

export default function ExpenseLayout() {
    const user = getUser()
    if (!user) return null

    return (
        <>
            <div className='mt-8'>
                <div className='flex items-center justify-between'>
                    <h3 className='uppercase text-2xl font-semibold'>
                        Welcome @{user.username}
                    </h3>
                    <Form method='post' action='/logout'>
                        <button
                            className='flex items-center space-x-2 font-semibold text-gray-600 text-sm'
                            type='submit'
                        >
                            <span>Logout</span>
                            <span>
                                <svg
                                    className='w-6 h-6'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                                    />
                                </svg>
                            </span>
                        </button>
                    </Form>
                </div>
                <div>
                    <p className='text-gray-600 text-sm'>
                        Expense tracker helps you manage your expenses.
                    </p>
                </div>
            </div>
            <div className='mt-6'>
                <Outlet />
            </div>
        </>
    )
}
