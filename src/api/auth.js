import httpClient from '../config/http'

export function login({ username, password }) {
    return httpClient.post('/auth/login', {
        username,
        password,
    })
}

export async function register({ username, password }) {
    const user = await httpClient.post('/auth/register', {
        username,
        password,
    })

    if (user) return login({ username, password })
}
