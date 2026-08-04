import type { Offer } from '@/types/offers.interface'

import { request } from '@/api/request.api'

import { getOfferUrl } from './../config/api.config'

export const OffersService = {
	async getAll() {
		return request<Offer[]>({
			url: getOfferUrl(''),
			method: 'GET'
		})
	}
}
