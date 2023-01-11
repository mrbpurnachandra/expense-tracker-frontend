import { Form, redirect, useActionData } from 'react-router-dom'
import { addExpense } from '../../api/expense'
import expenseSchema from '../../schemas/expense'

export default function Create() {
    const error = useActionData()

    return (
        <div>
            <h3 className='text-gray-800'>Create Expense</h3>

            {error && (
                <div className='w-64 mt-4 rounded-md border-red-100 bg-red-50 px-4 py-4 text-sm text-red-600'>
                    <p>{error}</p>
                </div>
            )}

            <Form method='post'>
                <div>
                    <label htmlFor='topic' className='sr-only'>
                        Topic
                    </label>
                    <input
                        className='w-64 mt-6 rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600'
                        type='text'
                        name='topic'
                        placeholder='Title'
                    />
                </div>
                <div>
                    <label htmlFor='amount' className='sr-only'>
                        Amount
                    </label>
                    <input
                        className='w-64 mt-6 rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600'
                        type='text'
                        name='amount'
                        placeholder='Amount'
                    />
                </div>
                <div>
                    <label htmlFor='urgencyId' className='sr-only'>
                        Urgency
                    </label>
                    <select
                        className='w-64 mt-6 rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600'
                        name='urgencyId'
                        placeholder='Urgency'
                    >
                        <option value='1'>Low</option>
                        <option value='2'>Medium</option>
                        <option value='3'>High</option>
                    </select>
                </div>

                <button
                    className='mt-6 rounded-md border border-gray-300 bg-gray-800 px-4 py-2 text-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-800 disabled:bg-gray-300 disabled:text-gray-500'
                    type='submit'
                >
                    Create
                </button>
            </Form>
        </div>
    )
}

export async function action({ request }) {
    try {
        const expense = Object.fromEntries(await request.formData())
        const { error, value } = expenseSchema.validate(expense)

        if (error) throw { message: error.message, status: 400 }

        await addExpense(value)
        return redirect('/expense')
    } catch (err) {
        return err.message
    }
}
