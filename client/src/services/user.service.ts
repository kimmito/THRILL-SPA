import type { IUser } from '@/types/user.types'

import { request } from '@/api/request.api'

import type { TypeSettingsSchema } from '@/features/user/settings.schema'

export const UserService = {
	async findProfile() {
		return request<IUser>({
			url: '/users/profile',
			method: 'GET'
		})
	},

	async updateProfile(body: TypeSettingsSchema) {
		return request<IUser>({
			url: '/users/profile',
			method: 'PATCH',
			data: body
		})
	}
}
