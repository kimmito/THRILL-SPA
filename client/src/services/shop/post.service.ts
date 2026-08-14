import type { ShopPost } from '@/types/shop/shop-post.type'

import { getPostUrl } from '@/config/api.config'

import { request } from '@/api/request.api'

export const PostService = {
	async getAll() {
		return request<ShopPost[]>({
			url: getPostUrl(''),
			method: 'GET'
		})
	}
}
