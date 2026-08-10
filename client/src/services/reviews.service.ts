import type { Review } from '@/types/review.type'

import { getReviewsUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

export const ReviewsService = {
	async getAll() {
		return request<Review[]>({
			url: getReviewsUrl(''),
			method: 'GET'
		})
	}
}
