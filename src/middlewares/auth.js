import { redirect } from 'react-router-dom'
import { createMiddleware } from '../lib/middleware'
import { getUser } from '../lib/token'

function auth(args) {
    const user = getUser()
    if (!user) return redirect('/login')
}

export default createMiddleware(auth)
