import { useQuery } from '@tanstack/react-query'

import type { IUser } from '@/types/user.types'

import { useAuth } from './useAuth'
import { UserService } from '@/services/user.service'

export const useProfile = () => {
	const { authenticated, isLoading: isAuthLoading } = useAuth()
	const {
		data: user,
		isLoading: isProfileLoading,
		isError,
		error
	} = useQuery<IUser>({
		queryFn: () => UserService.findProfile(),
		queryKey: ['profile'],
		staleTime: 5 * 60 * 1000,
		enabled: authenticated
	})
	return {
		user,
		isLoading: isAuthLoading || isProfileLoading,
		isError,
		error
	}
}
