import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

import { AuthService } from '@/services/auth.service'

import { toastMessageHandler } from '@/utils/toast-message-handler'

import type { TypeRegisterSchema } from './register.schema'

export const useRegisterMutation = () => {
	const navigate = useNavigate()
	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationFn: ({
			data,
			recaptcha
		}: {
			data: TypeRegisterSchema
			recaptcha: string
		}) => AuthService.register(data, recaptcha),
		mutationKey: ['register user'],
		onSuccess() {
			toast.success(
				'Успешная регистрация. Пожалуйста, проверьте вашу почту для подтверждения аккаунта.'
				
			)
			navigate('/dashboard/settings')
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})
	return { register, isLoadingRegister }
}
