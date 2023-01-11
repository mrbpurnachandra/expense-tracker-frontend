import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    redirect,
    Route,
    RouterProvider,
} from 'react-router-dom'

import './index.css'

import Layout from './components/Layout'
import ExpenseLayout from './components/ExpenseLayout'

import ExpenseIndex from './pages/expense'
import Login, { action as loginAction } from './pages/login'
import { action as logoutAction } from './pages/logout'

import auth from './middlewares/auth'
import guest from './middlewares/guest'

import ExpenseCreate, {
    action as expenseCreateAction,
} from './pages/expense/create'
import ExpenseEdit, {
    action as expenseEditAction,
    loader as expenseEditLoader,
} from './pages/expense/edit'
import ExpenseDelete, {
    action as expenseDeleteAction,
    loader as expenseDeleteLoader,
} from './pages/expense/delete'
import ErrorElement from './components/ErrorElement'
import Register, { action as registerAction } from './pages/register'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            <Route index element={<Navigate to='/expense' />} />
            <Route
                path='/expense'
                element={<ExpenseLayout />}
                errorElement={<ErrorElement />}
            >
                <Route index element={<ExpenseIndex />} loader={auth()} />
                <Route
                    path='create'
                    element={<ExpenseCreate />}
                    loader={auth()}
                    action={expenseCreateAction}
                />
                <Route
                    path=':id/edit'
                    element={<ExpenseEdit />}
                    loader={auth(expenseEditLoader)}
                    action={expenseEditAction}
                />
                <Route
                    path=':id/delete'
                    element={<ExpenseDelete />}
                    loader={auth(expenseDeleteLoader)}
                    action={expenseDeleteAction}
                />
            </Route>
            <Route
                path='/login'
                element={<Login />}
                loader={guest()}
                action={loginAction}
            />
            <Route
                path='/register'
                element={<Register />}
                loader={guest()}
                action={registerAction}
            />
            <Route
                path='/logout'
                loader={auth(() => redirect('/'))}
                action={logoutAction}
            />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
