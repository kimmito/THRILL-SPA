import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { UserService } from '@/services/user.service'

import { toastMessageHandler } from '@/utils/toast-message-handler'

import type { TypeSettingsSchema } from '../settings.schema'

export const useUpdateProfileMutation = () => {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['updateProfile'],
		mutationFn: (data: TypeSettingsSchema) => UserService.updateProfile(data),
		onSuccess: () => {
			toast.success('Профиль успешно обновлен')
		},
		onError: error => {
			toastMessageHandler(error)
		}
	})
	return { update, isLoadingUpdate }
}
