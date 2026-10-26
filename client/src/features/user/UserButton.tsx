import type { IUser } from '@/types/user.types'

import { useLogoutMutation } from './hooks/useLogoutMutation'

interface UserButtonProps {
	user: IUser
}

export const UserButton = ({ user }: UserButtonProps) => {
	const { logout, isLoadingLogout } = useLogoutMutation()

	if (!user) return null

	return (
		<div className='flex items-center gap-2'>
			<span className='text-sm text-gray-600'>{user.displayName}</span>
			<button
				onClick={() => logout()}
				disabled={isLoadingLogout}
				className='px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50'
			>
				{isLoadingLogout ? 'Выход...' : 'Выйти'}
			</button>
		</div>
	)
}
