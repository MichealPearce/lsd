import { useAuth } from 'client/stores/auth'
import type { MiddlewareHandler } from 'client/types'

export const isAdmin: MiddlewareHandler = function (to, _from, context) {
	const auth = useAuth(context)
	const current = auth.current

	if (!current) return `/login?redirect=${to.fullPath}`

	const hasAdminRole = current.roles.find((role: any) => role.name === 'admin')
	if (!hasAdminRole) return '/error/403'
}
