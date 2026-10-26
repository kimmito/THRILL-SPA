import { useState } from 'react'
import toast from 'react-hot-toast'
import { RxAvatar } from 'react-icons/rx'

import { AppButton } from '@/components/ui/appButton/AppButton'

import { useProfile } from '@/hooks/useProfile'

import { EditBadge } from './EditBadge'
import { SettingsForm } from '@/features/user/SettingsForm'
import { useLogoutMutation } from '@/features/user/hooks/useLogoutMutation'

const Profile = () => {
	const { user, isLoading } = useProfile()
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const { logout, isLoadingLogout } = useLogoutMutation()

	if (!user) {
		toast.error('Пользователь не найден')
		return null
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<div className='max-w-xl w-full bg-base/80 border border-button/30 shadow-md p-10'>
				<div className='flex items-center gap-4 mb-8 w-full hover:cursor-pointer'>
					{user?.picture ? (
						<div className='relative group'>
							<img
								src={user.picture}
								alt='Avatar'
								className='w-16 h-16 shrink-0 rounded-full object-cover'
							/>
							<EditBadge />
						</div>
					) : (
						<div className='relative w-16 h-16 shrink-0 flex items-center justify-center rounded-full bg-button/20 text-button text-2xl group'>
							{user?.displayName?.[0]?.toUpperCase() ?? <RxAvatar />}
							<EditBadge />
						</div>
					)}

					<p className='text-2xl font-bold m-0 leading-none flex-1'>
						{isEditing ? 'Редактирование профиля' : 'Профиль'}
					</p>
					<button
						type='button'
						className='text-sm! text-button hover:text-button/80'
						onClick={() => {
							logout()
						}}
					>
						{isLoadingLogout ? 'Выход...' : 'Выйти из профиля'}
					</button>

					<AppButton
						appVariant='outline'
						className='text-sm! shrink-0'
						onClick={() => setIsEditing(!isEditing)}
					>
						{isEditing ? 'Отмена' : 'Редактировать'}
					</AppButton>
				</div>

				<SettingsForm user={user} isLoading={isLoading} isEditing={isEditing} />
			</div>
		</div>
	)
}

export default Profile
