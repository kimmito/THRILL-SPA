import { Navigate, Outlet } from 'react-router'

import { Loader } from '@/components/ui/Loader'

import { useAuth } from '@/hooks/useAuth'

export const GuestRoute = () => {
	const { isLoading, authenticated } = useAuth()

	if (isLoading) {
		return <Loader />
	}

	if (authenticated) {
		return <Navigate to='/' replace />
	}

	return <Outlet />
}
