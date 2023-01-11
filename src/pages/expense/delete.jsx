import moment from 'moment'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { deleteExpense, getExpense } from '../../api/expense'

export default function Delete() {
    const expense = useLoaderData()

    
    return (
        <div className='mt-4'>
            <h3 className='text-gray-800'>
                Do you really want to delete the following expense entry?
            </h3>

            <div className='mt-8'>
                <div>
                    <h4 className='text-gray-700 text-sm font-semibold'>
                        {expense.topic}
                    </h4>
                    <p className='text-2xl text-gray-800'>{expense.amount}$</p>

                    <p className='mt-4 text-xs text-gray-500 font-semibold'>
                        {moment(expense.created_at).format('Do MMM, YYYY')}
                    </p>
                </div>
            </div>
            <Form method='post'>
                <button
                    className='mt-6 rounded-md border border-red-300 bg-red-800 px-4 py-2 text-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-red-800 disabled:bg-red-300 disabled:text-red-500'
                    type='submit'
                >
                    Delete
                </button>
            </Form>
        </div>
    )
}

export async function loader({ params }) {
    return await getExpense(params.id)
}

export async function action({ params }) {
    try {
        await deleteExpense(params.id)
    } catch (err) {
        alert(err.message)
    }
    return redirect('/expense')
}
