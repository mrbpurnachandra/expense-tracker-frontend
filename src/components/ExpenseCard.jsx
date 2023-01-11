import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const urgency = {
    1: 'bg-green-400',
    2: 'bg-indigo-400',
    3: 'bg-red-400',
}

export default function ExpenseCard({ expense }) {
    const [hover, setHover] = useState(false)

    return (
        <div
            className='relative max-w-sm border border-gray-200 rounded-lg px-6 py-4 bg-white'
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            {hover && (
                <div className='absolute inset-0 flex items-center justify-center w-full h-full bg-blue-500 rounded-lg'>
                    <div className='space-x-6 flex'>
                        <Link to={`${expense.id}/edit`} className='text-sm text-white'>
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
                                    d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                                />
                            </svg>
                        </Link>
                        <Link to={`${expense.id}/delete`} className='text-sm text-white'>
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
                                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            )}
            <div>
                <h4 className='text-gray-700 text-sm font-semibold'>
                    {expense.topic}
                </h4>
                <p className='text-2xl text-gray-800'>{expense.amount}$</p>

                <p className='mt-4 text-xs text-gray-500 font-semibold'>
                    {moment(expense.created_at).format('Do MMM, YYYY')}
                </p>
                <div
                    className={`absolute -top-1 -left-1 w-4 h-4 border-2 border-transparent rounded-full ${
                        urgency[expense.urgency_id]
                    }`}
                ></div>
            </div>
        </div>
    )
}
