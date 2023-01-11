import { Form, Link, redirect, useActionData } from 'react-router-dom'
import { login } from '../api/auth'
import { storeAuthToken } from '../lib/token'
import schema from '../schemas/loginCredentials'

export default function Login() {
    const error = useActionData()

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='-mt-12'>
                <h3 className='text-gray-800'>Login</h3>
                {error && (
                    <div className='w-64 mt-4 rounded-md border-red-100 bg-red-50 px-4 py-4 text-sm text-red-600'>
                        <p>{error}</p>
                    </div>
                )}
                <Form method='post' action='/login'>
                    <div>
                        <label className='sr-only' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='w-64 mt-6 rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600'
                            type='text'
                            placeholder='username'
                            name='username'
                        />
                    </div>
                    <div>
                        <label className='sr-only' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='w-64 mt-6 rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600'
                            type='password'
                            placeholder='password'
                            name='password'
                        />
                    </div>
                    <button
                        className='mt-6 rounded-md border border-gray-300 bg-gray-800 px-4 py-2 text-sm text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-800 disabled:bg-gray-300 disabled:text-gray-500'
                        type='submit'
                    >
                        Login
                    </button>
                </Form>
                <p className='mt-2 text-sm text-gray-600'>
                    Don't have an account?
                    <Link
                        className='font-semibold text-gray-700'
                        to='/register'
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export async function action({ request }) {
    try {
        const credentials = Object.fromEntries(await request.formData())

        const { error, value } = schema.validate(credentials)
        if (error) throw { message: error.message, status: 400 }

        const token = await login(value)
        storeAuthToken(token)

        return redirect('/expense')
    } catch (err) {
        return err.message
    }
}
