import toast from 'react-hot-toast'
import { Navigate, Outlet, useLocation } from 'react-router'

import { Loader } from '@/components/ui/Loader'

import { useAuth } from '@/hooks/useAuth'

import type { UserRole } from '@/types/user.types'

export const ProtectedRoute = ({
	roles
}: {
	roles: UserRole[] | undefined
}) => {
	const { user, isLoading, authenticated } = useAuth()
	const location = useLocation()

	if (isLoading) {
		return <Loader />
	}

	if (!authenticated) {
		return <Navigate to='/auth/login' state={{ from: location }} />
	}

	if (roles && roles.length > 0) {
		if (!user?.role || !roles.includes(user.role)) {
			toast.error('У вас нет доступа к этой странице.')
			return <Navigate to='/forbidden' replace />
		}
	}
	return <Outlet />
}
