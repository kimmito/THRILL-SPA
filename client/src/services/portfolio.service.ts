import type { Portfolio } from '@/types/portfolio.type'

import { getPortfolioUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

export const PortfolioService = {
	async getAll() {
		return request<Portfolio[]>({
			url: getPortfolioUrl(''),
			method: 'GET'
		})
	},

	async getBySection(section: 'NAILS' | 'BROWS' | 'LASHES') {
		return request<Portfolio[]>({
			url: getPortfolioUrl(`/${section}`),
			method: 'GET'
		})
	}
}
