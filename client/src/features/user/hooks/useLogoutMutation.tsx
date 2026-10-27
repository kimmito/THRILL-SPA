import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

import { AuthService } from '@/services/auth.service'

import { toastMessageHandler } from '@/utils/toast-message-handler'

export const useLogoutMutation = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate: logout, isPending: isLoadingLogout } = useMutation({
		mutationFn: () => AuthService.logout(),
		mutationKey: ['auth', 'logout'],
		onSuccess: () => {
			toast.success('Вы успешно вышли из аккаунта')
			queryClient.removeQueries({ queryKey: ['auth'] })
			queryClient.removeQueries({ queryKey: ['profile'] })
			navigate('/auth/login')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { logout, isLoadingLogout }
}
