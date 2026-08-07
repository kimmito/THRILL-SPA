import type { Service } from '@/types/service.type'

import { getServiceUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

export const ServiceService = {
	async getAll() {
		return request<Service[]>({
			url: getServiceUrl(''),
			method: 'GET'
		})
	},
	async getByCategoryId(categoryId: number) {
		return request<Service[]>({
			url: getServiceUrl(`/category/${categoryId}`),
			method: 'GET'
		})
	},
	async getBySlug(slug: string) {
		return request<Service>({
			url: getServiceUrl(`/${slug}`),
			method: 'GET'
		})
	}
}
