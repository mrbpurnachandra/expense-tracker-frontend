import jwtDecode from 'jwt-decode'

export function storeAuthToken(token) {
    localStorage.setItem('EXPENSE_TRACKER_TOKEN', token)
}

export function retriveAuthToken() {
    return localStorage.getItem('EXPENSE_TRACKER_TOKEN')
}

export function deleteAuthToken() {
    localStorage.removeItem('EXPENSE_TRACKER_TOKEN')
}

export function decodeToken(token) {
    try {
        return jwtDecode(token)
    } catch (err) {
        return null
    }
}

export function getUser() {
    return decodeToken(retriveAuthToken())
}
