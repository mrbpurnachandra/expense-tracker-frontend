import { redirect } from 'react-router-dom'
import { deleteAuthToken } from '../lib/token'

export function action() {
    deleteAuthToken()
    return redirect('/login')
}
