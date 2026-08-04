import type { Category } from '@/types/category.type'

import { getCategoryUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

export const CategoryService = {
	async getAll() {
		return request<Category[]>({
			url: getCategoryUrl(''),
			method: 'GET'
		})
	}
}
