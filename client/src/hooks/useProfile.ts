import { useQuery } from '@tanstack/react-query'

import type { IUser } from '@/types/user.types'

import { UserService } from '@/services/user.service'

export const useProfile = () => {
	const { data: user, isLoading } = useQuery<IUser>({
		queryFn: () => UserService.findProfile(),
		queryKey: ['profile'],
		staleTime: 5 * 60 * 1000
	})
	return { user, isLoading }
}
