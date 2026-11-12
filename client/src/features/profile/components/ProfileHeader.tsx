import { RxAvatar } from 'react-icons/rx'

import { AppButton } from '@/components/ui/appButton/AppButton'

import type { IUser } from '@/types/user.types'

import { EditBadge } from './EditBadge'
import { SettingsForm } from '@/features/user/SettingsForm'

type ProfileHeaderProps = {
	user: IUser
	isEditing: boolean
	isLoading: boolean
	isLoadingLogout: boolean
	setIsEditing: (isEditing: boolean) => void
	logout: () => void
}

export const ProfileHeader = ({
	user,
	isEditing,
	isLoading,
	isLoadingLogout,
	setIsEditing,
	logout
}: ProfileHeaderProps) => {
	return (
		<div>
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

			<SettingsForm
				user={user}
				isLoading={isLoading}
				isEditing={isEditing}
				onCancel={() => setIsEditing(false)}
			/>
		</div>
	)
}
