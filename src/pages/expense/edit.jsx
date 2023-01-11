import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { editExpense, getExpense } from '../../api/expense'
import expenseSchema from '../../schemas/expense'

export default function Edit() {
    const expense = useLoaderData()
    const error = useActionData()

    return (
        <div>
            <h3 className='text-gray-800'>Edit Expense</h3>

            {error && (
                <div className='w-64 mt-4 rounded-md border-red-100 bg-red-50 px-4 py-4 text-sm text-red-600'>
                    <p>{error}</p>
                </div>
            )}
            <Form method='put'>
                <div>
                    <label htmlFor='topic' className='sr-only'>
                        Topic
                    </label>
                    <input
                        className='w-64 mt-6 rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600'
                        type='text'
                        name='topic'
                        placeholder='Title'
                        defaultValue={expense.topic}
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
                        defaultValue={expense.amount}
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
                        defaultValue={expense.urgency_id}
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
                    Update
                </button>
            </Form>
        </div>
    )
}

export async function loader({ params }) {
    return await getExpense(params.id)
}

export async function action({ request, params }) {
    try {
        const id = params.id
        const expense = Object.fromEntries(await request.formData())
        const { error, value } = expenseSchema.validate(expense)

        if (error) throw { message: error.message, status: 400 }

        await editExpense(id, value)
        return redirect('/expense')
    } catch (err) {
        return err.message
    }
}
