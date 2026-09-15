import type { IUser } from '@/types/user.types'

import { getAuthUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

import type { TypeLoginSchema } from '@/features/auth/login/login.schema'
import type { TypeRegisterSchema } from '@/features/auth/register/register.schema'

export const AuthService = {
	async register(data: TypeRegisterSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		return request<IUser>({
			url: getAuthUrl('/register'),
			method: 'POST',
			data,
			headers
		})
	},
	async login(data: TypeLoginSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		return request<IUser>({
			url: getAuthUrl('/login'),
			method: 'POST',
			data,
			headers
		})
	},

	async oauthByProvider(provider: 'google' | 'yandex') {
		return request<{ url: string }>({
			url: getAuthUrl(`/oauth/connect/${provider}`),
			method: 'GET'
		})
	}
}
