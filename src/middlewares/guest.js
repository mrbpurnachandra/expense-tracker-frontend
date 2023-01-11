import { redirect } from 'react-router-dom'
import { createMiddleware } from '../lib/middleware'
import { getUser } from '../lib/token'

function guest(args) {
    const user = getUser()
    if (user) return redirect('/')
}

export default createMiddleware(guest)
