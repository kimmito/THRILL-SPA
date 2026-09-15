import { useMutation } from '@tanstack/react-query'
import { FaGoogle, FaYandex } from 'react-icons/fa'

import { AuthService } from '@/services/auth.service'

export const AuthSocial = () => {
	const { mutateAsync } = useMutation({
		mutationFn: async (provider: 'google' | 'yandex') =>
			await AuthService.oauthByProvider(provider),
		mutationKey: ['oauth by provider']
	})

	const handleClick = async (provider: 'google' | 'yandex') => {
		const response = await mutateAsync(provider)
		if (response) {
			window.location.href = response.url
		}
	}

	return (
		<>
			<div className='flex flex-row justify-between gap-4'>
				<button
					onClick={() => handleClick('google')}
					className='flex flex-1 hover:shadow-md transition-all ease-in-out duration-200 items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50/5 cursor-pointer'
				>
					<FaGoogle />
					<span className='font-sans font-semibold ml-2'>Войти с Google</span>
				</button>
				<button
					onClick={() => handleClick('yandex')}
					className='flex flex-1 hover:shadow-md transition-all ease-in-out duration-200 items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50/5 cursor-pointer'
				>
					<FaYandex />
					<span className='font-sans font-semibold ml-2'>Войти с Яндекс</span>
				</button>
			</div>
		</>
	)
}
