export function createMiddleware(fn) {
    return (next) => {
        return (args) => {
            const r = fn(args)
            if (r) return r

            if (typeof next === 'function') return next(args)
            return null
        }
    }
}
