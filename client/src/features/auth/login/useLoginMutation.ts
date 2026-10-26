import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router'

import { AuthService } from '@/services/auth.service'

import { toastMessageHandler } from '@/utils/toast-message-handler'

import type { TypeLoginSchema } from './login.schema'

export const useLoginMutation = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const queryClient = useQueryClient()
	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationFn: ({
			data,
			recaptcha
		}: {
			data: TypeLoginSchema
			recaptcha: string
		}) => AuthService.login(data, recaptcha),
		mutationKey: ['login user'],
		onSuccess() {
			toast.success('Вы успешно вошли в систему.')
			const from = location.state?.from?.pathname ?? '/'
			navigate(from, { replace: true })
			queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { login, isLoadingLogin }
}
