import { useRouteError } from 'react-router-dom'

export default function ErrorElement() {
    const error = useRouteError()

    return <p>Something went wrong</p>
}
