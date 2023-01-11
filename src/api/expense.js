import httpClient from '../config/http'
import { retriveAuthToken } from '../lib/token'

export function getExpenses(interval) {
    const token = retriveAuthToken()

    let startDate = ''
    let endDate = ''
    if (interval) {
        startDate = interval.startDate ?? ''
        endDate = interval.endDate ?? ''
    }

    return httpClient.get(
        `/expense?startDate=${startDate}&endDate=${endDate}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
}

export function addExpense(expense) {
    const token = retriveAuthToken()

    return httpClient.post('/expense', expense, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function getExpense(id) {
    const token = retriveAuthToken()

    return httpClient.get(`/expense/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function editExpense(id, newExpense) {
    const token = retriveAuthToken()

    return httpClient.put(`/expense/${id}`, newExpense, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function deleteExpense(id) {
    const token = retriveAuthToken()

    return httpClient.delete(`/expense/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
