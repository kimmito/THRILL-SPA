import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Loader } from '@/components/ui/Loader'

import { useProfile } from '@/hooks/useProfile'

import { ProfileHeader } from '../../features/profile/components/ProfileHeader'
import { UserAppointments } from '../../features/profile/components/UserAppointments'

import { useLogoutMutation } from '@/features/user/hooks/useLogoutMutation'

const Profile = () => {
	const { user, isLoading, isError, error } = useProfile()
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const { logout, isLoadingLogout } = useLogoutMutation()

	useEffect(() => {
		if (isError) {
			toast.error(
				error instanceof Error ? error.message : 'Не удалось загрузить профиль'
			)
		}
	}, [error, isError])

	if (isLoading) {
		return <Loader />
	}

	if (isError || !user) {
		return null
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<div className='max-w-xl w-full bg-base/80 border border-button/30 shadow-md p-10'>
				<ProfileHeader
					user={user}
					isEditing={isEditing}
					isLoading={isLoading}
					isLoadingLogout={isLoadingLogout}
					logout={logout}
					setIsEditing={setIsEditing}
				/>
			</div>
			<UserAppointments />
		</div>
	)
}

export default Profile
