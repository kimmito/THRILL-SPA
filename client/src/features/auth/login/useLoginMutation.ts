import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

import { AuthService } from '@/services/auth.service'

import { toastMessageHandler } from '@/utils/toast-message-handler'

import type { TypeLoginSchema } from './login.schema'

export const useLoginMutation = () => {
	const navigate = useNavigate()
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
			navigate('/')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { login, isLoadingLogin }
}
