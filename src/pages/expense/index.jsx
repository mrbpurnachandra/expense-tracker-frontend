import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getExpenses } from '../../api/expense'
import ExpenseCard from '../../components/ExpenseCard'
import ExpenseChart from '../../components/ExpenseChart'
import ExpenseFilter from '../../components/ExpenseFilter'

export default function Index() {
    const [expenses, setExpenses] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        async function fetchExpenses() {
            const expenses = await getExpenses({ startDate, endDate })
            setExpenses(expenses)
        }

        fetchExpenses()
    }, [startDate, endDate])

    return (
        <div>
            <div>
                <ExpenseFilter
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                />
            </div>
                <ExpenseChart expenses={expenses} />
            
            <div className='mt-4 grid grid-cols-3 gap-2'>
                <Link
                    to='/expense/create'
                    className='max-w-sm flex items-center justify-center border border-dashed border-gray-400 rounded-lg px-6 py-4 bg-white cursor-pointer group hover:border-solid hover:border-2 hover:border-blue-500'
                >
                    <p className='flex flex-col items-center space-y-2 font-semibold text-sm text-gray-800 group-hover:text-blue-500'>
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
                                    d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                            </svg>
                        </span>
                        <span>Add expense</span>
                    </p>
                </Link>
                {expenses.map((expense) => (
                    <ExpenseCard key={expense.id} expense={expense} />
                ))}
            </div>
        </div>
    )
}
