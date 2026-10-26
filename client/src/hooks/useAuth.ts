import { useQuery } from '@tanstack/react-query'

import type { IUser } from '@/types/user.types'

import { AuthService } from '@/services/auth.service'

type AuthStatus =
	| 'loading'
	| 'authenticated'
	| 'unauthenticated'
	| 'forbidden'
	| 'error'

export const useAuth = () => {
	const {
		data: user,
		isLoading,
		isError,
		error
	} = useQuery<IUser>({
		queryKey: ['auth', 'me'],
		queryFn: () => AuthService.me(),
		retry: false,
		staleTime: 5 * 60 * 1000
	})

	const status: AuthStatus = isLoading
		? 'loading'
		: isError
			? getErrorStatus(error)
			: user
				? 'authenticated'
				: 'unauthenticated'

	return {
		user,
		isLoading,
		isError,
		error,
		status,
		authenticated: status === 'authenticated',
		unauthenticated: status === 'unauthenticated',
		forbidden: status === 'forbidden',
		hasError: status === 'error'
	}
}

function getErrorStatus(error: unknown): AuthStatus {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const status = (error as any)?.response?.status

	if (status === 401) return 'unauthenticated'
	if (status === 403) return 'forbidden'
	return 'error'
}
